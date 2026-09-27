import gql from "graphql-tag";

export const companies = gql`
  query CompaniesQuery {
    companies {
      nodes {
        companies {
          logo {
            node {
              id
              altText
              sourceUrl
            }
          }
        }
      }
    }
  }
`;

export const company = gql`
  query CompanyQuery($id: ID!) {
    company(id: $id, idType: URI) {
      title
      content
      companies {
        logo {
          node {
            id
            altText
            sourceUrl
          }
        }
        contact
      }
    }
  }
`;
