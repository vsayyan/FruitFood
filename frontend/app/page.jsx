import { displayLang } from '@/lib/lang'
import { getFaq, getFaqHeading, getFaqSmall } from './actions'
import Faq from './_components/Faq'

export default async function HomePage() {
  const lang = await displayLang()
  const [faqHeading, faq, faqSmall] = await Promise.all([
    getFaqHeading(lang),
    getFaq(lang),
    getFaqSmall(lang),
  ])

  return <Faq small={faqSmall} heading={faqHeading} data={faq} />
}
