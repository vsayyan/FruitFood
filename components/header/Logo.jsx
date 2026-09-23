import Image from 'next/image'
import Link from 'next/link'
import styles from './Header.module.css'

export default function Logo({ data }) {
  return (
    <Link href="/" className={styles.logo}>
        <Image
            src={data.image}
            alt='logo'
            width={101}
            height={34}
            loading='eager'
        />
    </Link>
  )
}
