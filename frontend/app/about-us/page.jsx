import { displayLang } from '@/lib/lang'
import {
  getAboutIntro,
  getAboutPhilosophy,
  getAboutPhilosophyFacts,
  getBrands,
  getAboutPageLabels,
  getAboutProduction,
  getAboutWhyTrustUs,
  getAboutShowcase,
  getAboutQualityNaturalness,
  getExportCooperation,
  getOurFactory,
  getWeBelieve,
  getPageTitle,
} from './actions'

import NaturalQuality from './_components/NaturalQuality'
import PhilosophyFacts from './_components/PhilosophyFacts'
import Brands from './_components/Brands'
import Production from './_components/Production'
import WhyTrustUs from './_components/WhyTrustUs'
import ProductShowcaseSlider from './_components/ProductShowcaseSlider'
import QualityNaturalness from './_components/QualityNaturalness'
import ExportCooperation from './_components/ExportCooperation'
import OurFactory from './_components/OurFactory'
import WeBelieve from './_components/WeBelieve'

export async function generateMetadata() {
  const title = await getPageTitle(await displayLang())
  return title ? { title } : {}
}

export default async function AboutUsPage() {
  const lang = await displayLang()
  const [
    aboutIntro,
    aboutPhilosophy,
    aboutPhilosophyFacts,
    brands,
    aboutPageLabels,
    pageTitle,
    aboutProduction,
    aboutWhyTrustUs,
    aboutShowcase,
    aboutQualityNaturalness,
    exportCooperation,
    ourFactory,
    weBelieve,
  ] = await Promise.all([
    getAboutIntro(lang),
    getAboutPhilosophy(lang),
    getAboutPhilosophyFacts(lang),
    getBrands(lang),
    getAboutPageLabels(lang),
    getPageTitle(lang),
    getAboutProduction(lang),
    getAboutWhyTrustUs(lang),
    getAboutShowcase(lang),
    getAboutQualityNaturalness(lang),
    getExportCooperation(lang),
    getOurFactory(lang),
    getWeBelieve(lang),
  ])

  return (
    <>
      <NaturalQuality
        data={aboutIntro[0]}
        labels={aboutPageLabels[0]}
        current={pageTitle}
      />
      <PhilosophyFacts data={aboutPhilosophy[0]} facts={aboutPhilosophyFacts} />
      <Brands data={brands} labels={aboutPageLabels[0]} />
      <Production data={aboutProduction[0]} />
      <WhyTrustUs data={aboutWhyTrustUs[0]} />
      <ProductShowcaseSlider data={aboutShowcase[0]} />
      <QualityNaturalness data={aboutQualityNaturalness[0]} />
      <ExportCooperation data={exportCooperation[0]} />
      {ourFactory[0] && <OurFactory data={ourFactory[0]} />}
      <WeBelieve data={weBelieve[0]} />
    </>
  )
}
