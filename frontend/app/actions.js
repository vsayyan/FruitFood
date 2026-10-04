import axios from '@/lib/axios'

export async function getHero(lang) {
  try {
    const res = await axios.get('homepage_hero', { params: { lang } })
    return res.data[0] ?? null
  } catch {
    return null
  }
}

export async function getFaqHeading(lang) {
  const res = await axios.get('/faq_heading', { params: { lang } })
  return res.data
}

export async function getFaq(lang) {
  const res = await axios.get('/faq', { params: { lang } })
  return res.data
}

export async function getFaqSmall(lang) {
  const res = await axios.get('/faq_small', { params: { lang } })
  return res.data
}

export async function getPhilosophyHeadings(lang) {
  const res = await axios.get(`philosophy_headings?lang=${lang}`)
  return res.data
}

export async function getPhilosophyText(lang) {
  const res = await axios.get(`philosophy_text?lang=${lang}`)
  return res.data
}
