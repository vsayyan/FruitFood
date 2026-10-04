import Link from 'next/link'
import { displayLang } from '@/lib/lang'
import { getPartnerCta } from './action'
import styles from './PartnerCta.module.css'

export default async function PartnerCta() {
  const lang = await displayLang()
  const content = await getPartnerCta(lang)

  if (!content) {
    return null
  }

  return (
    <section className={styles.partnerCta}>
      <div className={styles.content}>
        <h2 className={styles.title}>{content.title}</h2>

        <p className={styles.description}>{content.description}</p>

        <Link href='/contact' className={styles.button}>
          {content.button_text}
          <svg
            className={styles.arrow}
            width='18'
            height='18'
            viewBox='0 0 18 18'
            aria-hidden='true'
          >
            <path
              d='M11.466 12.22C11.586 11.908 11.718 11.62 11.862 11.356C12.006 11.08 12.168 10.822 12.348 10.582H2.7V9.106H12.348C12.18 8.866 12.024 8.614 11.88 8.35C11.736 8.074 11.604 7.78 11.484 7.468H12.852C13.596 8.344 14.412 9.01 15.3 9.466V10.24C14.412 10.672 13.596 11.332 12.852 12.22H11.466Z'
              fill='currentColor'
            />
          </svg>
        </Link>
      </div>
    </section>
  )
}
