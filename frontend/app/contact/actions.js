import axios from '@/lib/axios'

async function getFirst(collection, lang) {
  try {
    const res = await axios.get(collection, { params: { lang } })
    return res.data[0] ?? null
  } catch {
    return null
  }
}

export const getContactPageContent = (lang) => getFirst('contact_page_contents', lang)
export const getContactInfo = (lang) => getFirst('contact_info', lang)

