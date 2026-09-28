'use client'

import { useState } from 'react'
import styles from './OurFactory.module.css'

export default function OurFactory({ data }) {
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

  if (!sliderImages.length) {
    return null
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>

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
            <img
              src={sliderImages[currentIndex].image}
              alt={data.label}
              className={styles.sliderImage}
            />

            {sliderImages.length > 1 && (
              <>
                <button
                  type="button"
                  className={`${styles.arrow} ${styles.prev}`}
                  onClick={prevSlide}
                >
                  ‹
                </button>

                <button
                  type="button"
                  className={`${styles.arrow} ${styles.next}`}
                  onClick={nextSlide}
                >
                  ›
                </button>

                <div className={styles.dots}>
                  {sliderImages.map((item, index) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`${styles.dot} ${
                        index === currentIndex ? styles.active : ''
                      }`}
                      onClick={() => setCurrentIndex(index)}
                    />
                  ))}
                </div>
              </>
            )}
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