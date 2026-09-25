'use client'

import { useState } from 'react'
import styles from './Gallery.module.css'

export default function Gallery({ images, name, labels }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [failedImages, setFailedImages] = useState({})
  const image = images[activeIndex]

  function showImage(index) {
    setActiveIndex((index + images.length) % images.length)
  }

  return (
    <section className={styles.gallery} aria-label={name}>
      <div className={styles.stage} aria-live="polite">
        {image && !failedImages[image] ? (
          <img
            className={styles.mainImage}
            src={image}
            alt={`${name} — ${labels.image_label.toLowerCase()} ${activeIndex + 1}`}
            onError={() => setFailedImages((current) => ({ ...current, [image]: true }))}
          />
        ) : (
          <div className={styles.fallback}>
            <span className={styles.fruitMark} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span className={styles.fallbackName}>{name}</span>
          </div>
        )}

        {images.length > 1 && (
          <div className={styles.controls}>
            <button
              type="button"
              onClick={() => showImage(activeIndex - 1)}
              aria-label={labels.previous_image}
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => showImage(activeIndex + 1)}
              aria-label={labels.next_image}
            >
              →
            </button>
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className={styles.thumbnails} aria-label={name}>
          {images.map((src, index) => (
            <button
              className={`${styles.thumbnail} ${index === activeIndex ? styles.activeThumbnail : ''}`}
              key={src}
              type="button"
              onClick={() => showImage(index)}
              aria-label={`${labels.image_label} ${index + 1}`}
              aria-pressed={index === activeIndex}
            >
              {failedImages[src] ? (
                <span className={styles.thumbnailFallback} aria-hidden="true">{name}</span>
              ) : (
                <img
                  src={src}
                  alt=""
                  onError={() => setFailedImages((current) => ({ ...current, [src]: true }))}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </section>
  )
}
