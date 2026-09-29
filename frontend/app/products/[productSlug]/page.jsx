import Link from 'next/link'
import { notFound } from 'next/navigation'
import { displayLang } from '@/lib/lang'
import {
  getProduct,
  getProductCategory,
  getProductPageLabels,
  getProductTags,
} from './actions'
import ProductDetails from './_components/ProductDetails'
import styles from './page.module.css'

export async function generateMetadata({ params }) {
  const { productSlug } = await params
  const lang = await displayLang()
  const product = await getProduct(productSlug, lang)

  return product ? { title: product.name, description: product.description } : {}
}

export default async function ProductPage({ params }) {
  const { productSlug } = await params
  const lang = await displayLang()
  const product = await getProduct(productSlug, lang)

  if (!product) notFound()

  const [category, tags, labels] = await Promise.all([
    getProductCategory(product.category_slug, lang),
    getProductTags(product.tags, lang),
    getProductPageLabels(lang),
  ])

  return (
    <>
      <section className={styles.breadcrumbSection}>
        <nav className={styles.inner} aria-label={labels.breadcrumb_label}>
          <ol className={styles.breadcrumbs}>
            <li>
              <Link className={styles.crumbLink} href="/">{labels.home_label}</Link>
            </li>
            <li className={styles.separator} aria-hidden="true">/</li>
            <li>
              <Link className={styles.crumbLink} href="/catalog">{labels.catalog_label}</Link>
            </li>
            {category && (
              <>
                <li className={styles.separator} aria-hidden="true">/</li>
                <li>
                  <Link className={styles.crumbCurrent} href={`/catalog/${category.slug}`}>
                    {category.name}
                  </Link>
                </li>
              </>
            )}
          </ol>
        </nav>
      </section>

      <div className={`${styles.inner} ${styles.product}`}>
        <ProductDetails product={product} tags={tags} labels={labels} />
      </div>
    </>
  )
}
