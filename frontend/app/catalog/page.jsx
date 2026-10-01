import Link from 'next/link'
import { displayLang } from '@/lib/lang'
import ProductCard from './_components/ProductCard'
import { getAllProducts, getProductPageLabels } from './actions'
import styles from './page.module.css'

export default async function CatalogPage() {
  const lang = await displayLang()
  const [products, pageLabels] = await Promise.all([
    getAllProducts(lang),
    getProductPageLabels(lang),
  ])

  return (
    <>
      <section className={styles.breadcrumbSection}>
        <nav className="container" aria-label={pageLabels?.breadcrumb_label}>
          <ol className={styles.breadcrumbs}>
            <li>
              <Link className={styles.crumbLink} href="/">
                {pageLabels?.home_label}
              </Link>
            </li>
            <li className={styles.separator} aria-hidden="true">/</li>
            <li>
              <Link className={styles.crumbLink} href="/catalog">
                {pageLabels?.catalog_label}
              </Link>
            </li>
            <li className={styles.separator} aria-hidden="true">/</li>
            <li>
              <span className={styles.crumbCurrent} aria-current="page">
                {pageLabels?.all_products_label}
              </span>
            </li>
          </ol>
        </nav>
      </section>

      <section className={styles.catalogSection}>
        <div className="container">
          <div className={styles.grid}>
            {products?.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                labels={pageLabels} 
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}