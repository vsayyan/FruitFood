import { displayLang } from '@/lib/lang'
import {
  getExportCooperation,
  getOurFactory,
  getWeBelieve,
  getPageTitle,
  getAboutProduction,
  getAboutWhyTrustUs,
  getAboutQualityNaturalness,
} from './actions'

import ExportCooperation from './_components/ExportCooperation'
import OurFactory from './_components/OurFactory'
import WeBelieve from './_components/WeBelieve'
import Production from './_components/Production'
import WhyTrustUs from './_components/WhyTrustUs'
import QualityNaturalness from './_components/QualityNaturalness'
import ProductShowcaseSlider from './_components/ProductShowcaseSlider'
import styles from './page.module.css'

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
    aboutProduction,
    aboutWhyTrustUs,
    aboutQualityNaturalness
  ] = await Promise.all([
    getExportCooperation(lang),
    getOurFactory(lang),
    getWeBelieve(lang),
    getAboutProduction(lang),
    getAboutWhyTrustUs(lang),
    getAboutQualityNaturalness(lang)
  ])

  return (
    <>
      <Production data={aboutProduction[0]} />
      <WhyTrustUs data={aboutWhyTrustUs[0]} />

      <ProductShowcaseSlider />

      <QualityNaturalness data={aboutQualityNaturalness[0]} />
      <ExportCooperation data={exportCooperation[0]} />
      <OurFactory data={ourFactory[0]} />
      <WeBelieve data={weBelieve[0]} />
    </>
  )
}
