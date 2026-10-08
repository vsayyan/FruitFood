import Link from 'next/link'
import ImageSlider from '@/components/image-slider/ImageSlider'
import styles from './Assortment.module.css'

export default function Assortment({ data, categories }) {
  const cards = (data.cards ?? [])
    .map((card) => ({
      ...card,
      category: categories.find((category) => category.slug === card.category_slug),
    }))
    .filter((card) => card.category)

  return (
    <section className={`container ${styles.assortment}`}>
      <div className={styles.head}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>{data.eyebrow}</p>
          <h2 className={styles.title}>{data.title}</h2>
        </div>

        <div className={styles.side}>
          <p className={styles.description}>{data.description}</p>
          <Link href={data.url_catalog ?? '/catalog'} className={styles.link}>
            {data.link_label} <span aria-hidden='true'>→</span>
          </Link>
        </div>
      </div>

      {cards.length > 0 && (
        <ul className={styles.grid}>
          {cards.map((card) => (
            <li key={card.id}>
              <article className={styles.card}>
                {card.badge && <span className={styles.badge}>{card.badge}</span>}

                <div className={styles.media}>
                  <ImageSlider
                    images={(card.images ?? [card.category.image]).map((src) => ({ src, alt: card.category.name }))}
                    labels={{
                      previous: data.slider_previous_label,
                      next: data.slider_next_label,
                      navigation: data.slider_navigation_label,
                      slide: data.slider_image_label,
                    }}
                    sizes='(max-width: 600px) calc(100vw - 80px), (max-width: 900px) calc(50vw - 56px), 520px'
                    href={`/catalog/${card.category.slug}`}
                  />
                </div>

                <div className={styles.footer}>
                  <h3 className={styles.name}>
                    <Link href={`/catalog/${card.category.slug}`} className={styles.cardLink}>
                      {card.category.name}
                    </Link>
                  </h3>
                  <span className={styles.arrow} aria-hidden='true'>
                    <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
                      <path
                        d='M6 14 14 6M6 6h8v8'
                        stroke='currentColor'
                        strokeWidth='1.67'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </span>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
