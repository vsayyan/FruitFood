import Image from 'next/image'
import CountryList from './CountryList'
import styles from './Map.module.css'

export default function Map({ title, countries }) {
  return (
    <section className={styles.mapSection}>
      <h2 className={styles.title}>{title}</h2>

      <div className={styles.map}>
        <Image
          src="/images/geography/world-map.png"
          alt=""
          fill
          className={styles.mapImage}
        />

        <CountryList countries={countries} />
      </div>
    </section>
  )
}