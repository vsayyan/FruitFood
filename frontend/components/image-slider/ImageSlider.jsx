'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './ImageSlider.module.css'

const SWIPE_THRESHOLD = 50

export default function ImageSlider({ images = [], labels = {}, sizes = '100vw', preload = false, href, className = '' }) {
  const [current, setCurrent] = useState(0)
  const touchStartX = useRef(null)
  const count = images.length

  if (!count) return null

  const goTo = (index) => setCurrent((index + count) % count)

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX
  }

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - event.changedTouches[0].clientX
    if (diff > SWIPE_THRESHOLD) goTo(current + 1)
    if (diff < -SWIPE_THRESHOLD) goTo(current - 1)
    touchStartX.current = null
  }

  return (
    <div
      className={`${styles.slider} ${className}`}
      onTouchStart={count > 1 ? handleTouchStart : undefined}
      onTouchEnd={count > 1 ? handleTouchEnd : undefined}
    >
      <div className={styles.track} style={{ transform: `translateX(-${current * 100}%)` }}>
        {images.map((image, index) => {
          const picture = (
            <Image
              src={image.src}
              alt={image.alt ?? ''}
              fill
              sizes={sizes}
              preload={preload && index === 0}
              className={styles.image}
              draggable={false}
            />
          )

          return (
            <div key={`${image.src}-${index}`} className={styles.slide} aria-hidden={index === current ? undefined : 'true'}>
              {href ? (
                <Link href={href} className={styles.slideLink} tabIndex={-1} aria-hidden='true'>
                  {picture}
                </Link>
              ) : (
                picture
              )}
            </div>
          )
        })}
      </div>

      {count > 1 && (
        <>
          <button type='button' className={`${styles.arrow} ${styles.prev}`} onClick={() => goTo(current - 1)} aria-label={labels.previous}>
            ‹
          </button>
          <button type='button' className={`${styles.arrow} ${styles.next}`} onClick={() => goTo(current + 1)} aria-label={labels.next}>
            ›
          </button>
          <div className={styles.dots} role='group' aria-label={labels.navigation}>
            {images.map((image, index) => (
              <button
                key={`${image.src}-${index}`}
                type='button'
                className={`${styles.dot} ${index === current ? styles.active : ''}`}
                onClick={() => goTo(index)}
                aria-label={`${labels.slide ?? ''} ${index + 1}`.trim()}
                aria-current={index === current ? 'true' : undefined}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
