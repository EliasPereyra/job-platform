import gql from "graphql-tag";

export const job = gql`
  query JobQuery($id: ID!) {
    job(id: $id, idType: URI) {
      modified
      title
      content
      jobs {
        available
        benefits
        company {
          node {
            slug
            companies {
              contact
              logo {
                node {
                  altText
                  sourceUrl
                  mediaDetails {
                    width
                    height
                  }
                }
              }
            }
          }
        }
        jobCategories {
          nodes {
            jobCategories {
              name
            }
          }
        }
        contact
        manadatoryRequirements
        workingDay
        optionalRequirements
        modality
        location
        salary
        tasks
      }
      seo {
        canonical
        cornerstone
        focuskw
        fullHead
        metaDesc
        metaKeywords
        metaRobotsNofollow
        metaRobotsNoindex
        opengraphAuthor
        opengraphDescription
        opengraphModifiedTime
        opengraphPublishedTime
        opengraphPublisher
        opengraphSiteName
        opengraphTitle
        opengraphType
        opengraphUrl
        readingTime
        title
        twitterDescription
        twitterTitle
      }
    }
  }
`;
