import ImageSlider from '@/components/image-slider/ImageSlider'
import styles from './OurFactory.module.css'

export default function OurFactory({ data }) {
  const sliderImages = data.slider || []

  if (!sliderImages.length) {
    return null
  }

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.main}>
          <div className={styles.content}>
            <span className={styles.label}>
              {data.label}
            </span>

            <h2 className={styles.title}>
              <span>{data.title_green}</span>{' '}
              {data.title_black}
            </h2>

            <div className={styles.text}>
              <p>{data.first_text}</p>
              <p>{data.second_text}</p>
            </div>
          </div>

          <div className={styles.slider}>
            <ImageSlider
              images={sliderImages.map((item, index) => ({ src: item.image, alt: `${data.slider_image_label} ${index + 1}` }))}
              labels={{
                previous: data.slider_previous_label,
                next: data.slider_next_label,
                navigation: data.slider_navigation_label,
                slide: data.slider_image_label,
              }}
              sizes='(max-width: 900px) 100vw, 570px'
            />
          </div>
        </div>

        <div className={styles.gallery}>
          {data.gallery?.map((item) => (
            <div
              key={item.id}
              className={styles.galleryItem}
            >
              <img
                src={item.image}
                alt={`${data.label} ${item.id}`}
              />
            </div>
          ))}
        </div>

        <div className={styles.bottomContent}>
          <p>{data.bottom_left_text}</p>
          <p>{data.bottom_right_text}</p>
        </div>
      </div>
    </section>
  )
}