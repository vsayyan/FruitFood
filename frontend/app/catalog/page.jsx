import Breadcrumbs from './_components/Breadcrumbs';
import ProductCard from './_components/ProductCard';
import CooperationCta from './_components/CooperationCta';
import { 
  getProducts, 
  getProductsByCategory, 
  getBreadcrumbItems, 
  getCooperationCta 
} from './actions';
import styles from './page.module.css';

export default async function CatalogPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const categorySlug = resolvedSearchParams?.category || null;

  const products = categorySlug 
    ? await getProductsByCategory(categorySlug)
    : await getProducts();

  const breadcrumbItems = await getBreadcrumbItems(categorySlug);
  const ctaData = await getCooperationCta();

  return (
    <>
      <section className={styles.catalogSection}>
        <div className={styles.container}>
          <Breadcrumbs items={breadcrumbItems} />

          <div className={styles.grid}>
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <CooperationCta data={ctaData} />
    </>
  );
}