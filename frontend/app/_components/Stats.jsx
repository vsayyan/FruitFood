import CountUp from './CountUp'
import styles from './Stats.module.css'

export default function Stats({ data }) {
  return (
    <section className={styles.stats}>
      <ul className={`container ${styles.list}`}>
        {data.map((stat) => (
          <li key={stat.id} className={styles.item}>
            <p className={styles.value}>
              <span className='visuallyHidden'>{stat.value}</span>
              <span aria-hidden='true'>
                <CountUp value={stat.value} className={styles.number} />
              </span>
              {stat.suffix && <span className={styles.suffix}>{stat.suffix}</span>}
              {stat.unit && <span className={styles.unit}>{stat.unit}</span>}
            </p>
            <p className={styles.label}>{stat.label}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
