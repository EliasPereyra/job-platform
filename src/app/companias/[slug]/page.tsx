import Image from "next/image";
import { company } from "@/queries/general/CompanyQuery";
import { type Company } from "@/gql/graphql";
import { print } from "graphql/language/printer";

import { fetchGraphQL } from "@/utils/fetchGraphQL";
import styles from "./Company.module.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Company({ params }: PageProps) {
  const { slug } = await params;
  const { company: companyDetails } = await fetchGraphQL<{ company: Company }>(
    print(company),
    {
      id: `/companias/${slug}`,
    }
  );

  return (
    <div className={styles.container}>
      <Image
        src={companyDetails.companies?.logo?.node.sourceUrl || ""}
        alt={companyDetails.companies?.logo?.node.altText || ""}
        width={200}
        height={200}
      />
      <h1>{companyDetails.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: companyDetails.content || "" }} />
    </div>
  );
}
