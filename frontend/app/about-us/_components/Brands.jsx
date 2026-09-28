import styles from './Brands.module.css'

const VISIBLE_BRAND_CODES = ['fruit-food', 'choco-chir']

export default function Brands({ data, labels }) {
  const visibleBrands = data.filter((brand) =>
    VISIBLE_BRAND_CODES.includes(brand.code)
  )

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{labels.brands_title}</h2>

      <div className={styles.grid}>
        {visibleBrands.map((brand) => (
          <div key={brand.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <img
                className={styles.image}
                src={brand.image || brand.logo}
                alt={brand.name}
              />
            </div>
            <div className={styles.body}>
              <h3 className={styles.name}>{brand.card_title || brand.name}</h3>
              <p className={styles.description}>{brand.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

