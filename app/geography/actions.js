import axios from '@/lib/axios'

export async function getGeographyContent(lang) {
  const res = await axios.get(`geography_contents?lang=${lang}`)
  return res.data[0]
}

export async function getExportCountries(lang) {
  const res = await axios.get(`export_countries?lang=${lang}`)
  return res.data
}