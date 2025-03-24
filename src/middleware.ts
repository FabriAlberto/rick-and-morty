import { NextRequest, NextResponse } from "next/server";
const defaultHomePagePath = "/rick-and-morty";
export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  if (nextUrl.pathname !== defaultHomePagePath) {
    const url = new URL(defaultHomePagePath, nextUrl.origin);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
