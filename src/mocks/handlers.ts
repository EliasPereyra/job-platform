import { graphql, HttpResponse } from "msw";

const allJobs = new Map([
  [
    "1a3d-1a3d-1a3d-1a3d-1a3d1a3d1a3d",
    {
      jobs: {
        nodes: [
          {
            slug: "desarrollador-de-software",
            title: "Desarrollador de software",
            modified: "2023-06-01",
            uri: "https://example.com/job/desarrollador-de-software",
            jobs: {
              location: "Ciudad de México",
              modality: "Presencial",
              salary: 100000,
              available: true,
              company: {
                node: {
                  companies: {
                    logo: {
                      node: {
                        sourceUrl: "https://example.com/logo.png",
                        altText: "Logo de la empresa",
                        mediaDetails: {
                          width: 100,
                          height: 100,
                        },
                      },
                    },
                  },
                },
              },
              jobCategories: {
                nodes: [
                  {
                    jobCategories: {
                      name: "Desarrollo de software",
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    },
  ],
]);

export const handlers = [
  graphql.query("JobQuery", () => {
    return HttpResponse.json({
      data: {
        jobs: Array.from(allJobs.values()),
      },
    });
  }),
];
