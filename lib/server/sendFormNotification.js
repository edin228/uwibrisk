import https from "https";

const RESEND_HOST = "api.resend.com";
const RESEND_PATH = "/emails";
const REQUEST_TIMEOUT_MS = 10000;
const MAX_RESPONSE_BYTES = 64 * 1024;
const MAX_FIELD_VALUE_LENGTH = 5000;

// Forms whose inquiries go to a dedicated contact instead of FORM_NOTIFICATION_TO.
const SOURCE_RECIPIENTS = {
  "Coffee & Contracts page": ["josh@uwib.com"],
  "California boutique hotels page": ["eschirding@uwib.com"],
};

const normalizeFieldName = (name) =>
  String(name).toLowerCase().replace(/[^a-z0-9]/g, "");

const cleanSingleLine = (value, maxLength = 120) =>
  String(value || "")
    .replace(/[\r\n]+/g, " ")
    .trim()
    .slice(0, maxLength);

const formatFieldValue = (value) => {
  if (value === null || value === undefined) return "";

  const formatted =
    typeof value === "object" ? JSON.stringify(value) : String(value);

  return formatted.trim().slice(0, MAX_FIELD_VALUE_LENGTH);
};

const findFieldValue = (data, predicate) => {
  const match = Object.entries(data).find(([key, value]) => {
    return value && predicate(normalizeFieldName(key));
  });

  return match ? formatFieldValue(match[1]) : "";
};

const isEmailAddress = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;

const requestResend = (payload, apiKey, idempotencyKey) =>
  new Promise((resolve, reject) => {
    const body = JSON.stringify(payload);
    const request = https.request(
      {
        hostname: RESEND_HOST,
        path: RESEND_PATH,
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body),
          "Idempotency-Key": idempotencyKey,
        },
      },
      (response) => {
        const chunks = [];
        let responseBytes = 0;

        response.on("data", (chunk) => {
          responseBytes += chunk.length;
          if (responseBytes <= MAX_RESPONSE_BYTES) chunks.push(chunk);
        });

        response.on("end", () => {
          const responseBody = Buffer.concat(chunks).toString("utf8");
          let result = {};

          try {
            result = responseBody ? JSON.parse(responseBody) : {};
          } catch (error) {
            result = { message: responseBody };
          }

          if (response.statusCode >= 200 && response.statusCode < 300) {
            resolve(result);
            return;
          }

          reject(
            new Error(
              `Resend returned ${response.statusCode}: ${
                result.message || "Email delivery failed"
              }`
            )
          );
        });
      }
    );

    request.setTimeout(REQUEST_TIMEOUT_MS, () => {
      request.destroy(new Error("Resend request timed out"));
    });
    request.on("error", reject);
    request.write(body);
    request.end();
  });

export default async function sendFormNotification({ data, submissionId }) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.FORM_FROM_EMAIL;
  const source = cleanSingleLine(
    findFieldValue(data, (fieldName) => fieldName === "source") ||
      "UWIB website form"
  );
  const recipients =
    SOURCE_RECIPIENTS[source] ||
    (process.env.FORM_NOTIFICATION_TO || "")
      .split(",")
      .map((email) => email.trim())
      .filter(Boolean);

  if (!apiKey || !fromEmail || recipients.length === 0) {
    throw new Error("Form notification environment variables are incomplete");
  }
  const replyTo = findFieldValue(data, (fieldName) =>
    fieldName.endsWith("email")
  );
  const sender = fromEmail.includes("<")
    ? fromEmail.trim()
    : `UWIB Website <${fromEmail.trim()}>`;
  const submittedFields = Object.entries(data)
    .filter(([key]) => normalizeFieldName(key) !== "source")
    .map(([key, value]) => {
      const formattedValue = formatFieldValue(value) || "Not provided";
      const indentedValue = formattedValue.replace(/\n/g, "\n  ");
      return `${key}: ${indentedValue}`;
    })
    .join("\n\n");

  const payload = {
    from: sender,
    to: recipients,
    subject: `New UWIB website inquiry: ${source}`,
    text: [
      "A new inquiry was submitted through the UWIB website.",
      "",
      `Source: ${source}`,
      `Submitted: ${new Date().toISOString()}`,
      `Submission ID: ${submissionId}`,
      "",
      submittedFields,
    ].join("\n"),
  };

  if (isEmailAddress(replyTo)) payload.reply_to = replyTo;

  return requestResend(
    payload,
    apiKey,
    `uwib-form-${cleanSingleLine(submissionId, 200)}`
  );
}
