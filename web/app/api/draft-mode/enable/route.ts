import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { client } from "@workstart/cms-sanity/client";

// Called by the Presentation tool in the Studio. Needs SANITY_API_READ_TOKEN.
export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token: process.env.SANITY_API_READ_TOKEN }),
});
