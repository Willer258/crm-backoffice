import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { routing } from './lib/i18n/config'

const intlMiddleware = createIntlMiddleware(routing)

// Public routes that don't require authentication
const publicRoutes = [
  '/login',
  '/register',
  '/verify-email',
  '/forgot-password',
  '/reset-password',
  '/magic-link',
  '/2fa/verify',
  '/2fa/recovery',
  '/oauth/callback',
]

// Auth routes that authenticated users shouldn't access
const authOnlyRoutes = ['/login', '/register', '/forgot-password']

// Check if path matches any of the patterns
function matchesPattern(path: string, patterns: string[]): boolean {
  return patterns.some((pattern) => {
    // Exact match or starts with pattern followed by / or end
    return path === pattern || path.startsWith(`${pattern}/`)
  })
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip API routes and static files
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/_vercel') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Apply i18n middleware first
  const response = intlMiddleware(request)

  // Get tokens from cookies (set by the client or API)
  const accessToken = request.cookies.get('crm-access-token')?.value

  // Extract locale and path from pathname
  // Pathname format: /en/dashboard or /fr/login
  const pathParts = pathname.split('/')
  const possibleLocale = pathParts[1]

  // Check if the first segment is a valid locale
  const locales = routing.locales as readonly string[]
  const defaultLocale = routing.defaultLocale
  const isValidLocale = locales.includes(possibleLocale)

  const locale = isValidLocale ? possibleLocale : defaultLocale
  const pathWithoutLocale = isValidLocale
    ? '/' + pathParts.slice(2).join('/')
    : pathname

  // Check if current path is public
  const isPublicRoute = matchesPattern(pathWithoutLocale, publicRoutes)

  // Check if current path is auth-only route (login, register, etc.)
  const isAuthOnlyRoute = matchesPattern(pathWithoutLocale, authOnlyRoutes)

  // Check if we're on the root path
  const isRootPath = pathWithoutLocale === '' || pathWithoutLocale === '/'

  // For client-side token storage (localStorage via Zustand), we can't check server-side
  // Instead, we'll do a lighter check - only redirect from protected to login if cookie is set
  // The actual auth check will happen client-side via useRequireAuth hook

  // If user has token and tries to access auth-only routes, redirect to dashboard
  if (accessToken && isAuthOnlyRoute) {
    const dashboardUrl = new URL(`/${locale}/dashboard`, request.url)
    return NextResponse.redirect(dashboardUrl)
  }

  // For dashboard routes without token, the client-side hook will handle redirect
  // This allows the Zustand store to rehydrate from localStorage first

  // If on root path with token, redirect to dashboard
  // Otherwise, let the homepage render normally
  if (isRootPath && accessToken) {
    const dashboardUrl = new URL(`/${locale}/dashboard`, request.url)
    return NextResponse.redirect(dashboardUrl)
  }

  return response
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
