import { PortableText, type PortableTextBlock } from "@portabletext/react";

type Block = { _type: string; _key: string };

export function RichText({ value }: { value: Block[] | null | undefined }) {
  if (!value?.length) return null;
  // TypeGen marks span `children` as optional; the renderer handles that.
  return <PortableText value={value as PortableTextBlock[]} />;
}
