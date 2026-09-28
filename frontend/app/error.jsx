'use client'

import { useEffect, useState } from 'react'
import styles from './error.module.css'

/*
  Այս էջի տեքստը db-ից չի գալիս (§4 կանոն 7-ի գիտակցված բացառություն).
  ամենահաճախ հանդիպող error-ը հենց այն ա, որ json-server-ը միացած չի (§2) —
  եթե error էջն իր տեքստը API-ից բերեր, այդ դեպքում ինքն էլ կընկներ։
*/
const messages = {
  am: {
    title: 'Ինչ-որ բան այն չէ',
    text: 'Էջը բեռնելիս սխալ առաջացավ։ Փորձեք նորից։',
    retry: 'Փորձել նորից',
  },
  ru: {
    title: 'Что-то пошло не так',
    text: 'При загрузке страницы произошла ошибка. Попробуйте ещё раз.',
    retry: 'Попробовать снова',
  },
  en: {
    title: 'Something went wrong',
    text: 'An error occurred while loading the page. Please try again.',
    retry: 'Try again',
  },
}

export default function Error({ error, reset }) {
  /*
    error.jsx-ը պարտադիր Client Component ա (Next.js-ի պահանջ), ուրեմն
    displayLang()-ը (next/headers → cookies) այստեղ չի աշխատի։ Լեզուն
    վերցնում ենք <html lang>-ից, որը layout.jsx-ն արդեն դնում ա նույն
    cookie-ի հիման վրա — ոչ մի լրացուցիչ request։
  */
  const [lang, setLang] = useState('am')

  useEffect(() => {
    setLang(document.documentElement.lang || 'am')
  }, [])

  useEffect(() => {
    console.error(error)
  }, [error])

  const t = messages[lang] ?? messages.am

  return (
    <div className={styles.error}>
      <h1 className={styles.title}>{t.title}</h1>
      <p className={styles.text}>{t.text}</p>

      <button type="button" className={styles.button} onClick={reset}>
        {t.retry}
      </button>
    </div>
  )
}
