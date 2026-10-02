import ProductCard from './ProductCard'
import styles from './ProductGrid.module.css'

export default function ProductGrid({ products, labels }) {
  return (
    <section className={styles.catalogSection}>
      <div className='container'>
        <div className={styles.grid}>
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} labels={labels} />
          ))}
        </div>
      </div>
    </section>
  )
}
