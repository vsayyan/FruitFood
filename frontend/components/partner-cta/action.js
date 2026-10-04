import axios from '@/lib/axios'

export async function getPartnerCta(lang) {
  try {
    const res = await axios.get(`partner_cta?lang=${lang}`)
    return res.data[0] ?? null
  } catch {
    return null
  }
}
