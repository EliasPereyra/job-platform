import { draftMode } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  (await draftMode()).disable();

  // Only allow same-site relative paths to avoid open redirects.
  const path = request.nextUrl.searchParams.get("path");
  const target = path?.startsWith("/") && !path.startsWith("//") ? path : "/";

  return NextResponse.redirect(new URL(target, request.url));
}
