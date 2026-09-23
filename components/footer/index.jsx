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
          <div className={`${styles.title} ${styles.boxes}`}>
              <Image
                src={data.image}
                alt='logo'
                width={101}
                height={37}
                loading='eager'
              />
            <p className={styles.description}>{data.description}</p>
          </div>

          <div className={styles.rightSide}>
            <div className={`${styles.links} ${styles.boxes}`}>
              {links.map((item) => (
                <Link key={item.id} href={item.url}>
                  {item.title}
                </Link>
              ))}
            </div>

            <div className={`${styles.contacts} ${styles.boxes}`}>
              <p className={styles.contact_us}>{data.subtitle}</p>
              <div className={styles.address}>
                <p>{data.address}</p>
                <p>{data.email}</p>
              </div>
              <div className={styles.social}>
                {data.social_links.map((link) => (
                  <a key={link.id} href={link.url} target='_blank' rel='noreferrer'>
                    <Image
                      src={link.image}
                      alt={'Link to social media'}
                      width={38}
                      height={38}
                      loading='eager'
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className={styles.copyright}>{data.copyright}</p>
      </div>
    </footer>
  )
}
