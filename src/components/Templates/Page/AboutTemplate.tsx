import { ContentNode, Page } from "@/gql/graphql";
import { PageQuery } from "./PageQuery";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { print } from "graphql/language/printer";

import styles from "./About.module.css";

interface AboutProps {
  node: ContentNode;
}

export default async function AboutTemplate({ node }: AboutProps) {
  const { page } = await fetchGraphQL<{ page: Page }>(print(PageQuery), {
    id: node.databaseId,
  });

  return (
    <section className={styles.container}>
      <div dangerouslySetInnerHTML={{ __html: page?.content || "" }} />
    </section>
  );
}
