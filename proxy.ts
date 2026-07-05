import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (/^\/docs\/.+\.md$/.test(pathname)) {
    const stripped = pathname.slice("/docs/".length, -".md".length);
    const segments = stripped.split("/").filter(Boolean);
    const url = request.nextUrl.clone();
    url.pathname = `/docs-md/${segments.join("/")}`;
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/docs/:path*"],
};
