'use client'

import Image from 'next/image'
import styles from './Philosophy.module.css'
import { useState } from 'react'

export default function Philosophy({ headings, text }) {
    const heading = headings?.[0] || {}
    const content = text?.[0] || {}

    const images = [
        '/images/img.png',
        '/images/img2.png',
        '/images/imgg3.png'
    ]

    const [currentImage, setCurrentImage] = useState(0)

    const nextImage = () => {
        setCurrentImage((currentImage + 1) % images.length)
    }

    const previousImage = () => {
        setCurrentImage(
            (currentImage - 1 + images.length) % images.length
        )
    }

    return (
        <section className={styles.philosophy}>
            <div className={styles.left_side}>
                <Image
                    src={images[currentImage]}
                    alt={heading.heading_1 ?? ''}
                    width={579}
                    height={510}
                    className={styles.image}
                    priority
                />

                <button
                    type='button'
                    className={`${styles.sliderButton} ${styles.previous}`}
                    onClick={previousImage}
                    aria-label='Previous image'
                >
                    ‹
                </button>

                <button
                    type='button'
                    className={`${styles.sliderButton} ${styles.next}`}
                    onClick={nextImage}
                    aria-label='Next image'
                >
                    ›
                </button>

                <div className={styles.dots}>
                    {images.map((_, index) =>
                    (
                        <button
                            key={index}
                            type='button'
                            className={
                                index === currentImage
                                    ? styles.activeDot
                                    : styles.dot
                            }
                            onClick={() => setCurrentImage(index)}
                            aria-label={`Go to image ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            <div className={styles.right_side}>
                <h4>{heading.heading_1}</h4>
                <h2>
                    {heading.heading_2_before}
                    <span>{heading.heading_2_highlight}</span>
                    {heading.heading_2_after}
                </h2>
                <p>{content.text}</p>
                <a href="/#faq">
                    {content.btn}
                </a>
            </div>
        </section>
    )
}