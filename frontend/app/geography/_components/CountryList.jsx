import Image from 'next/image'
import styles from './CountryList.module.css'

export default function CountryList({ countries, moreLabel }) {
  const items = moreLabel
    ? [...countries, { code: 'more', name: moreLabel }]
    : countries

  return (
    <ul className={styles.countryList}>
      {items.map((country) => (
        <li key={country.code} className={styles.country}>
          <Image
            src='/images/geography/pin.svg'
            alt=''
            width={18}
            height={18}
            className={styles.pin}
          />
          <span>{country.name}</span>
        </li>
      ))}
    </ul>
  )
}
