import axios from '@/lib/axios'

export async function getContactPageContent(lang) {
  const res = await axios.get(`contact_page_contents?lang=${lang}`)
  return res.data[0]
}

export async function getContactInfo(lang) {
  const res = await axios.get(`contact_info?lang=${lang}`)
  return res.data[0]
}

export async function submitContact(data) {
  const res = await axios.post('contact_messages', data)
  return res.data
}
