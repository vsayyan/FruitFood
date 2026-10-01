import axios from '@/lib/axios'

export async function getPartnerCta(lang) {
  const res = await axios.get(`partner_cta?lang=${lang}`)
  return res.data[0]
}


