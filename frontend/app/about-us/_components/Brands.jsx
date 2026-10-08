import ImageSlider from '@/components/image-slider/ImageSlider'
import styles from './Brands.module.css'

export default function Brands({ data = [], labels }) {
  if (!data.length) return null

  return (
    <section className={styles.section}>
      <div className='container'>
        {labels?.brands_title && <h2 className={styles.title}>{labels.brands_title}</h2>}

        <div className={styles.grid}>
          {data.map((brand) => (
            <article key={brand.id} className={styles.card}>
              {brand.images?.length > 0 && (
                <div className={styles.imageWrapper}>
                  <ImageSlider
                    images={brand.images.map((src) => ({ src, alt: brand.image_alt }))}
                    labels={{
                      previous: labels?.slider_previous_label,
                      next: labels?.slider_next_label,
                      navigation: labels?.slider_navigation_label,
                      slide: labels?.slider_image_label,
                    }}
                    sizes='(max-width: 900px) 100vw, 548px'
                  />
                </div>
              )}
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
