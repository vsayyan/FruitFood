import { displayLang } from '@/lib/lang'
import {
  getFaq,
  getFaqHeading,
  getFaqSmall,
  getHero,
  getPhilosophyHeadings,
  getPhilosophyText,
} from './actions'
import Philosophy from './_components/Philosophy'
import Faq from './_components/Faq'
import Hero from './_components/Hero'

export default async function HomePage() {
  const lang = await displayLang()
  const [hero, philosophyHeadings, philosophyText, faqHeading, faq, faqSmall] = await Promise.all([
    getHero(lang),
    getPhilosophyHeadings(lang),
    getPhilosophyText(lang),
    getFaqHeading(lang),
    getFaq(lang),
    getFaqSmall(lang),
  ])

  return (
    <>
      <Hero data={hero} />
      <Philosophy headings={philosophyHeadings} text={philosophyText} />
      <Faq small={faqSmall} heading={faqHeading} data={faq} />
    </>
  )
}
