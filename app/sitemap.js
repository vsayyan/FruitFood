import axios from '@/lib/axios'

/*
  Լեզուն cookie-ում ա, ոչ URL-ում (§1) — ուրեմն ամեն էջն ունի **մեկ** URL
  բոլոր 3 լեզուների համար, ու hreflang alternate-ներ պետք չեն։
  Կատեգորիաներն ու ապրանքները db-ից են գալիս, որ նոր ապրանք ավելացնելիս
  sitemap-ը ինքնաբերաբար թարմանա։
*/

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

const STATIC_ROUTES = ['', '/catalog', '/about-us', '/geography', '/contact']

export default async function sitemap() {
  const lastModified = new Date()

  const routes = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified,
  }))

  try {
    // մեկ լեզվով ա բավական՝ slug-ը/URL-ը բոլոր լեզուների համար նույնն ա
    const [categories, products] = await Promise.all([
      axios.get('categories?lang=am'),
      axios.get('products?lang=am'),
    ])

    categories.data.forEach((category) => {
      routes.push({
        url: `${BASE_URL}/catalog/${category.slug}`,
        lastModified,
      })
    })

    products.data.forEach((product) => {
      routes.push({
        url: `${BASE_URL}/products/${product.id}`,
        lastModified,
      })
    })
  } catch (error) {
    // json-server-ը միացած չի (կամ Django-ն հասանելի չի)՝ build-ը չենք կոտրում,
    // sitemap-ում մնում են միայն static route-երը
    console.error('sitemap: API-ն հասանելի չի —', error.message)
  }

  return routes
}
