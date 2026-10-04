import { displayLang } from '@/lib/lang'
import styles from './loading.module.css'

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
