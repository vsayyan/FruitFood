import Link from 'next/link'
import styles from './Intro.module.css'

export default function Intro({ data }) {
  return (
    <section className={styles.intro}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.left}>
            <div className={styles.breadcrumbs}>
              <Link href="/">
                {data.breadcrumb_home}
              </Link>

              <span>/</span>

              <Link
                href="/geography"
                className={styles.active}
              >
                {data.title}
              </Link>
            </div>

            <h1 className={styles.title}>
              {data.title}
            </h1>
          </div>

          <p className={styles.introText}>
            {data.intro}
          </p>
        </div>
      </div>
    </section>
  )
}