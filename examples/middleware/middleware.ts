import { NextRequest, NextResponse, NextFetchEvent } from "next/server";
import { clerkMiddleware } from "@clerk/nextjs/server";

export function middleware(request: NextRequest, event: NextFetchEvent) {
  console.log("middleware");
  if (request.nextUrl.pathname === "/about") {
    return NextResponse.redirect(new URL("/redirected", request.url));
  }
  if (request.nextUrl.pathname === "/another") {
    return NextResponse.rewrite(new URL("/rewrite", request.url));
  }
  if (request.nextUrl.pathname === "/clerk") {
    return clerkMiddleware(async () => {}, {
      publishableKey: "pk_test_ZXhhbXBsZS5hY2NvdW50cy5kZXYk",
      secretKey: "skey",
    })(request, event);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/about/:path*", "/another/:path*", "/middleware/:path*", "/clerk"],
};
