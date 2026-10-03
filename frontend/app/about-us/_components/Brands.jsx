import styles from './Brands.module.css'

export default function Brands({ data = [], labels = {} }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{labels.brands_title}</h2>
      <div className={styles.grid}>
        {data.map((brand) => (
          <article key={brand.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <img
                className={styles.image}
                src={brand.image || brand.logo}
                alt=""
              />
            </div>
            <div className={styles.body}>
              <h3 className={styles.name}>{brand.card_title || brand.name}</h3>
              <p className={styles.description}>{brand.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}