import { GraphQLClient } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export default async function handler({ body }, res){
  const { id, ...data } = typeof body === "string" ? JSON.parse(body) : body;
  const graphcmsToken =
    process.env.GRAPHCMS_TOKEN || process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN;

  const graphcms = new GraphQLClient(graphqlAPI, {
    headers: graphcmsToken
      ? { authorization: `Bearer ${graphcmsToken}` }
      : undefined,
  });

  try {
    const { createSubmission } = await graphcms.request(`
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

    res.status(201).json(createSubmission);
  } catch ({ message }) {
    res.status(400).json({ message });
  }
};
