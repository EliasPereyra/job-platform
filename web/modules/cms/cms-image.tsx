import Image from "next/image";
import { urlFor, type SanityImageSource } from "@workstart/cms-sanity/image";

type CmsImageValue = SanityImageSource & { alt?: string | null; asset?: unknown };

type CmsImageProps = {
  value: CmsImageValue | null | undefined;
  width: number;
  height: number;
  className?: string;
  alt?: string;
  priority?: boolean;
};

export function CmsImage({ value, width, height, className, alt, priority }: CmsImageProps) {
  if (!value?.asset) return null;

  return (
    <Image
      className={className}
      src={urlFor(value).width(width * 2).height(height * 2).fit("crop").url()}
      alt={alt ?? value.alt ?? ""}
      width={width}
      height={height}
      priority={priority}
    />
  );
}
