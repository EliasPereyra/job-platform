import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { print } from "graphql/language/printer";
import { ContentNode } from "@/gql/graphql";

import JobsTemplate from "@/components/Templates/Page/JobsTemplate";
import AboutTemplate from "@/components/Templates/Page/AboutTemplate";
import ContactTemplate from "@/components/Templates/Page/ContactTemplate";
import { nextSlugToWpSlug } from "@/utils/nextSlugToWpSlug";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { setSeoData } from "@/utils/seoData";
import { ContentInfoQuery } from "@/queries/general/ContentInfoQuery";
import { SeoQuery } from "@/queries/general/SeoQuery";
type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const wpSlug = nextSlugToWpSlug(slug);
  const isPreview = wpSlug.includes("preview");

  const { contentNode } = await fetchGraphQL<{ contentNode: ContentNode }>(
    print(SeoQuery),
    {
      slug: isPreview ? wpSlug.split("preview/")[1] : wpSlug,
      idType: isPreview ? "DATABASE_ID" : "URI",
    }
  );

  if (!contentNode) {
    return notFound();
  }

  const metadata = setSeoData({ seo: contentNode?.seo });

  return {
    ...metadata,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}${wpSlug}`,
    },
  } as Metadata;
}

export function generateStaticParams() {
  return [];
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const wpSlug = nextSlugToWpSlug(slug);
  const isPreview = wpSlug.includes("preview");
  const { contentNode } = await fetchGraphQL<{ contentNode: ContentNode }>(
    print(ContentInfoQuery),
    {
      slug: isPreview ? wpSlug.split("preview/")[1] : wpSlug,
      idType: isPreview ? "DATABASE_ID" : "URI",
    }
  );

  if (!contentNode) return notFound();

  switch (wpSlug) {
    case "todos-los-trabajos":
      return <JobsTemplate />;
    case "sobre-nosotros":
      return <AboutTemplate />;
    case "contacto":
      return <ContactTemplate node={contentNode} />;
    default:
      return <p>{contentNode.contentTypeName} not implemented</p>;
  }
}
