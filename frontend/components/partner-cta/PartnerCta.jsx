import Image from 'next/image'
import Link from 'next/link'
import { displayLang } from '@/lib/lang'
import { getPartnerCta } from './action'
import styles from './PartnerCta.module.css'

// Server Component. տվյալը գալիս ա server-ում, ուրեմն CTA-ն էջի հետ միասին
// ա երևում (ոչ թե բեռնվելուց հետո)։ /contact-ում թաքցնում ա PartnerCtaWrapper-ը։
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
          <Image
            src='/images/partner-cta/arrow.svg'
            alt=''
            width={18}
            height={18}
            className={styles.arrow}
          />
        </Link>
      </div>
    </section>
  )
}
