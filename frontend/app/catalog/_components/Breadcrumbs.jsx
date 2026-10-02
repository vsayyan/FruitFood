import Link from 'next/link'
import styles from './Breadcrumbs.module.css'

export default function Breadcrumbs({ labels, current }) {
  return (
    <section className={styles.breadcrumbSection}>
      <nav className='container' aria-label={labels?.breadcrumb_label}>
        <ol className={styles.breadcrumbs}>
          <li>
            <Link className={styles.crumbLink} href='/'>
              {labels?.home_label}
            </Link>
          </li>
          <li aria-hidden='true'>/</li>
          <li>
            <Link className={styles.crumbLink} href='/catalog'>
              {labels?.catalog_label}
            </Link>
          </li>
          {current && (
            <>
              <li aria-hidden='true'>/</li>
              <li className={styles.crumbCurrent} aria-current='page'>
                {current}
              </li>
            </>
          )}
        </ol>
      </nav>
    </section>
  )
}
