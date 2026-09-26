import { displayLang } from '@/lib/lang'
import {
  getExportCooperation,
  getOurFactory,
  getWeBelieve
} from './actions'

import ExportCooperation from './_components/ExportCooperation'
import OurFactory from './_components/OurFactory'
import WeBelieve from './_components/WeBelieve'

export default async function AboutUsPage() {
  const lang = await displayLang()

  const exportCooperation = await getExportCooperation(lang)
  const ourFactory = await getOurFactory(lang)
  const weBelieve = await getWeBelieve(lang)

  return (
    <main>
      <ExportCooperation data={exportCooperation[0]} />
      <OurFactory data={ourFactory[0]} />
      <WeBelieve data={weBelieve[0]} />
    </main>
  )
}