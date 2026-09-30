import ProductCard from '../_components/ProductCard';
import { 
  getProductsByCategory, 
  getProductPageLabels 
} from '../actions';
import styles from '../page.module.css';

export default async function CategoryPage({ params }) {
  const resolvedParams = await params;
  const categorySlug = resolvedParams?.categorySlug || resolvedParams?.category;

  const products = await getProductsByCategory(categorySlug);
  const pageLabels = await getProductPageLabels();

  return (
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
  );
}