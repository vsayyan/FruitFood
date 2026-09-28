import { displayLang } from '@/lib/lang'
import axios from '@/lib/axios'
import { getNavbar } from '../header/action'

export async function getFooterLabel(lang) {
    const res = await axios.get(`footer_labels?lang=${lang}`)
    return res.data[0]
}

export async function getFooterData() {
    const lang = await displayLang() 
    const links = await getNavbar(lang) 
    const footerLabel = await getFooterLabel(lang)

    return {data: footerLabel, links}
}