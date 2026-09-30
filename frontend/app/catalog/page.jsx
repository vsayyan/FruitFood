import { getProducts, getProductsByCategory, getProductPageLabels } from './actions';
import ProductCard from './_components/ProductCard';
import styles from './page.module.css';

export default async function CatalogPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const categorySlug = resolvedSearchParams?.category || null;

  const products = categorySlug
    ? await getProductsByCategory(categorySlug)
    : await getProducts();

  const pageLabels = await getProductPageLabels();

  return (
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
  );
}