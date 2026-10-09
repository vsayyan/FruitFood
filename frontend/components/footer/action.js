import { displayLang } from '@/lib/lang'
import axios from '@/lib/axios'
import { getNavbar } from '../header/action'
import asset from '@/lib/assets'

const DEFAULT_FOOTER = { title: 'Fruit Food', image: asset('/images/footer/logo.svg'), social_links: [] }

export async function getFooterLabel(lang) {
  try {
    const res = await axios.get('footer_labels', { params: { lang } })
    const label = res.data[0]
    return label ? { ...DEFAULT_FOOTER, ...label } : DEFAULT_FOOTER
  } catch {
    return DEFAULT_FOOTER
  }
}

export async function getFooterData() {
  const lang = await displayLang()
  const [links, footerLabel] = await Promise.all([getNavbar(lang), getFooterLabel(lang)])

  return { data: footerLabel, links }
}
