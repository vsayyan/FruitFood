import styles from './WhyTrustUs.module.css'

export default function WhyTrustUs({ data }) {
  if (!data) return null

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {data.title && <h2 className={styles.title}>{data.title}</h2>}

        <div className={styles.grid}>
          {data.stats &&
            data.stats.map((stat, index) => {
              const hasValue = Boolean(stat.value)
              const cardClass = [
                styles.card,
                stat.isHighlighted ? styles.cardHighlighted : '',
                hasValue ? '' : styles.cardNote,
              ]
                .filter(Boolean)
                .join(' ')

              return (
                <div key={`${stat.value || 'note'}-${index}`} className={cardClass}>
                  {hasValue && <h3 className={styles.statValue}>{stat.value}</h3>}
                  <p className={styles.statLabel}>{stat.label}</p>
                </div>
              )
            })}
        </div>
      </div>
    </section>
  )
}