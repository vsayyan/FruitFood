import styles from './WeBelieve.module.css'

export default function WeBelieve({ data }) {
  if (!data) return null

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.box}>
          <p className={styles.description}>
            {data.description}
          </p>

          <h2 className={styles.title}>
            {data.title}
            {data.title_end && (
              <span className={styles.titleEnd}>{data.title_end}</span>
            )}
          </h2>
        </div>
      </div>
    </section>
  )
}