'use client'

import { useState } from 'react'
import styles from './Gallery.module.css'

export default function Gallery({ images, name, labels }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const hasMany = images.length > 1

  function showImage(index) {
    setActiveIndex((index + images.length) % images.length)
  }

  return (
    <section className={styles.gallery} aria-label={name}>
      <div className={styles.stageWrap}>
        <div className={styles.stage} aria-live="polite">
          {images[activeIndex] && (
            <img
              className={styles.mainImage}
              src={images[activeIndex]}
              alt={`${name} — ${labels.image_label} ${activeIndex + 1}`}
            />
          )}
        </div>

        {hasMany && (
          <div className={styles.controls}>
            <button
              className={styles.arrow}
              type="button"
              onClick={() => showImage(activeIndex - 1)}
              aria-label={labels.previous_image}
            >
              <img className={styles.arrowPrev} src="/images/products/icons/arrow.svg" alt="" width="24" height="24" />
            </button>
            <button
              className={styles.arrow}
              type="button"
              onClick={() => showImage(activeIndex + 1)}
              aria-label={labels.next_image}
            >
              <img className={styles.arrowNext} src="/images/products/icons/arrow.svg" alt="" width="24" height="24" />
            </button>
          </div>
        )}
      </div>

      {hasMany && (
        <div className={styles.thumbnails}>
          {images.map((src, index) => (
            <button
              className={`${styles.thumbnail} ${index === activeIndex ? styles.activeThumbnail : ''}`}
              key={src}
              type="button"
              onClick={() => showImage(index)}
              aria-label={`${labels.image_label} ${index + 1}`}
              aria-pressed={index === activeIndex}
            >
              <img src={src} alt="" />
            </button>
          ))}
        </div>
      )}
    </section>
  )
}
