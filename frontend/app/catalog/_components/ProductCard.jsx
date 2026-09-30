import Link from 'next/link'
import styles from './ProductCard.module.css'

export default function ProductCard({ product, labels = {} }) {
  const tastes = product.variants?.length ?? 0

  return (
    <Link href={`/products/${product.slug}`} className={styles.card}>
      <div className={styles.imageBox}>
        <img src={product.images?.[0]} alt={product.name} className={styles.image} />
      </div>
      <div className={styles.footer}>
        <h3 className={styles.title}>
          {product.name} - {product.weight_value}{labels?.weight_unit}
        </h3>
        {tastes > 0 && (
          <span className={styles.variantsCount}>{tastes} {labels?.taste_unit}</span>
        )}
      </div>
    </Link>
  )
}