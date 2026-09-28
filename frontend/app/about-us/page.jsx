import { displayLang } from '@/lib/lang'
import {
  getExportCooperation,
  getOurFactory,
  getWeBelieve,
  getPhilosophyHeadings,
  getPhilosophyText,
  getFaqHeading,
  getFaq,
  getFaqSmall,
} from './actions'

import ExportCooperation from './_components/ExportCooperation'
import OurFactory from './_components/OurFactory'
import WeBelieve from './_components/WeBelieve'
import Philosophy from './_components/Philosophy'
import Faq from '../_components/Faq'

export default async function AboutUsPage() {
  const lang = await displayLang()
  const [
    exportCooperation,
    ourFactory,
    weBelieve,
    philosophyHeadings,
    philosophyText,
    faqHeading,
    faq,
    faqSmall,
  ] = await Promise.all([
    getExportCooperation(lang),
    getOurFactory(lang),
    getWeBelieve(lang),
    getPhilosophyHeadings(lang),
    getPhilosophyText(lang),
    getFaqHeading(lang),
    getFaq(lang),
    getFaqSmall(lang),
  ])

  return (
    <>
      <Philosophy headings={philosophyHeadings} text={philosophyText} />
      <ExportCooperation data={exportCooperation[0]} />
      <OurFactory data={ourFactory[0]} />
      <WeBelieve data={weBelieve[0]} />
      <Faq small={faqSmall} heading={faqHeading} data={faq} />
    </>
  )
}
