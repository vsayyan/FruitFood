// app/about/page.jsx
import { displayLang } from '@/lib/lang'
import { getFaq } from './actions'
import Faq from './_components/Faq'
import styles from './page.module.css'

export default async function AboutPage() {
  const lang = await displayLang()
  const faq = await getFaq(lang)

  return (
    <div className={`container ${styles.page}`}>
      <Faq data={faq} />
    </div>
  )
}