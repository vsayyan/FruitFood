import Image from 'next/image'
import CountryList from './CountryList'
import styles from './Map.module.css'

export default function Map({ title, countries, moreLabel }) {
  return (
    <section className={styles.mapSection}>
      <div className='container'>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.map}>
          <Image
            src='/images/geography/world-map.png'
            alt=''
            fill
            sizes='(max-width: 900px) 100vw, 1200px'
            className={styles.mapImage}
          />

          <CountryList countries={countries} moreLabel={moreLabel} />
        </div>
      </div>
    </section>
  )
}
