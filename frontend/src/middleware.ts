import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { Token } from './interfaces';
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');

  if (token) {
    const tokenDecoded = jwt.decode(token.value) as Token | null;

    //* Check if the token is not expired
    if (tokenDecoded?.exp! * 1000 > Date.now()) {
      return NextResponse.next();
    }
  }
  
  return NextResponse.redirect(new URL('/login', request.url));
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/admin/:path*',
};