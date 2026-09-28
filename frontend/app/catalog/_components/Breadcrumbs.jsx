import React from 'react';
import Link from 'next/link';
import styles from './Breadcrumbs.module.css';

export default function Breadcrumbs({ items = [] }) {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={styles.nav}>
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.id || index} className={styles.item}>
              {item.path && !isLast ? (
                <Link href={item.path} className={styles.link}>
                  {item.label}
                </Link>
              ) : (
                <span className={styles.active} aria-current="page">
                  {item.label}
                </span>
              )}
              {!isLast && <span className={styles.separator}>/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}