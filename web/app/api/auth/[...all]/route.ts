import { toNextJsHandler } from "better-auth/next-js";

import { auth } from "@/modules/auth/auth";

// `trailingSlash: true` sends requests here as /api/auth/sign-in/email/,
// but Better Auth only matches its routes without the trailing slash.
function withoutTrailingSlash(request: Request) {
  const url = new URL(request.url);
  if (!url.pathname.endsWith("/")) return auth.handler(request);

  url.pathname = url.pathname.replace(/\/+$/, "");

  return auth.handler(new Request(url, request));
}

export const { GET, POST } = toNextJsHandler(withoutTrailingSlash);
