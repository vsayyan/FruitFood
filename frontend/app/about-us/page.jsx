import { displayLang } from '@/lib/lang'
import {
  getExportCooperation,
  getOurFactory,
  getWeBelieve
} from './actions'

import ExportCooperation from './_components/ExportCooperation'
import OurFactory from './_components/OurFactory'
import WeBelieve from './_components/WeBelieve'
import styles from './page.module.css'

export default async function AboutUsPage() {
  const lang = await displayLang()
  const [
    exportCooperation,
    ourFactory,
    weBelieve,
  ] = await Promise.all([
    getExportCooperation(lang),
    getOurFactory(lang),
    getWeBelieve(lang)
  ])

  return (
    <div className={styles.page}>
      <ExportCooperation data={exportCooperation[0]} />
      <OurFactory data={ourFactory[0]} />
      <WeBelieve data={weBelieve[0]} />
    </div>
  )
}
