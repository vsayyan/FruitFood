'use client'

import { useEffect, useSyncExternalStore } from 'react'
import styles from './error.module.css'

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

const subscribeNoop = () => () => {}

const readLang = () =>
  document.cookie.match(/(?:^|; )lang=([^;]+)/)?.[1] ||
  document.documentElement.lang ||
  'am'

export default function Error({ error, reset }) {
  const lang = useSyncExternalStore(
    subscribeNoop,
    readLang,
    () => 'am',
  )

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
