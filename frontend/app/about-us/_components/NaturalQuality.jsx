'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './NaturalQuality.module.css'

/*
  About us · Section 1 (Figma about: 171:5173 + 171:5200 + 171:5215,
  main_mobile: 181:6933)։ Breadcrumb + վերնագիր, նկար (slider), երկու սյունակ տեքստ։
  Fixed header-ի տեղը այս բաժնի padding-ի մեջ ա (ինչպես Catalog-ի breadcrumb-ում)։
*/
export default function NaturalQuality({ data, labels, current }) {
  // hook-երը պետք ա լինեն ամեն return-ից առաջ
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!data) return null

  const slides = data.slider ?? []
  const lastIndex = slides.length - 1

  const nextSlide = () => setCurrentIndex((prev) => (prev === lastIndex ? 0 : prev + 1))
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? lastIndex : prev - 1))

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
              <img
                src={slides[currentIndex].image}
                alt={data.image_alt ?? ''}
                className={styles.sliderImage}
              />

              {slides.length > 1 && (
                <>
                  <button
                    type='button'
                    className={`${styles.arrow} ${styles.prev}`}
                    onClick={prevSlide}
                    aria-label={labels?.slider_previous_label}
                  >
                    ‹
                  </button>

                  <button
                    type='button'
                    className={`${styles.arrow} ${styles.next}`}
                    onClick={nextSlide}
                    aria-label={labels?.slider_next_label}
                  >
                    ›
                  </button>

                  <div
                    className={styles.dots}
                    role='group'
                    aria-label={labels?.slider_navigation_label}
                  >
                    {slides.map((item, index) => (
                      <button
                        key={item.id ?? index}
                        type='button'
                        className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
                        onClick={() => setCurrentIndex(index)}
                        aria-label={`${labels?.slider_image_label ?? ''} ${index + 1}`}
                        aria-current={index === currentIndex ? 'true' : undefined}
                      />
                    ))}
                  </div>
                </>
              )}
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
