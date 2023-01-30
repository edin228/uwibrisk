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
        officeLocations(where: {isActive: true}, orderBy: order_ASC) {
          id
          order
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

export const getCarrierInfo = async () => {
  const query = gql`
    query MyQuery {
      carrierBanners(
        first:100
        orderBy: publishedAt_ASC
        where: { isActive: true }
      ) {
        id
        name
        payLink
        website
        generalPhoneNumber
        claimsPhoneNumber
        billingPhoneNumber
        claimLink
        logo {
          url
        }
        isActive
      }
    }
  `;
  const result = await request(graphqlAPI, query);

  return result.carrierBanners;
};

export const getCarrierCarousel = async () => {
  const query = gql`
      query GetCarrierCarousel() {
        carrierBanners(where: {isActive: true, showInCarousel: true}) {
            id
            name
            logo {
              url
            }
            showInCarousel
          }
      }
    `;
  const result = await request(graphqlAPI, query);

  return result.carrierBanners;
};

export const getTestemonials = async () => {
  const query = gql`
    query MyQuery {
      testemonials(where: { isActive: true }) {
        from
        id
        subText
        text
        teamMembers {
          id
          name
          position
          slug
          photo {
            id
            url
          }
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query);

  return result.testemonials;
};

export const getHighlightedTestemonials = async () => {
  const query = gql`
    query MyQuery {
      testemonials(where: { isActive: true, highlight: true }) {
        from
        id
        subText
        text
        highlight
        teamMembers {
          id
          name
          position
          slug
          photo {
            id
            url
          }
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query);

  return result.testemonials;
};

export const getOfficeResources = async () => {
  const query = gql`
    query MyQuery {
      officeResources(where: {isActive: true}, first: 500) {
        altLogoText
        category
        id
        image {
          id
          url
        }
        isActive
        link
        title
      }
    }
  `;
  const result = await request(graphqlAPI, query);

  return result.officeResources;
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

export const getRecentTenBlogPosts = async () => {
  const query = gql`
      query GetRecentBlogPosts() {
      blogPosts(orderBy: publishedAt_ASC, where: {isActive: true}, last: 10) {
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
      blogPost(where: { slug: $slug }) {
        blogCategories(where: { isActive: true }) {
          id
          isActive
          title
        }
        blogTags(where: { isActive: true }) {
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
          position
          photo {
            url
          }
        }
        publishedAt
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug });

  return result.blogPost;
};

export const getPage = async (slug) => {
  const query = gql`
    query GetPage($slug: String!) {
      page(where: { slug: $slug }) {
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
        headerImage {
          id
          url
        }
        wordingUnderTitle
        components {
          ... on InfoCard {
            id
            icon
            description
            stage
            title
          }
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug });

  return result.page;
};

export const getHomeActionButtons = async () => {
  const query = gql`
    query GetHomeActionButtons {
      homeActionButtons(where: { isActive: true }) {
        externalUrl
        id
        isActive
        link
        text
        icon
        useExternalUrl
      }
    }
  `;
  const result = await request(graphqlAPI, query);

  return result.homeActionButtons;
};

export const getNavMenuItems = async () => {
  const query = gql`
    query GetNavMenuItems {
      navigationMenuItems(where: { isActive: true }, orderBy: order_ASC) {
        highlight
        id
        isActive
        isDropdown
        isExternalUrl
        slug
        externalUrl
        text
        pages(where: { isActive: true }) {
          isActive
          id
          slug
          title
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query);

  return result.navigationMenuItems;
};

export const getTeam = async () => {
  const query = gql`
    query GetTeam {
      teamMembers(where: { isActive: true }, first: 500) {
        id
        isActive
        name
        phone
        email
        employeeCategory
        position
        slug
        hasTeamPage
        photo {
          id
          url
        }
      }
      pets(where: { isActive: true }) {
        id
        isActive
        name
        slug
        photo {
          id
          url
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query);

  return result;
};

export const getTeamMember = async (slug) => {
  const query = gql`
    query GetTeamMember($slug: String!) {
      teamMember(where: { slug: $slug }) {
        employeeCategory
        isActive
        id
        name
        pets {
          id
          isActive
          name
          photo {
            url
            id
          }
        }
        phone
        photo {
          id
          url
        }
        position
        slug
        bIo {
          html
          markdown
          raw
          text
        }
        hasTeamPage
        email
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug });

  return result.teamMember;
};

export const getSearch = async (search) => {
  const query = gql`
    query GetSearch($search: String!) {
      blogPosts(where: { _search: $search, isActive: true }, first: 500) {
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
          phone
          email
          employeeCategory
          position
          slug
          hasTeamPage
          photo {
            id
            url
          }
        }
        publishedAt
      }
      teamMembers(where: { isActive: true, _search: $search }, first: 500) {
        id
        isActive
        name
        phone
        email
        employeeCategory
        position
        slug
        hasTeamPage
        photo {
          id
          url
        }
      }
      pages(where: { _search: $search, isActive: true }, first: 500) {
        id
        title
        slug
        content {
          html
          raw
          text
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query, { search });

  return result;
};
