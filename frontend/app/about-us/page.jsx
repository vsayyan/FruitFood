import { displayLang } from '@/lib/lang'
import {
  getExportCooperation,
  getOurFactory,
  getWeBelieve,
  getPhilosophyHeadings,
  getPhilosophyText,
  getPhilosophyFacts,
  getFaqHeading,
  getFaq,
  getFaqSmall,
  getBrands,
  getAboutIntro,
  getAboutPageLabels,
  getPageTitle,
} from './actions'

import ExportCooperation from './_components/ExportCooperation'
import OurFactory from './_components/OurFactory'
import WeBelieve from './_components/WeBelieve'
import Philosophy from '../_components/Philosophy'
import Faq from '../_components/Faq'
import Brands from './_components/Brands'
import NaturalQuality from './_components/NaturalQuality'
import styles from './page.module.css'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata() {
  const title = await getPageTitle(await displayLang())
  return title ? { title } : {}
}

export default async function AboutUsPage() {
  const lang = await displayLang()

  const [
    exportCooperation,
    ourFactory,
    weBelieve,
    philosophyHeadings,
    philosophyText,
    philosophyFacts,
    faqHeading,
    faq,
    faqSmall,
    brands,
    aboutIntro,
    aboutPageLabels,
  ] = await Promise.all([
    getExportCooperation(lang),
    getOurFactory(lang),
    getWeBelieve(lang),
    getPhilosophyHeadings(lang),
    getPhilosophyText(lang),
    getPhilosophyFacts(lang),
    getFaqHeading(lang),
    getFaq(lang),
    getFaqSmall(lang),
    getBrands(lang),
    getAboutIntro(lang),
    getAboutPageLabels(lang),
  ])

  return (
    <div className={`container ${styles.page}`}>
      <Philosophy
        headings={philosophyHeadings}
        text={philosophyText}
        facts={philosophyFacts}
      />
      <NaturalQuality data={aboutIntro} />
      <ExportCooperation data={exportCooperation[0]} />
      <OurFactory data={ourFactory[0]} />
      <WeBelieve data={weBelieve[0]} />
      <Brands data={brands} labels={aboutPageLabels} />
      <Faq small={faqSmall} heading={faqHeading} data={faq} />
    </div>
  )
}