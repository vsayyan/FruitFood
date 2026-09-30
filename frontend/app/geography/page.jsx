import { displayLang } from '@/lib/lang'
import {
  getGeographyContent,
  getExportCountries,
} from './actions'

import Intro from './_components/Intro'
import Description from './_components/Description'
import Map from './_components/Map'
import BottomInfo from './_components/BottomInfo'

import styles from './page.module.css'

export default async function GeographyPage() {
  const lang = await displayLang()

  const content = await getGeographyContent(lang)
  const countries = await getExportCountries(lang)

  return (
    <div className={styles.page}>
      <Intro data={content} />

      <div className="container">
        <Description data={content} />

        <Map
          title={content.countries_title}
          countries={countries}
        />

        <BottomInfo text={content.bottom_text} />
      </div>
    </div>
  )
}