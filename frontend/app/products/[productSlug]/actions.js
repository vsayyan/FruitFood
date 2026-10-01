import axios from '@/lib/axios'

// Ապրանքը փնտրում ենք slug-ով (նույնն ա բոլոր լեզուներում), ոչ թե id-ով
export async function getProduct(slug, lang) {
  const res = await axios.get('products', { params: { slug, lang } })
  return res.data[0] ?? null
}

export async function getProductCategory(slug, lang) {
  const res = await axios.get('categories', { params: { slug, lang } })
  return res.data[0] ?? null
}

// tags-ը լեզվով ա, իսկ icon-ները (emoji) ընդհանուր են tag_icons-ում
export async function getProductTags(codes, lang) {
  if (!codes?.length) return []

  const [tagsRes, iconsRes] = await Promise.all([
    axios.get('tags', { params: { lang } }),
    axios.get('tag_icons'),
  ])

  return codes
    .map((code) => tagsRes.data.find((tag) => tag.code === code))
    .filter(Boolean)
    .map((tag) => ({
      ...tag,
      icon: iconsRes.data.find((item) => item.code === tag.code)?.icon ?? '',
    }))
}

export async function getProductPageLabels(lang) {
  const res = await axios.get('product_page_labels', { params: { lang } })
  return res.data[0] ?? null
}
