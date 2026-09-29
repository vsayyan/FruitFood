'use client';

import React from 'react';
import Link from 'next/link';
import styles from './ProductCard.module.css';

export default function ProductCard({ product, tasteLabel }) {
  const variantsCount = product.variants?.length || 0;
  const currentImage = product.images?.[0];

  return (
    <Link href={`/products/${product.slug}`} className={styles.cardLink}>
      <div className={styles.card}>
        <div className={styles.imageBox}>
          <img src={currentImage} alt={product.name} className={styles.image} />
        </div>

        <div className={styles.footer}>
          <h3 className={styles.title}>
            {product.name}
            <br />- {product.weight_value}{product.weight_unit}
          </h3>
          
          <span className={styles.variantsCount}>
            {variantsCount} {tasteLabel || 'համ'}
          </span>
        </div>
      </div>
    </Link>
  );
}