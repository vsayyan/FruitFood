import { NextResponse } from 'next/server'

const routes = [
  { prefix: '/products/', collection: 'products' },
  { prefix: '/catalog/', collection: 'categories' },
]

export async function proxy(request) {
  const { pathname } = request.nextUrl
  const route = routes.find((r) => pathname.startsWith(r.prefix))
  const slug = route && decodeURIComponent(pathname.slice(route.prefix.length).split('/')[0])
  if (!slug) return NextResponse.next()

  try {
    const url = new URL(route.collection, process.env.NEXT_PUBLIC_API_URL.replace(/\/?$/, '/'))
    url.searchParams.set('slug', slug)
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) return NextResponse.next()
    const items = await res.json()
    if (Array.isArray(items) && items.length === 0) {
      return NextResponse.rewrite(new URL('/_not-found', request.url), { status: 404 })
    }
  } catch {
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/products/:slug*', '/catalog/:slug*'],
}
