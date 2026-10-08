import ImageSlider from '@/components/image-slider/ImageSlider'
import styles from './ProductShowcaseSlider.module.css'

export default function ProductShowcaseSlider({ data, labels }) {
  const images = data?.images ?? []

  if (!images.length) return null

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.slider}>
          <ImageSlider
            images={images.map((item) => ({ src: item.image, alt: item.alt }))}
            labels={{
              previous: data.prev_label,
              next: data.next_label,
              navigation: labels?.slider_navigation_label,
              slide: labels?.slider_image_label,
            }}
            sizes='(max-width: 1280px) 100vw, 1200px'
          />
        </div>
      </div>
    </div>
  )
}
