import { GraphQLClient } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export default async function handler({ body }, res){
  const { id, ...data } = JSON.parse(body);

  const graphcms = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
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