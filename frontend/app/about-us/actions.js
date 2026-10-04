import axios from '@/lib/axios'

export async function getExportCooperation(lang) {
  try {
    const res = await axios.get('export_cooperation', { params: { lang } })
    return res.data
  } catch {
    return []
  }
}

export async function getOurFactory(lang) {
  try {
    const res = await axios.get('our_factory', { params: { lang } })
    return res.data
  } catch {
    return []
  }
}

export async function getAboutProduction(lang) {
  try {
    const res = await axios.get('about_production', { params: { lang } })
    return res.data
  } catch {
    return []
  }
}

export async function getAboutWhyTrustUs(lang) {
  try {
    const res = await axios.get('about_why_trust_us', { params: { lang } })
    return res.data
  } catch {
    return []
  }
}
export async function getAboutShowcase(lang) {
  try {
    const res = await axios.get('about_showcase', { params: { lang } })
    return res.data
  } catch {
    return []
  }
}

export async function getAboutQualityNaturalness(lang) {
  try {
    const res = await axios.get('about_quality_naturalness', { params: { lang } })
    return res.data
  } catch {
    return []
  }
}

export async function getWeBelieve(lang) {
  try {
    const res = await axios.get('we_believe', { params: { lang } })
    return res.data
  } catch {
    return []
  }
}

export async function getPageTitle(lang) {
  try {
    const res = await axios.get('/navbars', { params: { lang, url: '/about-us' } })
    return res.data[0]?.title ?? null
  } catch {
    return null
  }
}

async function getCollection(name, lang) {
  try {
    const res = await axios.get(name, { params: { lang } })
    return res.data
  } catch {
    return []
  }
}

export const getAboutIntro = (lang) => getCollection('about_intro', lang)
export const getAboutPhilosophy = (lang) => getCollection('about_philosophy', lang)
export const getAboutPhilosophyFacts = (lang) => getCollection('about_philosophy_facts', lang)
export const getBrands = (lang) => getCollection('brands', lang)
export const getAboutPageLabels = (lang) => getCollection('about_page_labels', lang)
