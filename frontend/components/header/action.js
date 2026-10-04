import { displayLang } from '@/lib/lang'
import axios from '@/lib/axios'

const DEFAULT_LOGO = { title: 'Fruit Food', image: '/images/header/logo.svg' }

export async function getLogo() {
  try {
    const res = await axios.get('logos')
    return res.data?.image ? res.data : DEFAULT_LOGO
  } catch {
    return DEFAULT_LOGO
  }
}

export async function getNavbar(lang) {
  try {
    const res = await axios.get('navbars', { params: { lang } })
    return res.data
  } catch {
    return []
  }
}

export async function getLangs() {
  try {
    const res = await axios.get('languages')
    return res.data
  } catch {
    return []
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

export async function getHeaderLabels(lang) {
  try {
    const res = await axios.get('header_labels', { params: { lang } })
    return res.data[0] ?? {}
  } catch {
    return {}
  }
}

export async function getHeaderData() {
  const lang = await displayLang()
  const [logo, navbar, langs, categories, labels] = await Promise.all([
    getLogo(),
    getNavbar(lang),
    getLangs(),
    getCategories(lang),
    getHeaderLabels(lang),
  ])

  return { logo, navbar, langs, lang, categories, labels }
}
