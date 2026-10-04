import axios from '@/lib/axios'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

const STATIC_ROUTES = ['', '/catalog', '/about-us', '/geography', '/contact']

async function getSlugs(collection) {
  try {
    const res = await axios.get(collection, { params: { lang: 'am' } })
    return res.data.map((item) => item.slug).filter(Boolean)
  } catch {
    return []
  }
}

export default async function sitemap() {
  const lastModified = new Date()
  const [categories, products] = await Promise.all([getSlugs('categories'), getSlugs('products')])

  return [
    ...STATIC_ROUTES.map((route) => `${BASE_URL}${route}`),
    ...categories.map((slug) => `${BASE_URL}/catalog/${slug}`),
    ...products.map((slug) => `${BASE_URL}/products/${slug}`),
  ].map((url) => ({ url, lastModified }))
}
