import Link from 'next/link'
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
    <>
      <div className={styles.introSection}>
        <div className={`container ${styles.page}`}>
          <div className={styles.intro}>
            <div className={styles.breadcrumb}>
              <Link href="/">{content.breadcrumb_home}</Link>
              <span>/</span>
              <span>{content.breadcrumb_contact}</span>
            </div>

            <h1 className={styles.title}>{content.title}</h1>
            <p className={styles.description}>{content.description}</p>
          </div>
        </div>
      </div>

      <div className={`container ${styles.page}`}>
        <div className={styles.contactContent}>
          <ContactInfo info={contactInfo} />
          <ContactForm labels={content} />
        </div>
      </div>

      <Map
        mapUrl={contactInfo.map_url}
        mapTitle={content.map_title}
      />
    </>
  )
}



