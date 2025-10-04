import { APP_ROUTES } from "@/core/global/paths"
import { STORAGE_KEYS } from "@/shared/config/constants"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const PROTECTED = ["/dashboard"]

export function middleware(req: NextRequest) {
  const token = req.cookies.get(STORAGE_KEYS.ACCESS_TOKEN)?.value
  const { pathname } = req.nextUrl

  const isProtected = PROTECTED.some((r) => pathname.startsWith(r))

  if (isProtected && !token) {
    const url = req.nextUrl.clone()
    url.pathname = APP_ROUTES.LOGIN
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
