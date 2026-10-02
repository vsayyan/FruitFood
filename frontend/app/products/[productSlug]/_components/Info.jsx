'use client'

import { useState } from 'react'
import CompositionModal from './CompositionModal'
import styles from './Info.module.css'

export default function Info({ product, tags, labels, selectedIndex, onSelect }) {
  const variants = product.variants ?? []
  const [isCompositionOpen, setIsCompositionOpen] = useState(false)
  const selectedVariant = variants[selectedIndex]
  const weight = `${product.weight_value}${labels.weight_unit}`

  return (
    <section className={styles.info}>
      <p className={styles.eyebrow}>
        {weight}
        {variants.length > 0 && ` · ${variants.length} ${labels.taste_unit}`}
      </p>

      <h1 className={styles.title}>{product.name}</h1>

      {variants.length > 0 && (
        <div className={styles.variants}>
          <div className={styles.variantsHeading}>
            <span className={styles.variantsLabel}>{labels.variants_label}</span>
            {selectedVariant && (
              <span className={styles.selectedName}>{selectedVariant.flavor}</span>
            )}
          </div>

          <div className={styles.variantGrid}>
            {variants.map((variant, index) => {
              const isSelected = index === selectedIndex

              return (
                <button
                  className={`${styles.variant} ${isSelected ? styles.selected : ''}`}
                  key={variant.id}
                  type="button"
                  onClick={() => onSelect(index)}
                  aria-pressed={isSelected}
                  aria-label={variant.flavor}
                  title={variant.flavor}
                >
                  {variant.image ? (
                    <img className={styles.variantImage} src={variant.image} alt="" />
                  ) : (
                    <span className={styles.variantName}>{variant.flavor}</span>
                  )}
                  {isSelected && (
                    <span className={styles.check} aria-hidden="true">
                      <img src="/images/products/icons/check.svg" alt="" />
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {product.description && (
        <div className={styles.descriptionWrap}>
          <p className={styles.description}>{product.description}</p>
        </div>
      )}

      {tags.length > 0 && (
        <ul className={styles.tags}>
          {tags.map((tag) => (
            <li className={styles.tag} key={tag.code}>
              {tag.icon} {tag.label}
            </li>
          ))}
        </ul>
      )}

      {product.composition && (
        <button
          className={styles.compositionButton}
          type="button"
          onClick={() => setIsCompositionOpen(true)}
          aria-haspopup="dialog"
        >
          <span className={styles.compositionIcon} aria-hidden="true">
            <img src="/images/products/icons/composition.svg" alt="" width="16" height="16" />
          </span>
          <span className={styles.compositionText}>{labels.composition_button}</span>
          <span className={styles.compositionArrow} aria-hidden="true">→</span>
        </button>
      )}

      {isCompositionOpen && (
        <CompositionModal
          title={`${product.name} — ${weight}`}
          composition={product.composition}
          labels={labels}
          onClose={() => setIsCompositionOpen(false)}
        />
      )}
    </section>
  )
}
