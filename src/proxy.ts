import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/authjs/authjs';

export const proxy = async (request: NextRequest) => {
  const session = await auth();
  const { nextUrl } = request;
  const path = nextUrl.pathname;

  const isProtectedRoute = path.startsWith('/dashboard');
  const isAuth = path.startsWith('/auth');

  if (!session && isProtectedRoute) return NextResponse.redirect(new URL('/auth/login', nextUrl));
  if (session && isAuth) return NextResponse.redirect(new URL('/dashboard/overview', nextUrl));

  return NextResponse.next();
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
