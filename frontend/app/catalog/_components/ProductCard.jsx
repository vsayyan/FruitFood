import Image from 'next/image'
import Link from 'next/link'
import styles from './ProductCard.module.css'

export default function ProductCard({ product, labels }) {
  const tastes = product.tastes_count ?? product.variants?.length ?? 0

  return (
    <Link href={`/products/${product.slug}`} className={styles.card}>
      <div className={styles.imageBox}>
        {product.images?.[0] && (
          <Image
            src={product.images[0]}
            alt={product.name}
            width={212}
            height={212}
            className={styles.image}
          />
        )}
      </div>

      <div className={styles.footer}>
        <h3 className={styles.title}>
          {product.name}{' '}
          <span className={styles.weight}>
            - {product.weight_value}
            {labels?.weight_unit}
          </span>
        </h3>
        {tastes > 1 && (
          <span className={styles.tastes}>
            {tastes} {labels?.taste_unit}
          </span>
        )}
      </div>
    </Link>
  )
}
