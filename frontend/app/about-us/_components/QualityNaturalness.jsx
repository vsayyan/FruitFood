import styles from './QualityNaturalness.module.css'

export default function QualityNaturalness({ data }) {
  if (!data) return null

  const leftParagraphs = data.card1?.paragraphs || []
  const rightParagraph = data.card2?.paragraph || data.card2?.paragraph1 || ''

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.leftCard}>
            {data.card1?.eyebrow && (
              <span className={styles.eyebrowLeft}>{data.card1.eyebrow}</span>
            )}
            {data.card1?.title && (
              <h2 className={styles.titleLeft}>{data.card1.title}</h2>
            )}
            <div className={styles.content}>
              {leftParagraphs.map((paragraph, index) => (
                <p key={`${paragraph}-${index}`} className={styles.paragraphLeft}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className={styles.rightCard}>
            {data.card2?.eyebrow && (
              <span className={styles.eyebrowRight}>{data.card2.eyebrow}</span>
            )}
            {data.card2?.title && (
              <h2 className={styles.titleRight}>{data.card2.title}</h2>
            )}
            <div className={styles.content}>
              {rightParagraph && (
                <p className={styles.paragraphRight}>{rightParagraph}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}