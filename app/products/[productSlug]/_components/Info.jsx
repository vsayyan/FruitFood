'use client'

import { useState } from 'react'
import CompositionModal from './CompositionModal'
import styles from './Info.module.css'

export default function Info({ product, tags, labels }) {
  const [selectedVariant, setSelectedVariant] = useState(
    () => ((product.variants?.length ?? 0) > 1 ? 1 : 0),
  )
  const [isCompositionOpen, setIsCompositionOpen] = useState(false)
  const [failedVariants, setFailedVariants] = useState({})
  const variants = product.variants ?? []
  const activeVariant = variants[selectedVariant]
  const weight = `${product.weight_value}${product.weight_unit === 'g' ? labels.weight_unit : ` ${product.weight_unit}`}`

  return (
    <section className={styles.info}>
      <div className={styles.eyebrow}>
        <span>
          {weight}
          {variants.length > 0 && ` · ${variants.length} ${labels.taste_unit}`}
        </span>
      </div>

      <h1 className={styles.title}>{product.name}</h1>

      {variants.length > 0 && (
        <div className={styles.variantSection}>
          <div className={styles.sectionHeading}>
            <span>{labels.variants_label}</span>
            {activeVariant && <span className={styles.selectedName}>{activeVariant.flavor}</span>}
          </div>
          <div className={styles.variantGrid}>
            {variants.map((variant, index) => (
              <button
                className={`${styles.variant} ${index === selectedVariant ? styles.activeVariant : ''}`}
                key={variant.id}
                type="button"
                onClick={() => setSelectedVariant(index)}
                aria-pressed={index === selectedVariant}
                aria-label={`${variant.flavor}${index === selectedVariant ? `, ${labels.selected_label}` : ''}`}
              >
                <span className={styles.variantImage}>
                  {variant.image && !failedVariants[variant.id] ? (
                    <img
                      src={variant.image}
                      alt=""
                      onError={() => setFailedVariants((current) => ({ ...current, [variant.id]: true }))}
                    />
                  ) : (
                    <span className={styles.variantArtwork} aria-hidden="true">
                      <span />
                      <span />
                      <span />
                    </span>
                  )}
                </span>
                {index === selectedVariant && <span className={styles.checkmark} aria-hidden="true">✓</span>}
              </button>
            ))}
          </div>
        </div>
      )}

      {product.description && <p className={styles.description}>{product.description}</p>}

      {tags.length > 0 && (
        <ul className={styles.tags} aria-label={product.name}>
          {tags.map((tag) => (
            <li className={styles.tag} key={tag.code}>
              <span aria-hidden="true">{tag.icon}</span>
              {tag.label}
            </li>
          ))}
        </ul>
      )}

      <button
        className={styles.compositionButton}
        type="button"
        onClick={() => setIsCompositionOpen(true)}
        aria-haspopup="dialog"
      >
        <span className={styles.compositionIcon} aria-hidden="true">▤</span>
        <span>{labels.composition_button}</span>
        <span className={styles.compositionArrow} aria-hidden="true">→</span>
      </button>

      {isCompositionOpen && (
        <CompositionModal
          name={product.name}
          weight={weight}
          composition={product.composition}
          labels={labels}
          onClose={() => setIsCompositionOpen(false)}
        />
      )}
    </section>
  )
}
