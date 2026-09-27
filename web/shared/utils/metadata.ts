import type { Metadata } from "next";
import { urlFor, type SanityImageSource } from "@workstart/cms-sanity/image";

import { cleanCmsValue } from "@/modules/cms";
import { siteUrl } from "./site-url";

type Seo = {
  title?: string | null;
  description?: string | null;
  image?: (SanityImageSource & { asset?: unknown }) | null;
  noIndex?: boolean | null;
} | null;

// Replaces the Yoast → Metadata mapping used with WordPress.
export function buildMetadata({
  seo,
  fallbackTitle,
  fallbackDescription,
  path,
  fallbackImage,
}: {
  seo: Seo;
  fallbackTitle: string;
  fallbackDescription?: string;
  path: string;
  fallbackImage?: (SanityImageSource & { asset?: unknown }) | null;
}): Metadata {
  const title = cleanCmsValue(seo?.title || fallbackTitle);
  const description = cleanCmsValue(seo?.description || fallbackDescription || "");
  const image = seo?.image?.asset ? seo.image : fallbackImage?.asset ? fallbackImage : null;
  const images = image ? [{ url: urlFor(image).width(1200).height(630).fit("crop").url() }] : [];

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: { canonical: path },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: { title, description, url: path, locale: "es_AR", type: "website", images },
    twitter: { card: "summary_large_image", title, description, images: images.map((i) => i.url) },
  };
}
