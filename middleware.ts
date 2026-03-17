import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hasToken = request.cookies.has('admin_token')

  // 1. /admin 으로 접근하게 되면 바로 로그인 화면이 뜨도록
  // 2. 로그인이 되어있을 때에는 접근가능으로 /admin/dashboard 로 이동
  if (pathname === '/admin') {
    if (hasToken) return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  // Protect all /admin/* routes except login
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    if (!hasToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // Redirect /admin/login to dashboard if already logged in
  if (pathname.startsWith('/admin/login')) {
     if (hasToken) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url))
     }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
}
