import { request, gql } from "graphql-request";
import moment from "moment";
import terms from "../utils/glossary";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
// const graphKey = process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN

// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// export const postTerms = async () => {
//   try {
//     for (let index = 0; index < terms.length; index++) {
//       await delay(500);  // Introduces a 500ms delay between each request

//       const term = terms[index];
//       const glossaryType = term.glossaryType ? term.glossaryType : 'Business';
//       const cleanedDefinition = term.definition.replace(/\n/g, ' ');

//       const mutation = gql`
//         mutation {
//           createGlossaryTerm(data: {
//             term: "${term.term}",
//             definition: "${cleanedDefinition.replace(/"/g, '\\"')}",
//             glossaryType: ${glossaryType},
//           }) {
//             id
//           }
//         }
//       `;
//       const result = await request(graphqlAPI, mutation, null, {
//         headers: {
//           authorization: `Bearer ${graphKey}`,
//         },
//       });
//       console.log('Term Created:', result);
//     }
//   } catch (error) {
//     console.error('Error occurred:', error);
//   }
// };

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
      carrierBanners(first: 100, orderBy: name_ASC, where: { isActive: true }) {
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

export const getGlossaryTerms = async () => {
  const query = gql`
    query MyQuery {
      glossaryTerms(first: 100, orderBy: term_ASC) {
        definition
        term
        id
        glossaryType
      }
    }
  `;
  const query2 = gql`
    query MyQuery {
      glossaryTerms(first: 100,skip:100, orderBy: term_ASC) {
        definition
        term
        id
        glossaryType
      }
    }
  `;
  const result = await request(graphqlAPI, query);
  const result2 = await request(graphqlAPI, query2);

  return [...result.glossaryTerms,...result2.glossaryTerms];
};

export const getProgramInfo = async () => {
  const query = gql`
    query MyQuery {
      programs(
        first: 100
        orderBy: publishedAt_ASC
        where: { isActive: true }
      ) {
        id
        title
        url
        description
        image {
          url
        }
        isActive
      }
    }
  `;
  const result = await request(graphqlAPI, query);
  return result.programs;
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
          blogPhoto {
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
          blogPhoto {
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
      officeResources(
        orderBy: order_ASC
        where: { isActive: true }
        first: 500
      ) {
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
        order
      }
    }
  `;
  const result = await request(graphqlAPI, query);

  return result.officeResources;
};

export const getRecentBlogPosts = async () => {
  const query = gql`
      query GetRecentBlogPosts() {
      blogPosts(orderBy: createdAt_DESC, where: {isActive: true}, first: 8) {
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
              blogPhoto {
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
      blogPosts(orderBy: createdAt_DESC, where: {isActive: true}, first: 100) {
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
        excerpt
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
          blogPhoto {
            id
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
        isPasswordProtected
        password
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
          __typename
          ... on InfoCard {
            id
            icon
            description
            stage
            title
          }
          ... on WideCard {
            id
            buttons {
              ... on ActionButton {
                id
                buttonUrl
                label
              }
            }
            header
            showBackgroundColor
            text
            textOnLeft
            useVideo
            videoUrl
            image {
              id
              url
            }
          }
          ... on PageHeader {
            id
            header
            headerImage {
              id
              url
            }
          }
          ... on ActionBanner {
            id
            descriptive
            title
            buttons {
              id
              buttonUrl
              label
            }
          }
          ... on IconBanner {
            id
            labels
            icons
            descriptions
            bannerTitle
          }
          ... on TestimonialsSection {
            id
          }
          ... on ImageLinkGrid {
            id
            title
            gridItems {
              id
              label
              url
              gridImage {
                id
                url
              }
            }
          }
        }
        forms {
          id
          name
          fields {
            __typename
            ... on FormInput {
              id
              name
              type
              inputLabel: label
              placeholder
              required
            }
            ... on FormCheckbox {
              id
              name
              checkboxLabel: label
              required
            }
            ... on FormSelect {
              id
              name
              selectLabel: label
              formOptions(first: 500) {
                id
                value
                option
              }
              required
            }
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

export const getQuoteCards = async () => {
  const query = gql`
    query GetQuoteCards {
      quoteCards(where: {isActive: true}, orderBy: order_ASC) {
        id
        icon
        image {
          id
          url
        }
        isActive
        label
        order
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query);

  return result.quoteCards;
};

export const getCheckUps = async () => {
  const query = gql`
    query GetCheckUpCards {
      checkUpCards(where: {isActive: true}, orderBy: order_ASC) {
        id
        icon
        image {
          id
          url
        }
        isActive
        label
        order
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query);

  return result.checkUpCards;
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
        order
        openInNewTab
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
        meetingLink
        miniBio
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
        blogPhoto {
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
          blogPhoto {
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
        blogPhoto {
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
      glossaryTerms(where: { _search: $search }, first: 500, orderBy: term_ASC) {
        definition
        term
        id
        glossaryType
      }
    }
  `;
  const result = await request(graphqlAPI, query, { search });

  return result;
};
