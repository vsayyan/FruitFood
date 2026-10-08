import Link from 'next/link'
import ImageSlider from '@/components/image-slider/ImageSlider'
import styles from './Philosophy.module.css'

export default function Philosophy({ headings, text }) {
  const heading = headings?.[0] || {}
  const content = text?.[0] || {}
  const images = content.images || []

  return (
    <section className={`container ${styles.philosophy}`}>
      {images.length > 0 && (
        <div className={styles.slider}>
          <ImageSlider
            images={images.map((item) => ({ src: item.image, alt: item.alt }))}
            labels={{
              previous: content.slider_previous_label,
              next: content.slider_next_label,
              navigation: content.slider_navigation_label,
              slide: content.slider_image_label,
            }}
            sizes='(max-width: 900px) 100vw, 579px'
          />
        </div>
      )}

      <div className={styles.content}>
        <p className={styles.label}>{heading.heading_1}</p>
        <h2 className={styles.title}>
          {heading.heading_2_before}
          <span>{heading.heading_2_highlight}</span>
          {heading.heading_2_after}
        </h2>
        <p className={styles.text}>{content.text}</p>
        <Link href='/about-us' className={styles.link}>
          {content.btn}
          <span aria-hidden='true'>→</span>
        </Link>
      </div>
    </section>
  )
}
