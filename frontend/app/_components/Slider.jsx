'use client'

import { useState } from 'react'
import styles from './Slider.module.css'
import Image from 'next/image'

function Slider({ data}) {
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
    <>
        <div className={styles.slider}>
                <Image
                    src={sliderImages[currentIndex].image}
                    alt={data.slider_image_label ?? ''}
                    width={517}
                    height={480}
                    className={styles.sliderImage}
                    preload
                />

                {sliderImages.length > 1 && (
                <>
                    <button
                    type='button'
                    className={`${styles.arrow} ${styles.prev}`}
                    onClick={prevSlide}
                    aria-label={data.slider_previous_label}
                    >
                    ‹
                    </button>

                    <button
                    type='button'
                    className={`${styles.arrow} ${styles.next}`}
                    onClick={nextSlide}
                    aria-label={data.slider_next_label}
                    >
                    ›
                    </button>

                    <div
                    className={styles.dots}
                    role='group'
                    aria-label={data.slider_navigation_label}
                    >
                    {sliderImages.map((item, index) => (
                        <button
                        key={item.id}
                        type='button'
                        className={`${styles.dot} ${
                            index === currentIndex ? styles.active : ''
                        }`}
                        onClick={() => setCurrentIndex(index)}
                        aria-label={`${data.slider_dot_label ?? ''} ${index + 1}`}
                        aria-current={
                            index === currentIndex ? 'true' : undefined
                        }
                        />
                    ))}
                    </div>
                </>
                )}
        </div>
    </>
  )
}

export default Slider