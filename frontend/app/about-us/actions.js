import axios from '@/lib/axios'

export async function getExportCooperation(lang) {
  const res = await axios.get('/export_cooperation', {
    params: {
      lang: lang,
    },
  })

  return res.data
}

export async function getOurFactory(lang) {
  const res = await axios.get('/our_factory', {
    params: {
      lang: lang,
    },
  })

  return res.data
}

export async function getWeBelieve(lang) {
  const res = await axios.get('/we_believe', {
    params: {
      lang: lang,
    },
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
