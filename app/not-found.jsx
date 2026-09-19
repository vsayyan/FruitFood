import Link from 'next/link'
import { displayLang } from '@/lib/lang'
import styles from './not-found.module.css'

/*
  Այս էջի տեքստը db-ից չի գալիս (§4 կանոն 7-ի գիտակցված բացառություն).
  404-ը պիտի աշխատի նաև այն ժամանակ, երբ API-ն հասանելի չի։
*/
const messages = {
  am: {
    title: 'Էջը չի գտնվել',
    text: 'Հնարավոր է՝ հասցեն սխալ է, կամ էջն այլևս գոյություն չունի։',
    home: 'Վերադառնալ գլխավոր էջ',
  },
  ru: {
    title: 'Страница не найдена',
    text: 'Возможно, адрес указан неверно или страница была удалена.',
    home: 'Вернуться на главную',
  },
  en: {
    title: 'Page not found',
    text: 'The address may be wrong, or the page no longer exists.',
    home: 'Back to home',
  },
}

export default async function NotFound() {
  const lang = await displayLang()
  const t = messages[lang] ?? messages.am

  return (
    <div className={styles.notFound}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>{t.title}</h1>
      <p className={styles.text}>{t.text}</p>

      <Link href="/" className={styles.button}>
        {t.home}
      </Link>
    </div>
  )
}
