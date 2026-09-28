import { displayLang } from '@/lib/lang'
import {
  getFaq,
  getFaqHeading,
  getFaqSmall,
  getPhilosophyHeadings,
  getPhilosophyText,
} from './actions'
import Philosophy from './_components/Philosophy'
import Faq from './_components/Faq'

export default async function HomePage() {
  const lang = await displayLang()
  const [philosophyHeadings, philosophyText, faqHeading, faq, faqSmall] = await Promise.all([
    getPhilosophyHeadings(lang),
    getPhilosophyText(lang),
    getFaqHeading(lang),
    getFaq(lang),
    getFaqSmall(lang),
  ])

  return (
    <>
      <Philosophy headings={philosophyHeadings} text={philosophyText} />
      <Faq small={faqSmall} heading={faqHeading} data={faq} />
    </>
  )
}
