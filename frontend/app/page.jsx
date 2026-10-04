import { displayLang } from '@/lib/lang'
import {
  getAssortment,
  getCategories,
  getFaq,
  getFaqHeading,
  getFaqSmall,
  getHero,
  getPhilosophyHeadings,
  getPhilosophyText,
  getStats,
} from './actions'
import Philosophy from './_components/Philosophy'
import Faq from './_components/Faq'
import Hero from './_components/Hero'
import Assortment from './_components/Assortment'
import Stats from './_components/Stats'

export default async function HomePage() {
  const lang = await displayLang()
  const [
    hero,
    assortment,
    categories,
    stats,
    philosophyHeadings,
    philosophyText,
    faqHeading,
    faq,
    faqSmall,
  ] = await Promise.all([
    getHero(lang),
    getAssortment(lang),
    getCategories(lang),
    getStats(lang),
    getPhilosophyHeadings(lang),
    getPhilosophyText(lang),
    getFaqHeading(lang),
    getFaq(lang),
    getFaqSmall(lang),
  ])

  return (
    <>
      {hero && <Hero data={hero} />}
      {assortment && <Assortment data={assortment} categories={categories} />}
      {stats.length > 0 && <Stats data={stats} />}
      <Philosophy headings={philosophyHeadings} text={philosophyText} />
      <Faq small={faqSmall} heading={faqHeading} data={faq} />
    </>
  )
}
