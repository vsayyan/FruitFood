import axios from '@/lib/axios'

export async function getGeographyContent(lang) {
  try {
    const res = await axios.get(`geography_contents?lang=${lang}`)
    return res.data[0] ?? null
  } catch {
    return null
  }
}

export async function getExportCountries(lang) {
  try {
    const res = await axios.get(`export_countries?lang=${lang}`)
    return res.data
  } catch {
    return []
  }
}
