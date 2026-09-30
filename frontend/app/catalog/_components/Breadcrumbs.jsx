import React from 'react';
import Link from 'next/link';
import { getProductPageLabels } from '../actions';
import styles from './Breadcrumbs.module.css';

export default async function Breadcrumbs() {
  const pageLabels = await getProductPageLabels();

  if (!pageLabels || Object.keys(pageLabels).length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={styles.nav}>
      <ol className={styles.list}>
        <li className={styles.item}>
          <Link href="/" className={styles.link}>
            {pageLabels.home_label}
          </Link>
          <span className={styles.separator}>/</span>
        </li>
        <li className={styles.item}>
          <span className={styles.active} aria-current="page">
            {pageLabels.all_products_label || pageLabels.catalog_label}
          </span>
        </li>
      </ol>
    </nav>
  );
}