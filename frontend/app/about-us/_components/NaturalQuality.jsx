import styles from './NaturalQuality.module.css'

export default function NaturalQuality({ data }) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h1 className={styles.title}>{data.title}</h1>
        <p className={styles.intro}>{data.body}</p>
      </div>

      <div className={styles.imageWrapper}>
        <img className={styles.image} src={data.image} alt={data.title} />
      </div>

      <div className={styles.columns}>
        <p className={styles.text}>{data.text_left}</p>
        <p className={styles.text}>{data.text_right}</p>
      </div>
    </section>
  )
}