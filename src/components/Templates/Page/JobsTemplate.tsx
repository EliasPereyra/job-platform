import { print } from "graphql/language/printer";
import { RootQueryToJobCategoryConnection } from "@/gql/graphql";
import { fetchGraphQL } from "@/utils/fetchGraphQL";

import JobCard from "@/components/job-card";
import gql from "graphql-tag";

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
            nodes {
              slug
            }
          }
          jobcategory {
            nodes {
              slug
            }
          }
        }
      }
    }
  }
`;

export default async function JobsTemplate() {
  const queryAllJobs = await fetchGraphQL<{
    jobs: RootQueryToJobCategoryConnection;
  }>(print(jobs));
  const allJobs = queryAllJobs.jobs.nodes;

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Últimos trabajos publicados</h2>
      <ul className={styles.page}>
        {allJobs.map((job: any) => (
          <JobCard
            key={job.content}
            slug={job.slug}
            logo={job.jobs.company.nodes.slug}
            title={job.title}
            publishDate={job.modified}
            company={job.jobs.company.nodes.slug}
            location={job.jobs.location}
            modality={job.jobs.modality}
            jobTime={job.jobs.jobtime}
            salary={job.jobs.salary}
            available={job.jobs.available}
          />
        ))}
      </ul>
    </section>
  );
}
