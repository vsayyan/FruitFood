import Image from 'next/image'
import Link from 'next/link'
import { getFooterData } from './action'
import styles from './Footer.module.css'

export default async function Footer() {
  const { data, links } = await getFooterData()

  return (
    <footer className={styles.footer}>
      <div className='container'>
        <div className={styles.row}>
          <div className={styles.brand}>
            <Image src={data.image} alt={data.title} width={101} height={37} loading='eager' />
            {data.description && <p className={styles.description}>{data.description}</p>}
          </div>

          <nav className={styles.links} aria-label={data.links_label}>
            {links.map((item) => (
              <Link key={item.id} href={item.url}>
                {item.title}
              </Link>
            ))}
          </nav>

          <div className={styles.contacts}>
            {data.subtitle && <h2 className={styles.subtitle}>{data.subtitle}</h2>}
            <address className={styles.address}>
              {data.address && <p>{data.address}</p>}
              {data.email && (
                <a href={`mailto:${data.email}`} className={styles.email}>
                  {data.email}
                </a>
              )}
            </address>
            {data.social_links.length > 0 && (
              <div className={styles.social}>
                {data.social_links.map((link) => (
                  <a key={link.id} href={link.url} target='_blank' rel='noreferrer' aria-label={link.label}>
                    <Image src={link.image} alt='' width={38} height={38} loading='eager' />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {data.copyright && <p className={styles.copyright}>{data.copyright}</p>}
      </div>
    </footer>
  )
}
