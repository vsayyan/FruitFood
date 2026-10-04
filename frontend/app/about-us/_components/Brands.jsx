import styles from './Brands.module.css'

/*
  About us · Section 3 «Մեր ապրանքանիշերը» (Figma about 171:5235,
  main_mobile 181:7256)։ Ամեն լեզվի համար 2 քարտ (brands collection)։
*/
export default function Brands({ data = [], labels }) {
  if (!data.length) return null

  return (
    <section className={styles.section}>
      <div className='container'>
        {labels?.brands_title && <h2 className={styles.title}>{labels.brands_title}</h2>}

        <div className={styles.grid}>
          {data.map((brand) => (
            <article key={brand.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img
                  className={styles.image}
                  src={brand.image}
                  alt={brand.image_alt ?? ''}
                />
              </div>
              <div className={styles.body}>
                <h3 className={styles.name}>{brand.card_title}</h3>
                <p className={styles.description}>{brand.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
