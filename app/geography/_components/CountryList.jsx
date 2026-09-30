import Image from 'next/image'
import styles from './CountryList.module.css'

export default function CountryList({ countries }) {
  return (
    <div className={styles.countryList}>
      {countries.map((country) => (
        <div
          key={country.code}
          className={styles.country}
        >
          <Image
            src="/images/geography/location.png"
            alt=""
            width={20}
            height={20}
            className={styles.pin}
          />

          <span>{country.name}</span>
        </div>
      ))}
    </div>
  )
}