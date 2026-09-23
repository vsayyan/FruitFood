import { getCategories } from '@/app/catalog/actions'
import { displayLang } from '@/lib/lang'
import axios from '@/lib/axios'

export async function getLogo() {
  const res = await axios.get('logos')
  return res.data
}

export async function getNavbar(lang) {
  const res = await axios.get(`navbars?lang=${lang}`)
  return res.data
}

export async function getLangs() {
  const res = await axios.get('languages')
  return res.data
}

export async function getHeaderData() {
    const lang = await displayLang()  
    const logo = await getLogo()
    const navbar = await getNavbar(lang)
    const langs = await getLangs()
    const categories = await getCategories(lang)

    return {logo, navbar, langs, lang, categories}
}


