// app/about/actions.js
import axios from '@/lib/axios'

export async function getFaq(lang) {
  const res = await axios.get(`faq?lang=${lang}`)
  return res.data
}