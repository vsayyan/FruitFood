import styles from './WeBelieve.module.css'

export default function WeBelieve({ data }) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.box}>
          <p className={styles.description}>
            {data.description}
          </p>

          <h2 className={styles.title}>
            {data.title}
          </h2>
        </div>
      </div>
    </section>
  )
}