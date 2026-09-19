import { displayLang } from '@/lib/lang'
import styles from './loading.module.css'

/*
  Այս էջի տեքստը db-ից չի գալիս (§4 կանոն 7-ի գիտակցված բացառություն).
  loading-ը պիտի երևա ակնթարթորեն՝ առանց API request-ի սպասելու։
  Տեսանելի տեքստ չկա — միայն spinner։ Ներքևի թարգմանությունը միայն
  screen reader-ի համար ա (տեսողականորեն թաքնված ա)։
*/
const messages = {
  am: { loading: 'Բեռնվում է…' },
  ru: { loading: 'Загрузка…' },
  en: { loading: 'Loading…' },
}

export default async function Loading() {
  const lang = await displayLang()
  const t = messages[lang] ?? messages.am

  return (
    <div className={styles.loading} role="status">
      <span className={styles.spinner} aria-hidden="true" />
      <span className="visuallyHidden">{t.loading}</span>
    </div>
  )
}
