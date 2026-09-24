import styles from './ExportCooperation.module.css'

export default function ExportCooperation({ data }) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>{data.title}</h2>

        <div className={styles.content}>
          <p>{data.left_text}</p>
          <p>{data.right_text}</p>
        </div>
      </div>
    </section>
  )
}