import axios from '@/lib/axios'

export async function getHero(lang) {
  try {
    const res = await axios.get('homepage_hero', { params: { lang } })
    return res.data[0] ?? null
  } catch {
    return null
  }
}

async function getList(collection, lang) {
  try {
    const res = await axios.get(collection, { params: { lang } })
    return res.data
  } catch {
    return []
  }
}

export const getFaqHeading = (lang) => getList('faq_heading', lang)
export const getFaq = (lang) => getList('faq', lang)
export const getFaqSmall = (lang) => getList('faq_small', lang)
export const getPhilosophyHeadings = (lang) => getList('philosophy_headings', lang)
export const getPhilosophyText = (lang) => getList('philosophy_text', lang)

export async function getAssortment(lang) {
  try {
    const res = await axios.get('home_assortment', { params: { lang } })
    return res.data[0] ?? null
  } catch {
    return null
  }
}

export async function getCategories(lang) {
  try {
    const res = await axios.get('categories', { params: { lang } })
    return res.data
  } catch {
    return []
  }
}

export async function getStats(lang) {
  try {
    const res = await axios.get('stats', { params: { lang } })
    return res.data
  } catch {
    return []
  }
}
