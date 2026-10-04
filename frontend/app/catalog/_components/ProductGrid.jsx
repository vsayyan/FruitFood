import ProductCard from './ProductCard'
import styles from './ProductGrid.module.css'

export default function ProductGrid({ products, labels, title }) {
  return (
    <section className={styles.catalogSection}>
      <div className='container'>
        {title && <h1 className='visuallyHidden'>{title}</h1>}
        <div className={styles.grid}>
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} labels={labels} />
          ))}
        </div>
      </div>
    </section>
  )
}
