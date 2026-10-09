import Image from 'next/image'
import styles from './ContactInfo.module.css'

export default function ContactInfo({ info }) {
  return (
    <section className={styles.info}>
      <div className={styles.item}>
        <span className={styles.label}>{info.address_label}</span>

        <div className={styles.address}>
          <p className={styles.value}>{info.address_line_1}</p>
          <p className={styles.value}>{info.address_line_2}</p>
        </div>
      </div>

      <div className={styles.item}>
        <span className={styles.label}>{info.email_label}</span>
        <a className={styles.value} href={`mailto:${info.email}`}>
          {info.email}
        </a>
      </div>

      <div className={styles.item}>
        <span className={styles.label}>{info.social_label}</span>

        <div className={styles.socials}>
          {info.social_links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noreferrer"
            >
              <Image src={link.image} alt={link.label} width={38} height={38} />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}