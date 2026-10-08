import Link from 'next/link'
import ImageSlider from '@/components/image-slider/ImageSlider'
import styles from './NaturalQuality.module.css'

export default function NaturalQuality({ data, labels, current }) {
  if (!data) return null

  const slides = data.slider ?? []

  return (
    <>
      <section className={styles.intro}>
        <div className='container'>
          <nav aria-label={labels?.breadcrumb_label}>
            <ol className={styles.breadcrumbs}>
              <li>
                <Link className={styles.crumbLink} href='/'>
                  {labels?.home_label}
                </Link>
              </li>
              <li aria-hidden='true'>/</li>
              <li className={styles.crumbCurrent} aria-current='page'>
                {current}
              </li>
            </ol>
          </nav>

          <div className={styles.header}>
            <h1 className={styles.title}>{data.title}</h1>
            <p className={styles.body}>{data.body}</p>
          </div>
        </div>
      </section>

      {slides.length > 0 && (
        <section className={styles.media}>
          <div className='container'>
            <div className={styles.slider}>
              <ImageSlider
                images={slides.map((slide) => ({ src: slide.image, alt: data.image_alt }))}
                labels={{
                  previous: labels?.slider_previous_label,
                  next: labels?.slider_next_label,
                  navigation: labels?.slider_navigation_label,
                  slide: labels?.slider_image_label,
                }}
                sizes='(max-width: 1280px) 100vw, 1200px'
              />
            </div>
          </div>
        </section>
      )}

      <section className={styles.story}>
        <div className='container'>
          <div className={styles.columns}>
            <p className={styles.text}>{data.text_left}</p>
            <p className={styles.text}>{data.text_right}</p>
          </div>
        </div>
      </section>
    </>
  )
}
