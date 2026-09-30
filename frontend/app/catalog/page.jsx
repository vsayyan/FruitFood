import Link from 'next/link'
import { displayLang } from '@/lib/lang'
import ProductCard from './_components/ProductCard'
import { getProductPageLabels } from './[categorySlug]/actions'
import axios from '@/lib/axios'
import styles from './page.module.css'

async function getAllProducts(lang) {
  try {
    const res = await axios.get(`products`, { params: { lang } })
    return res.data
  } catch {
    return []
  }
}

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
                {pageLabels?.home_label || 'Գլխավոր'}
              </Link>
            </li>
            <li className={styles.separator} aria-hidden="true">/</li>
            <li>
              <Link className={styles.crumbLink} href="/catalog">
                {pageLabels?.catalog_label || 'Տեսականի'}
              </Link>
            </li>
            <li className={styles.separator} aria-hidden="true">/</li>
            <li>
              <span className={styles.crumbCurrent} aria-current="page">
                {pageLabels?.all_products_label || 'Ամբողջ տեսականին'}
              </span>
            </li>
          </ol>
        </nav>
      </section>

      <section className={styles.catalogSection}>
        <div className={styles.container}>
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