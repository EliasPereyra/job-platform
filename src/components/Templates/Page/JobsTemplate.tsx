"use client";

import gql from "graphql-tag";
import { useState } from "react";
import { useQuery } from "@apollo/client";

import FilterJobs from "@/components/filter-jobs";
import { LeftArrowRounded } from "@/components/icons/left-arrow-rounded";
import { RightArrowRounded } from "@/components/icons/right-arrow-rounded";
import { Loader } from "@/components/loader/loader";

import styles from "./Jobs.module.css";

const jobsQuery = gql`
  query JobsQuery($first: Int, $after: String, $last: Int, $before: String) {
    jobs(first: $first, after: $after, last: $last, before: $before) {
      pageInfo {
        hasNextPage
        endCursor
        hasPreviousPage
        startCursor
      }
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
          workingDay
          company {
            node {
              companies {
                logo {
                  node {
                    title
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

type PaginationProps = {
  first: number | null;
  after: string | null;
  last: number | null;
  before: string | null;
};

export default function JobsTemplate() {
  const [pagination, setPagination] = useState<PaginationProps>({
    first: 10,
    after: null,
    last: null,
    before: null,
  });
  const { data, loading, fetchMore, error } = useQuery(jobsQuery, {
    variables: {
      first: pagination.first,
      after: pagination.after,
      last: pagination.last,
      before: pagination.before,
    },
    fetchPolicy: "cache-and-network",
  });

  if (loading)
    return (
      <div className={styles.loaderWrapper}>
        <Loader />
      </div>
    );
  if (error) return <p>Hubo un error</p>;

  const { hasNextPage, endCursor, hasPreviousPage, startCursor } =
    data?.jobs.pageInfo;

  return (
    <section className={styles.container}>
      <FilterJobs jobs={data} />
      <div className={styles.pagination}>
        <button
          onClick={() => {
            setPagination({
              first: null,
              after: null,
              last: 10,
              before: startCursor,
            });
            fetchMore({
              variables: {
                first: null,
                after: null,
                last: 10,
                before: startCursor,
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                return fetchMoreResult;
              },
            });
          }}
          className={styles.button}
          disabled={!hasPreviousPage}
        >
          <LeftArrowRounded
            currentColor={`${!hasPreviousPage ? "#c7c7c7" : "#88a097"}`}
            arialabel="Icono de flecha a la izquierda"
          />
        </button>

        <button
          onClick={() => {
            setPagination({
              first: 10,
              after: endCursor,
              last: null,
              before: null,
            });
            fetchMore({
              variables: {
                first: 10,
                after: endCursor,
                last: null,
                before: null,
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                return fetchMoreResult;
              },
            });
          }}
          className={styles.button}
          disabled={!hasNextPage}
        >
          <RightArrowRounded
            currentColor={`${!hasNextPage ? "#c7c7c7" : "#88a097"}`}
            arialabel="Icono de flecha a la derecha"
          />
        </button>
      </div>
    </section>
  );
}
