import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.JWT_SECRET)

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get('userToken')?.value
  const url = req.nextUrl.clone()

  // Login sayfasında veya statik dosyalarda token kontrolü yapma
  if (url.pathname === '/login' || /\.(.*)$/.test(url.pathname)) {
    return NextResponse.next()
  }

  if (!token) {
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  try {
    // Token'ı doğrula
    await jwtVerify(token, secret)
    return NextResponse.next()
  } catch (error) {
    // Token yanlış ise yönlendir.
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }
}
