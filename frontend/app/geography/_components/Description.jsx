import styles from './Description.module.css'

export default function Description({ data }) {
  return (
    <section className={styles.description}>
      <div className={styles.inner}>
        <p className={styles.text}>
          {data.description_1}
          <strong className={styles.highlight}>
            {data.description_highlight}
          </strong>
        </p>

        <p className={styles.text}>{data.description_2}</p>
      </div>
    </section>
  )
}
