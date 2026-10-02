import Link from 'next/link'
import styles from './Intro.module.css'

export default function Intro({ data }) {
  return (
    <section className={styles.intro}>
      <div className='container'>
        <nav className={styles.breadcrumbs}>
          <Link href='/' className={styles.crumbLink}>
            {data.breadcrumb_home}
          </Link>
          <span aria-hidden='true'>/</span>
          <span className={styles.current} aria-current='page'>
            {data.title}
          </span>
        </nav>

        <div className={styles.content}>
          <h1 className={styles.title}>{data.title}</h1>
          <p className={styles.introText}>{data.intro}</p>
        </div>
      </div>
    </section>
  )
}
