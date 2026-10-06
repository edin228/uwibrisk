/**
 * Port of the old lib/server/sendFormNotification.js: emails a form submission via
 * Resend. Same env vars, recipients, subject/body format, reply-to and idempotency key.
 *
 * Env: RESEND_API_KEY, FORM_FROM_EMAIL, FORM_NOTIFICATION_TO (comma-separated).
 * RESEND_API_URL (optional) overrides the endpoint, e.g. a local mock for tests.
 */
const RESEND_URL = 'https://api.resend.com/emails';
const REQUEST_TIMEOUT_MS = 10_000;
const MAX_RESPONSE_BYTES = 64 * 1024;
const MAX_FIELD_VALUE_LENGTH = 5000;

/** Forms whose inquiries go to a dedicated contact instead of FORM_NOTIFICATION_TO. */
export const SOURCE_RECIPIENTS: Record<string, string[]> = {
  'Coffee & Contracts page': ['josh@uwib.com'],
  'California boutique hotels page': ['eschirding@uwib.com'],
};

const normalizeFieldName = (name: string) => String(name).toLowerCase().replace(/[^a-z0-9]/g, '');

const cleanSingleLine = (value: unknown, maxLength = 120) =>
  String(value || '')
    .replace(/[\r\n]+/g, ' ')
    .trim()
    .slice(0, maxLength);

const formatFieldValue = (value: unknown) => {
  if (value === null || value === undefined) return '';
  const formatted = typeof value === 'object' ? JSON.stringify(value) : String(value);
  return formatted.trim().slice(0, MAX_FIELD_VALUE_LENGTH);
};

const findFieldValue = (data: Record<string, unknown>, predicate: (name: string) => boolean) => {
  const match = Object.entries(data).find(([key, value]) => value && predicate(normalizeFieldName(key)));
  return match ? formatFieldValue(match[1]) : '';
};

const isEmailAddress = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;

export interface NotificationInput {
  data: Record<string, unknown>;
  submissionId: string;
}

export default async function sendFormNotification({ data, submissionId }: NotificationInput): Promise<unknown> {
  const env = process.env;
  const apiKey = env.RESEND_API_KEY;
  const fromEmail = env.FORM_FROM_EMAIL;
  const source = cleanSingleLine(findFieldValue(data, (n) => n === 'source') || 'UWIB website form');
  const recipients =
    SOURCE_RECIPIENTS[source] ||
    (env.FORM_NOTIFICATION_TO || '')
      .split(',')
      .map((email) => email.trim())
      .filter(Boolean);

  if (!apiKey || !fromEmail || recipients.length === 0) {
    throw new Error('Form notification environment variables are incomplete');
  }

  const replyTo = findFieldValue(data, (n) => n.endsWith('email'));
  const sender = fromEmail.includes('<') ? fromEmail.trim() : `UWIB Website <${fromEmail.trim()}>`;
  const submittedFields = Object.entries(data)
    .filter(([key]) => normalizeFieldName(key) !== 'source')
    .map(([key, value]) => {
      const formattedValue = formatFieldValue(value) || 'Not provided';
      return `${key}: ${formattedValue.replace(/\n/g, '\n  ')}`;
    })
    .join('\n\n');

  const payload: Record<string, unknown> = {
    from: sender,
    to: recipients,
    subject: `New UWIB website inquiry: ${source}`,
    text: [
      'A new inquiry was submitted through the UWIB website.',
      '',
      `Source: ${source}`,
      `Submitted: ${new Date().toISOString()}`,
      `Submission ID: ${submissionId}`,
      '',
      submittedFields,
    ].join('\n'),
  };
  if (isEmailAddress(replyTo)) payload.reply_to = replyTo;

  const response = await fetch(env.RESEND_API_URL || RESEND_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': `uwib-form-${cleanSingleLine(submissionId, 200)}`,
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
  const responseBody = (await response.text()).slice(0, MAX_RESPONSE_BYTES);
  let result: { message?: string } = {};
  try {
    result = responseBody ? JSON.parse(responseBody) : {};
  } catch {
    result = { message: responseBody };
  }
  if (!response.ok) {
    throw new Error(`Resend returned ${response.status}: ${result.message || 'Email delivery failed'}`);
  }
  return result;
}
