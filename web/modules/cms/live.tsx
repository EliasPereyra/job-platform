import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { SanityLive } from "@workstart/cms-sanity/live";

// Real-time content updates
export async function CmsLive() {
  const { isEnabled } = await draftMode();

  return (
    <>
      <SanityLive />
      {isEnabled && <VisualEditing />}
    </>
  );
}
