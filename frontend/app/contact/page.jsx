import Link from 'next/link'
import { displayLang } from '@/lib/lang'
import { getContactPageContent, getContactInfo } from './actions'
import ContactForm from './_components/ContactForm'
import ContactInfo from './_components/ContactInfo'
import Map from './_components/Map'
import styles from './page.module.css'

export async function generateMetadata() {
  const content = await getContactPageContent(await displayLang())
  return content ? { title: content.title, description: content.description } : {}
}

export default async function ContactPage() {
  const lang = await displayLang()
  const [content, contactInfo] = await Promise.all([getContactPageContent(lang), getContactInfo(lang)])

  return (
    <>
      {content && (
        <div className={styles.introSection}>
          <div className={`container ${styles.page}`}>
            <div className={styles.intro}>
              <nav aria-label={content.breadcrumb_label}>
                <ol className={styles.breadcrumb}>
                  <li>
                    <Link className={styles.crumbLink} href='/'>
                      {content.breadcrumb_home}
                    </Link>
                  </li>
                  <li aria-hidden='true'>/</li>
                  <li className={styles.crumbCurrent} aria-current='page'>
                    {content.breadcrumb_contact}
                  </li>
                </ol>
              </nav>

              <h1 className={styles.title}>{content.title}</h1>
              <p className={styles.description}>{content.description}</p>
            </div>
          </div>
        </div>
      )}

      <div className={`container ${styles.page}`}>
        <div className={styles.contactContent}>
          {contactInfo && <ContactInfo info={contactInfo} />}
          {content && <ContactForm labels={content} />}
        </div>
      </div>

      {contactInfo?.map_url && <Map mapUrl={contactInfo.map_url} mapTitle={content?.map_title} />}
    </>
  )
}
