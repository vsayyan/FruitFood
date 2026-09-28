import axios from '@/lib/axios'

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
