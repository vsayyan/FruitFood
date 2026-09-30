import { displayLang } from '@/lib/lang'
import axios from '@/lib/axios'

export async function getProductsByCategory(categorySlug, lang) {
  try {
    const currentLang = lang || (await displayLang())
    const res = await axios.get(`products?category_slug=${categorySlug}&lang=${currentLang}`)
    return res.data
  } catch {
    return []
  }
}

export async function getProductCategory(categorySlug, lang) {
  try {
    const currentLang = lang || (await displayLang())
    
    const res = await axios.get(`categories`, {
      params: { slug: categorySlug, lang: currentLang }
    })

    const categories = res.data
    const category = Array.isArray(categories) ? categories[0] : categories

    if (category) {
      return {
        slug: category.slug,
        name: category.name,
        description: category.description || '',
      }
    }

    return null
  } catch (error) {
    console.error('Error fetching product category:', error)
    return null
  }
}

export async function getProductPageLabels(lang) {
  try {
    const currentLang = lang || (await displayLang())
    const res = await axios.get('product_page_labels', { params: { lang: currentLang } })
    
    const labelsData = res.data
    if (Array.isArray(labelsData)) {
      return (labelsData.find(item => item.lang === currentLang)) ?? labelsData[0] ?? null
    }
    
    return labelsData ?? null
  } catch (error) {
    console.error('Error fetching product page labels:', error)
    return null
  }
}