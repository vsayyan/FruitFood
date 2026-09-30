import Link from 'next/link'
import { displayLang } from '@/lib/lang'
import ProductCard from '../_components/ProductCard'
import { 
  getProductsByCategory, 
  getProductCategory,
  getProductPageLabels 
} from './actions'
import styles from '../page.module.css'

export async function generateMetadata({ params }) {
  const resolvedParams = await params
  const categorySlug = resolvedParams?.categorySlug
  const lang = await displayLang()
  
  const [category, pageLabels] = await Promise.all([
    getProductCategory(categorySlug, lang),
    getProductPageLabels(lang),
  ])

  return {
    title: category?.name || pageLabels?.catalog_title || 'Տեսականի',
    description: category?.description || pageLabels?.catalog_description || 'Բացահայտեք մեր տեսականին',
  }
}

export default async function CategoryPage({ params }) {
  const resolvedParams = await params
  const categorySlug = resolvedParams?.categorySlug
  const lang = await displayLang()

  const [products, category, pageLabels] = await Promise.all([
    getProductsByCategory(categorySlug, lang),
    getProductCategory(categorySlug, lang),
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
            {category && (
              <>
                <li className={styles.separator} aria-hidden="true">/</li>
                <li>
                  <span className={styles.crumbCurrent} aria-current="page">
                    {category.name}
                  </span>
                </li>
              </>
            )}
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