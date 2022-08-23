import { request, gql } from "graphql-request";
import moment from "moment";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getLanding = async () => {
  const query = gql`
    query GetLanding() {
        heroBanners(where: {isActive: true}) {
          id
          image {
            url
          }
          isActive
          text
        }
      }
  `;
  const result = await request(graphqlAPI, query);

  return result.heroBanners;
};

export const getOfficeLocations = async () => {
  const query = gql`
      query GetOfficeLocations() {
        officeLocations(where: {isActive: true}) {
          id
          address
          addressState
          city
          isActive
          state
          zipcode
          subtitle
          officeLocationPhone
          officeLocationEmail
          image {
            url
          }
        }
      }
    `;
  const result = await request(graphqlAPI, query);

  return result.officeLocations;
};

export const getCarriers = async () => {
  const query = gql`
      query GetCarriers() {
        carrierBanners {
            id
            link
            name
            logo {
              url
            }
          }
      }
    `;
  const result = await request(graphqlAPI, query);

  return result.carrierBanners;
};

export const getTestemonials = async () => {
  const query = gql`
        query GetTestemonials() {
            testemonials {
              id
              text
              from
            }
          }
      `;
  const result = await request(graphqlAPI, query);

  return result.testemonials;
};

export const getRecentBlogPosts = async () => {
  const query = gql`
        query GetRecentBlogPosts() {
        blogPosts(orderBy: publishedAt_ASC, where: {isActive: true}, last: 4) {
            title
            id
            isActive
            template
            excerpt
            blogTags(orderBy: title_ASC) {
                title
                id
                backgroundColor {
                hex
                }
                textColor {
                hex
                }
            }
            blogCategories {
                title
                id
                isActive
            }
            slug
            featuredImage {
                id
                url
            }
            teamMember {
                id
                isActive
                name
                photo {
                  url
                }
            }
            publishedAt
            }
        }
    `;
  const result = await request(graphqlAPI, query);

  return result.blogPosts;
};

export const getBlogPost = async (slug) => {
    const query = gql`
          query GetBlogPost($slug: String!) {
            blogPost(where: {slug: $slug}) {
                blogCategories(where: {isActive: true}) {
                  id
                  isActive
                  title
                }
                blogTags(where: {isActive: true}) {
                  isActive
                  title
                  backgroundColor {
                    hex
                  }
                  textColor {
                    hex
                  }
                  id
                }
                id
                isActive
                rawHtml
                slug
                title
                template
                content {
                  html
                }
                featuredImage {
                  id
                  url
              }
              teamMember {
                  id
                  isActive
                  name
                  photo {
                    url
                  }
              }
                publishedAt
              }
          }
      `;
    const result = await request(graphqlAPI, query, {slug});
  
    return result.blogPost;
  };

  export const getPage = async (slug) => {
    const query = gql`
          query GetPage($slug: String!) {
            page(where: {slug: $slug}) {
              slug
              template
              title
              createdAt
              content {
                html
                raw
                markdown
                json
                text
              }
              id
              pageCategories {
                name
                id
              }
              rawHtml
          }
        }
      `;
    const result = await request(graphqlAPI, query, {slug});
  
    return result.page;
  };