import axios from '@/lib/axios'

export async function getExportCooperation(lang) {
  const res = await axios.get('/export_cooperation', {
    params: { lang },
  })
  return res.data
}

export async function getOurFactory(lang) {
  const res = await axios.get('/our_factory', {
    params: { lang },
  })
  return res.data
}

export async function getWeBelieve(lang) {
  const res = await axios.get('/we_believe', {
    params: { lang },
  })
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

export async function getPhilosophyFacts(lang) {
  const res = await axios.get(`philosophy_facts?lang=${lang}`)
  return res.data
}

export async function getFaqHeading(lang) {
  const res = await axios.get(`faq_heading?lang=${lang}`)
  return res.data
}

export async function getFaq(lang) {
  const res = await axios.get(`faq?lang=${lang}`)
  return res.data
}

export async function getFaqSmall(lang) {
  const res = await axios.get(`faq_small?lang=${lang}`)
  return res.data
}

export async function getBrands(lang) {
  const res = await axios.get('/brands', {
    params: { lang },
  })
  return res.data
}

export async function getAboutIntro(lang) {
  const res = await axios.get('/about_intro', {
    params: { lang },
  })
  return res.data[0]
}

export async function getAboutPageLabels(lang) {
  const res = await axios.get('/about_page_labels', {
    params: { lang },
  })
  return res.data[0]
}
