'use client'

import { useState } from 'react'
import styles from './ProductShowcaseSlider.module.css'

// TODO: check these files exist in public/images/products/test/ (or swap in the real photos)
const productSlides = [
  '/images/about-us/factory-1.jpg',
  '/images/about-us/factory-1.jpg',
  '/images/about-us/factory-1.jpg',
]

const SWIPE_THRESHOLD = 50

export default function ProductShowcaseSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStartX, setTouchStartX] = useState(null)

  const lastIndex = productSlides.length - 1

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, lastIndex))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  const handleTouchStart = (event) => {
    setTouchStartX(event.touches[0].clientX)
  }

  const handleTouchEnd = (event) => {
    if (touchStartX === null) return

    const diff = touchStartX - event.changedTouches[0].clientX

    if (diff > SWIPE_THRESHOLD) nextSlide()
    if (diff < -SWIPE_THRESHOLD) prevSlide()

    setTouchStartX(null)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div
          className={styles.slider}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={styles.track}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {productSlides.map((src, index) => (
              <div
                key={src}
                className={styles.slide}
                aria-hidden={index === currentIndex ? undefined : 'true'}
              >
                <img
                  src={src}
                  alt="Choco Chir product showcase"
                  className={styles.image}
                  draggable="false"
                />
              </div>
            ))}
          </div>

          {currentIndex > 0 && (
            <button
              type="button"
              className={`${styles.navButton} ${styles.prev}`}
              onClick={prevSlide}
              aria-label="Previous product image"
            >
              ‹
            </button>
          )}

          {currentIndex < lastIndex && (
            <button
              type="button"
              className={`${styles.navButton} ${styles.next}`}
              onClick={nextSlide}
              aria-label="Next product image"
            >
              ›
            </button>
          )}
        </div>
      </div>
    </div>
  )
}