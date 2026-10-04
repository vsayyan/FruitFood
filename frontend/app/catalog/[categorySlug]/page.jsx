import { notFound } from 'next/navigation'
import { displayLang } from '@/lib/lang'
import {
  getProductsByCategory,
  getProductCategory,
  getProductPageLabels,
} from './actions'
import Breadcrumbs from '../_components/Breadcrumbs'
import ProductGrid from '../_components/ProductGrid'

export async function generateMetadata({ params }) {
  const { categorySlug } = await params
  const category = await getProductCategory(categorySlug, await displayLang())

  if (!category) return {}
  return category.description
    ? { title: category.name, description: category.description }
    : { title: category.name }
}

export default async function CategoryPage({ params }) {
  const { categorySlug } = await params
  const lang = await displayLang()

  const [products, category, labels] = await Promise.all([
    getProductsByCategory(categorySlug, lang),
    getProductCategory(categorySlug, lang),
    getProductPageLabels(lang),
  ])

  if (!category) {
    notFound()
  }

  return (
    <>
      <Breadcrumbs labels={labels} current={category.name} />
      <ProductGrid products={products} labels={labels} title={category.name} />
    </>
  )
}
