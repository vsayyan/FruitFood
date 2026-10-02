import { NextResponse } from 'next/server'

/*
  Ինչու՞ ա պետք։ app/loading.jsx-ի պատճառով էջը սկսում ա «հոսել» (streaming)
  մինչև page.jsx-ը կհասցնի notFound() կանչել, ու browser-ը արդեն ստացել ա
  200 status։ Արդյունքում գոյություն չունեցող ապրանքը/կատեգորիան 404-ի տեքստով
  էր երևում, բայց 200 կոդով (Google-ի համար դա «soft 404» ա)։

  Այստեղ, էջը render անելուց ԱՌԱՋ, ստուգում ենք slug-ը API-ում.
  չկա → ցույց ենք տալիս not-found.jsx-ը իրական 404 status-ով (URL-ը չի փոխվում)։
  Կա → էջը բացվում ա ինչպես միշտ (spinner-ով)։
  API-ն հասանելի չի → ոչինչ չենք անում, էջն ինքը կորոշի։
*/

// Որ route-ներում ա slug, և որ collection-ում փնտրել
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
    // API-ն հասանելի չի — թող էջն ինքը որոշի
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/products/:slug*', '/catalog/:slug*'],
}
