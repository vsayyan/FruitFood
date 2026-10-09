'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import styles from './CompositionModal.module.css'
import asset from '@/lib/assets'

export default function CompositionModal({ title, composition, labels, onClose }) {
  const closeButton = useRef(null)

  useEffect(() => {
    closeButton.current?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  return (
    <div
      className={styles.backdrop}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="composition-title"
      >
        <p className={styles.eyebrow}>{labels.composition_eyebrow}</p>
        <h2 className={styles.title} id="composition-title">{title}</h2>
        <div className={styles.body}>
          <p>{composition}</p>
        </div>
        <button
          ref={closeButton}
          className={styles.closeButton}
          type="button"
          onClick={onClose}
          aria-label={labels.close_button}
        >
          <Image src={asset('/images/products/icons/close.svg')} alt="" width={16} height={16} />
        </button>
      </section>
    </div>
  )
}
