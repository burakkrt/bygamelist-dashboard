import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function middleware(req: NextRequest) {
  const token = req.cookies.get('userToken')?.value
  const url = req.nextUrl.clone()

  const publicFileRegex = /\.(.*)$/
  if (publicFileRegex.test(url.pathname)) {
    return NextResponse.next()
  }

  if (url.pathname === '/login') {
    return NextResponse.next()
  }

  if (!token) {
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // Token'ın var olup olmadığını kontrol ediyoruz, doğrulamayı daha sonra server-side'da yapacağız.
  return NextResponse.next()
}
