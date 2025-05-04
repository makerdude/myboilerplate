import { auth } from "@/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const session = await auth()
  const isLoggedIn = !!session
  const isAuthPage = request.nextUrl.pathname.startsWith("/login")

  if (isAuthPage) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
    return NextResponse.next()
  }

  if (!isLoggedIn) {
    let from = request.nextUrl.pathname
    if (request.nextUrl.search) {
      from += request.nextUrl.search
    }

    return NextResponse.redirect(
      new URL(`/login?from=${encodeURIComponent(from)}`, request.url)
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
