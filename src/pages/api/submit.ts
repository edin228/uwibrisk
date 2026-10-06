/**
 * POST /api/submit: form submissions from the site's own forms (hotels, coffee,
 * trusted advisor, future contact form). Port of the old pages/api/submit.js with the
 * same request contract and limits; the Hygraph storage step was removed, so the
 * notification email is now the only record of the submission.
 */
import type { APIRoute } from 'astro';
import sendFormNotification from '../../lib/server/sendFormNotification';

export const prerender = false;

const MAX_BODY_BYTES = 32 * 1024;
const MAX_FIELDS = 50;
const MAX_FIELD_NAME_LENGTH = 100;
const MAX_FIELD_VALUE_LENGTH = 5000;

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

const isObject = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value);

const isAllowedValue = (value: unknown) => {
  if (['string', 'number', 'boolean'].includes(typeof value)) return String(value).length <= MAX_FIELD_VALUE_LENGTH;
  return value === null;
};

export const POST: APIRoute = async ({ request }) => {
  const declared = Number(request.headers.get('content-length') ?? 0);
  if (declared > MAX_BODY_BYTES) return json(413, { message: 'Body exceeded 32kb limit' });

  const raw = await request.text();
  if (Buffer.byteLength(raw) > MAX_BODY_BYTES) return json(413, { message: 'Body exceeded 32kb limit' });

  // The old clients send JSON without a Content-Type header, so always parse the text.
  let payload: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isObject(parsed)) throw new Error('Invalid request body');
    payload = parsed;
  } catch {
    return json(400, { message: 'Invalid form submission' });
  }

  const { id, website, ...data } = payload;
  const fields = Object.entries(data);

  // Honeypot: pretend success for bots.
  if (website) return new Response(null, { status: 204 });

  if (
    typeof id !== 'string' ||
    !id ||
    fields.length === 0 ||
    fields.length > MAX_FIELDS ||
    fields.some(([key, value]) => key.length > MAX_FIELD_NAME_LENGTH || !isAllowedValue(value))
  ) {
    return json(400, { message: 'Invalid form submission' });
  }

  const submissionId = crypto.randomUUID();
  try {
    await sendFormNotification({ data, submissionId });
  } catch (error) {
    console.error('Form notification email failed:', error instanceof Error ? error.message : error);
    // Nothing else stores the submission any more, so report the failure to the visitor.
    return json(502, { message: 'Unable to send form submission', notificationSent: false });
  }

  return json(201, { id: submissionId, notificationSent: true });
};

export const ALL: APIRoute = () =>
  new Response(JSON.stringify({ message: 'Method not allowed' }), {
    status: 405,
    headers: { Allow: 'POST', 'Content-Type': 'application/json' },
  });
