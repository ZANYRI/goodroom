import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const IPV4_REGEX = /^\d{1,3}(?:\.\d{1,3}){3}$/;

export function proxy(request: NextRequest) {
  const enforceHttps = process.env.ENFORCE_HTTPS !== "false";

  const host = (
    request.headers.get("x-forwarded-host") ||
    request.headers.get("host") ||
    ""
  ).trim();

  const hostname = host.split(":")[0].toLowerCase();
  const isLocalOrIp =
    !hostname ||
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "::1" ||
    IPV4_REGEX.test(hostname);

  const forwardedProto = request.headers
    .get("x-forwarded-proto")
    ?.split(",")[0]
    ?.trim()
    .toLowerCase();

  const isHttpsRequest =
    forwardedProto === "https" || request.nextUrl.protocol === "https:";

  if (enforceHttps && process.env.NODE_ENV === "production" && !isLocalOrIp) {
    const canonicalHost = hostname.startsWith("www.")
      ? hostname.slice(4)
      : hostname;

    const needsHttps = forwardedProto === "http";
    const needsCanonicalHost = hostname.startsWith("www.");

    if (needsHttps || needsCanonicalHost) {
      const targetUrl = new URL(request.url);
      targetUrl.protocol = "https:";
      targetUrl.host = canonicalHost;
      targetUrl.port = "";
      return NextResponse.redirect(targetUrl, 308);
    }
  }

  const response = NextResponse.next();

  if (isHttpsRequest) {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=63072000; includeSubDomains; preload"
    );
    response.headers.set(
      "Content-Security-Policy",
      "upgrade-insecure-requests"
    );
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|fonts/|images/).*)",
  ],
};
