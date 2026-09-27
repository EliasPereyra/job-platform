import { defineLive } from "next-sanity/live";

import { client } from "./client";
import { readToken } from "./env";

export const { sanityFetch, SanityLive } = defineLive({
  client,
  // Without a token only published content is fetched (enough for local dev).
  serverToken: readToken ?? false,
  browserToken: readToken ?? false,
});
