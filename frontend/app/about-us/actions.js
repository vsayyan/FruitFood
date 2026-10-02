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

// Էջի վերնագիրը (title)՝ navbar-ի նույն տեքստից
export async function getPageTitle(lang) {
  try {
    const res = await axios.get('/navbars', { params: { lang, url: '/about-us' } })
    return res.data[0]?.title ?? null
  } catch {
    return null
  }
}
