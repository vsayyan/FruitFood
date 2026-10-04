import axios from '@/lib/axios'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

const STATIC_ROUTES = ['', '/catalog', '/about-us', '/geography', '/contact']

export default async function sitemap() {
  const lastModified = new Date()

  const routes = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified,
  }))

  try {
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
    console.error('sitemap: API-ն հասանելի չի —', error.message)
  }

  return routes
}
