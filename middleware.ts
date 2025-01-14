import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res })
  
  // Get session
  const { data: { session } } = await supabase.auth.getSession()

  // Define public routes that don't require authentication
  const publicRoutes = ['/login']
  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname)

  // Handle root route
  if (request.nextUrl.pathname === '/') {
    // If authenticated, redirect to homepage, otherwise to login
    if (session) {
      return NextResponse.redirect(new URL('/homepage', request.url))
    } else {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // For all other routes
  if (!session && !isPublicRoute) {
    // Redirect unauthenticated users to login
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (session && isPublicRoute) {
    // Redirect authenticated users to homepage if they try to access login
    return NextResponse.redirect(new URL('/homepage', request.url))
  }

  return res
}

// Specify which routes this middleware should run for
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}