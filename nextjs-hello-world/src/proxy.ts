import { NextResponse, type NextRequest } from "next/server";
import {
  editorialLoginConfigured,
  hasEditorialLogin,
} from "@/lib/editorial-auth";

export function proxy(request: NextRequest) {
  if (!editorialLoginConfigured()) {
    return new NextResponse("Editorial login is not configured.", {
      status: 503,
      headers: { "Cache-Control": "no-store" },
    });
  }

  if (!hasEditorialLogin(request.headers.get("authorization"))) {
    return new NextResponse("Editorial login required.", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="ContentOps editorial", charset="UTF-8"',
        "Cache-Control": "no-store",
      },
    });
  }

  const response = NextResponse.next();
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};