import Link from 'next/link'
import { notFound } from 'next/navigation'
import { displayLang } from '@/lib/lang'
import {
  getProduct,
  getProductCategory,
  getProductPageLabels,
  getProductTags,
} from './actions'
import Gallery from './_components/Gallery'
import Info from './_components/Info'
import styles from './page.module.css'

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
      <nav className={styles.breadcrumbBar} aria-label={labels.catalog_label}>
        <div className={`container ${styles.breadcrumbs}`}>
          <Link href="/">{labels.home_label}</Link>
          <span aria-hidden="true">/</span>
          <Link href="/catalog">{labels.catalog_label}</Link>
          <span aria-hidden="true">/</span>
          {category && (
            <>
              <Link href={`/catalog/${category.slug}`}>{category.name}</Link>
              <span aria-hidden="true">/</span>
            </>
          )}
          <span className={styles.currentCrumb} aria-current="page">
            {product.name}
          </span>
        </div>
      </nav>

      <main className={`container ${styles.page}`}>
        <div className={styles.productLayout}>
          <Gallery images={product.images ?? []} name={product.name} labels={labels} />
          <Info product={product} tags={tags} labels={labels} />
        </div>
      </main>
    </>
  )
}
