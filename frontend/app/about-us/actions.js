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


export async function getAboutProduction(lang) {
  try {
    const res = await axios.get('about_production', { params: { lang } })
    return res.data
  } catch {
    return []
  }
}

export async function getAboutWhyTrustUs(lang) {
  try {
    const res = await axios.get('about_why_trust_us', { params: { lang } })
    return res.data
  } catch {
    return []
  }
}
export async function getAboutShowcase(lang) {
  try {
    const res = await axios.get('about_showcase', { params: { lang } })
    return res.data
  } catch {
    return []
  }
}

export async function getAboutQualityNaturalness(lang) {
  try {
    const res = await axios.get('about_quality_naturalness', { params: { lang } })
    return res.data
  } catch {
    return []
  }
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
