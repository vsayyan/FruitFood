'use client'

import { useEffect, useRef } from 'react'
import styles from './CompositionModal.module.css'

export default function CompositionModal({ name, weight, composition, labels, onClose }) {
  const closeButton = useRef(null)

  useEffect(() => {
    closeButton.current?.focus()

    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
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
        <div className={styles.dialogHeader}>
          <div>
            <p className={styles.eyebrow}>{labels.composition_eyebrow}</p>
            <h2 id="composition-title">{name} — {weight}</h2>
          </div>
          <button
            ref={closeButton}
            className={styles.closeButton}
            type="button"
            onClick={onClose}
            aria-label={labels.close_button}
          >
            ×
          </button>
        </div>
        <p className={styles.composition}>{composition}</p>
      </section>
    </div>
  )
}
