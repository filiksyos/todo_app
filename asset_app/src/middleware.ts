import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // If the user is on the home page, redirect to the token page
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/token', request.url))
  }
}

export const config = {
  matcher: '/',
} 