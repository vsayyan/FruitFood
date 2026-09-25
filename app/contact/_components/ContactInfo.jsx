import styles from './ContactInfo.module.css'

export default function ContactInfo({ info }) {
  return (
    <section className={styles.info}>
      <div className={styles.item}>
        <span className={styles.label}>{info.address_label}</span>
        <p className={styles.value}>{info.address}</p>
      </div>

      <div className={styles.item}>
        <span className={styles.label}>{info.email_label}</span>
        <p className={styles.value}>{info.email}</p>
      </div>

      <div className={styles.item}>
        <span className={styles.label}>{info.social_label}</span>

        <div className={styles.socials}>
          <img src={info.facebook_icon} alt="" />
          <img src={info.instagram_icon} alt="" />
        </div>
      </div>
    </section>
  )
}