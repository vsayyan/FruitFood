import axios from '@/lib/axios'

export async function getProduct(slug, lang) {
  const { data } = await axios.get('products', {
    params: { slug, lang },
  })

  return data[0] ?? null
}

export async function getProductCategory(slug, lang) {
  const { data } = await axios.get('categories', {
    params: { slug, lang },
  })

  return data[0] ?? null
}

export async function getProductTags(codes, lang) {
  if (!codes?.length) return []

  const [{ data }, { data: icons }] = await Promise.all([
    axios.get('tags', { params: { lang } }),
    axios.get('tag_icons'),
  ])

  return data
    .filter((tag) => codes.includes(tag.code))
    .map((tag) => ({
      ...tag,
      icon: icons.find((icon) => icon.code === tag.code)?.icon ?? '',
    }))
}

export async function getProductPageLabels(lang) {
  const { data } = await axios.get('product_page_labels', {
    params: { lang },
  })

  return data[0] ?? null
}
