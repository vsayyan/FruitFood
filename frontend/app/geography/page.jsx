import { displayLang } from '@/lib/lang'
import { getGeographyContent, getExportCountries } from './actions'
import Intro from './_components/Intro'
import Description from './_components/Description'
import Map from './_components/Map'
import BottomInfo from './_components/BottomInfo'

export async function generateMetadata() {
  const lang = await displayLang()
  const content = await getGeographyContent(lang)

  return {
    title: content?.title,
    description: content?.intro,
  }
}

export default async function GeographyPage() {
  const lang = await displayLang()
  const [content, countries] = await Promise.all([
    getGeographyContent(lang),
    getExportCountries(lang),
  ])

  if (!content) {
    return null
  }

  return (
    <>
      <Intro data={content} />
      <Description data={content} />
      <Map
        title={content.countries_title}
        countries={countries}
        moreLabel={content.countries_more}
      />
      <BottomInfo text={content.bottom_text} />
    </>
  )
}
