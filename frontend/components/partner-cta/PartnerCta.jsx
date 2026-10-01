'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getPartnerCta } from './action'
import styles from './PartnerCta.module.css'

export default function PartnerCta() {
  const [content, setContent] = useState(null)

  useEffect(() => {
    const lang = document.cookie.includes('lang=ru')
      ? 'ru'
      : document.cookie.includes('lang=en')
        ? 'en'
        : 'am'

    getPartnerCta(lang).then((data) => {
      setContent(data)
    })
  }, [])

  if (!content) {
    return null
  }

  return (
    <section className={styles.partnerCta}>
      <div className={`container ${styles.content}`}>
        <h2 className={styles.title}>
          {content.title}
        </h2>

        <p className={styles.description}>
          {content.description}
        </p>

        <Link href="/contact" className={styles.button}>
          {content.button_text}
          <img
            src="/images/partner-cta/arrow.svg"
            alt=""
            className={styles.arrow}
          />
        </Link>
      </div>
    </section>
  )
}

