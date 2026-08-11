import { GraphQLClient } from "graphql-request";

import sendFormNotification from "../../lib/server/sendFormNotification";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

const MAX_FIELDS = 50;
const MAX_FIELD_NAME_LENGTH = 100;
const MAX_FIELD_VALUE_LENGTH = 5000;

const isObject = (value) =>
  value && typeof value === "object" && !Array.isArray(value);

const isAllowedValue = (value) => {
  if (["string", "number", "boolean"].includes(typeof value)) {
    return String(value).length <= MAX_FIELD_VALUE_LENGTH;
  }

  return value === null;
};

const parseRequestBody = (body) => {
  const parsed = typeof body === "string" ? JSON.parse(body) : body;
  if (!isObject(parsed)) throw new Error("Invalid request body");
  return parsed;
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "32kb",
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  let payload;
  try {
    payload = parseRequestBody(req.body);
  } catch (error) {
    res.status(400).json({ message: "Invalid form submission" });
    return;
  }

  const { id, website, ...data } = payload;
  const fields = Object.entries(data);

  if (website) {
    res.status(204).end();
    return;
  }

  if (
    typeof id !== "string" ||
    !id ||
    fields.length === 0 ||
    fields.length > MAX_FIELDS ||
    fields.some(
      ([key, value]) =>
        key.length > MAX_FIELD_NAME_LENGTH || !isAllowedValue(value)
    )
  ) {
    res.status(400).json({ message: "Invalid form submission" });
    return;
  }

  const graphcmsToken =
    process.env.GRAPHCMS_TOKEN || process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN;

  const graphcms = new GraphQLClient(graphqlAPI, {
    headers: graphcmsToken
      ? { authorization: `Bearer ${graphcmsToken}` }
      : undefined,
  });

  let createSubmission;

  try {
    const result = await graphcms.request(`
      mutation createSubmission($data: Json!, $id: ID!) {
        createSubmission(data: {formData: $data, form: {connect: {id: $id}}}) {
          id
        }
      }`,
      {
        data,
        id,
      }
    );

    createSubmission = result.createSubmission;
  } catch (error) {
    console.error("Form submission storage failed:", error.message);
    res.status(400).json({ message: "Unable to save form submission" });
    return;
  }

  let notificationSent = false;

  try {
    await sendFormNotification({
      data,
      submissionId: createSubmission.id,
    });
    notificationSent = true;
  } catch (error) {
    console.error("Form notification email failed:", error.message);
  }

  res.status(201).json({ ...createSubmission, notificationSent });
}
