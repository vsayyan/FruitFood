'use client'

import { useState } from 'react'
import Image from 'next/image'
import styles from './Philosophy.module.css'

export default function Philosophy({ headings, text }) {
  const heading = headings?.[0] || {}
  const content = text?.[0] || {}
  const images = content.images || []

  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <section className={`container ${styles.philosophy}`}>
      {images.length > 0 && (
        <div className={styles.slider}>
          <Image
            src={images[currentIndex].image}
            alt={images[currentIndex].alt ?? ''}
            fill
            sizes='(max-width: 900px) 100vw, 579px'
            className={styles.image}
            priority
          />

          {images.length > 1 && (
            <>
              <button
                type='button'
                className={`${styles.arrow} ${styles.prev}`}
                onClick={prevSlide}
                aria-label={content.slider_previous_label}
              >
                ‹
              </button>

              <button
                type='button'
                className={`${styles.arrow} ${styles.next}`}
                onClick={nextSlide}
                aria-label={content.slider_next_label}
              >
                ›
              </button>

              <div
                className={styles.dots}
                role='group'
                aria-label={content.slider_navigation_label}
              >
                {images.map((item, index) => (
                  <button
                    key={item.id}
                    type='button'
                    className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`${content.slider_image_label} ${index + 1}`}
                    aria-current={index === currentIndex ? 'true' : undefined}
                  />
                ))}
              </div>
            </>
          )}
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
        <a href='/#faq' className={styles.link}>
          {content.btn}
          <span aria-hidden='true'>→</span>
        </a>
      </div>
    </section>
  )
}
