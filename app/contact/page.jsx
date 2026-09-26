import { displayLang } from '@/lib/lang'
import { getContactPageContent, getContactInfo } from './actions'
import ContactForm from './_components/ContactForm'
import ContactInfo from './_components/ContactInfo'
import Map from './_components/Map'
import styles from './page.module.css'

export default async function ContactPage() {
  const lang = await displayLang()
  const content = await getContactPageContent(lang)
  const contactInfo = await getContactInfo(lang)

  return (
    <div className={`container ${styles.page}`}>
      <h1 className={styles.title}>{content.title}</h1>
      <p className={styles.description}>{content.description}</p>

      <ContactForm labels={content} />
      <ContactInfo info={contactInfo} />
      <Map mapUrl={contactInfo.map_url} />
    </div>
  )
}