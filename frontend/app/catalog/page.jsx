import { displayLang } from '@/lib/lang'
import { getAllProducts, getProductPageLabels } from './actions'
import Breadcrumbs from './_components/Breadcrumbs'
import ProductGrid from './_components/ProductGrid'

export async function generateMetadata() {
  const labels = await getProductPageLabels(await displayLang())
  return { title: labels?.all_products_label }
}

export default async function CatalogPage() {
  const lang = await displayLang()
  const [products, labels] = await Promise.all([
    getAllProducts(lang),
    getProductPageLabels(lang),
  ])

  return (
    <>
      <Breadcrumbs labels={labels} current={labels?.all_products_label} />
      <ProductGrid products={products} labels={labels} />
    </>
  )
}
