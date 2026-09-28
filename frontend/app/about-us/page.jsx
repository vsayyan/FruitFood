import { displayLang } from '@/lib/lang'
import {
  getExportCooperation,
  getOurFactory,
  getWeBelieve,
  getPhilosophyHeadings,
  getPhilosophyText
} from './actions'

import ExportCooperation from './_components/ExportCooperation'
import OurFactory from './_components/OurFactory'
import WeBelieve from './_components/WeBelieve'
import Philosophy from './_components/Philosophy'

export default async function AboutUsPage() {
  const lang = await displayLang()
  const [
    exportCooperation,
    ourFactory,
    weBelieve,
    philosophyHeadings,
    philosophyText,
  ] = await Promise.all([
    getExportCooperation(lang),
    getOurFactory(lang),
    getWeBelieve(lang),
    getPhilosophyHeadings(lang),
    getPhilosophyText(lang)
  ])

  return (
    <>
      <Philosophy headings={philosophyHeadings} text={philosophyText} />
      <ExportCooperation data={exportCooperation[0]} />
      <OurFactory data={ourFactory[0]} />
      <WeBelieve data={weBelieve[0]} />
    </>
  )
}
