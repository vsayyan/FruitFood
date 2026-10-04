import axios from '@/lib/axios'

export async function getProduct(slug, lang) {
  try {
    const res = await axios.get('products', { params: { slug, lang } })
    return res.data[0] ?? null
  } catch {
    return null
  }
}

export async function getProductCategory(slug, lang) {
  try {
    const res = await axios.get('categories', { params: { slug, lang } })
    return res.data[0] ?? null
  } catch {
    return null
  }
}

export async function getProductTags(codes, lang) {
  if (!codes?.length) return []

  let tagsRes
  let iconsRes
  try {
    ;[tagsRes, iconsRes] = await Promise.all([
      axios.get('tags', { params: { lang } }),
      axios.get('tag_icons'),
    ])
  } catch {
    return []
  }

  return codes
    .map((code) => tagsRes.data.find((tag) => tag.code === code))
    .filter(Boolean)
    .map((tag) => ({
      ...tag,
      icon: iconsRes.data.find((item) => item.code === tag.code)?.icon ?? '',
    }))
}

export async function getProductPageLabels(lang) {
  try {
    const res = await axios.get('product_page_labels', { params: { lang } })
    return res.data[0] ?? {}
  } catch {
    return {}
  }
}
