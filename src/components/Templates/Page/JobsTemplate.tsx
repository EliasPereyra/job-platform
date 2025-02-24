import { print } from "graphql/language/printer";
import { RootQueryToJobConnection } from "@/gql/graphql";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import gql from "graphql-tag";

import FilterJobs from "@/components/filter-jobs";

import styles from "./Jobs.module.css";

const jobs = gql`
  query JobsQuery {
    jobs {
      nodes {
        slug
        title
        modified
        uri
        jobs {
          location
          modality
          salary
          available
          company {
            node {
              companies {
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
        }
      }
    }
  }
`;

export default async function JobsTemplate() {
  const queryAllJobs = await fetchGraphQL<{
    jobs: RootQueryToJobConnection;
  }>(print(jobs));

  return (
    <section className={styles.container}>
      <FilterJobs jobs={queryAllJobs} />
    </section>
  );
}
