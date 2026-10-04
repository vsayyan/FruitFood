// import styles from './NaturalQuality.module.css'

// export default function NaturalQuality({ data }) {
//   return (
//     <section className={styles.section}>
//       <div className={styles.header}>
//         <h1 className={styles.title}>{data.title}</h1>
//         <p className={styles.intro}>{data.body}</p>
//       </div>

//       <div className={styles.imageWrapper}>
//         <img className={styles.image} src={data.image} alt="" />
//       </div>

//       <div className={styles.columns}>
//         <p className={styles.text}>{data.text_left}</p>
//         <p className={styles.text}>{data.text_right}</p>
//       </div>
//     </section>
//   )
// }

'use client'

import { useState } from 'react'
import styles from './NaturalQuality.module.css'

export default function NaturalQuality({ data }) {
  const sliderImages = data.slider || []

  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === sliderImages.length - 1 ? 0 : prev + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? sliderImages.length - 1 : prev - 1
    )
  }

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h1 className={styles.title}>{data.title}</h1>
        <p className={styles.intro}>{data.body}</p>
      </div>

      {sliderImages.length > 0 ? (
        <div className={styles.slider}>
          <img
            src={sliderImages[currentIndex].image}
            alt={data.label || ''}
            className={styles.sliderImage}
          />

          {sliderImages.length > 1 && (
            <>
              <button
                type="button"
                className={`${styles.arrow} ${styles.prev}`}
                onClick={prevSlide}
                aria-label={data.slider_previous_label}
              >
                ‹
              </button>

              <button
                type="button"
                className={`${styles.arrow} ${styles.next}`}
                onClick={nextSlide}
                aria-label={data.slider_next_label}
              >
                ›
              </button>

              <div
                className={styles.dots}
                role="group"
                aria-label={data.slider_navigation_label}
              >
                {sliderImages.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`${styles.dot} ${
                      index === currentIndex ? styles.active : ''
                    }`}
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`${data.slider_image_label} ${index + 1}`}
                    aria-current={index === currentIndex ? 'true' : undefined}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      ) : (
        <div className={styles.imageWrapper}>
          <img className={styles.image} src={data.image} alt="" />
        </div>
      )}

      <div className={styles.columns}>
        <p className={styles.text}>{data.text_left}</p>
        <p className={styles.text}>{data.text_right}</p>
      </div>
    </section>
  )
}