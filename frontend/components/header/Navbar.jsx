'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMenubar } from '@/context/menubarContext'
import styles from './Navbar.module.css'
import asset from '@/lib/assets'

export default function Navbar({ data, categories, labels }) {
  const pathname = usePathname()

  const [openProducts, setOpenProducts] = useState(false)

  const { setIsMenuOpen } = useMenubar()

  return (
    <nav className={styles.nav}>
      {data.map((item) => {
        const isCatalog = item.url.startsWith('/catalog')

        return (
          <div
            key={item.id}
            className={`${styles.link_div} ${
              isCatalog ? styles.catalog_link : ''
            }`}
          >
            <div className={styles.products_row}>
              <Link
                href={item.url}
                className={`
                  ${styles.navLink}
                  ${
                    pathname === item.url ||
                    (isCatalog && pathname.startsWith('/catalog'))
                      ? styles.active
                      : ''
                  }
                `}
                onClick={() => {
                  setOpenProducts(false)
                  setIsMenuOpen(false)
                }}
              >
                {item.title}
              </Link>

              {isCatalog && (
                <button
                  type="button"
                  className={styles.products_toggle}
                  aria-label={labels?.products_toggle_label}
                  aria-expanded={openProducts}
                  onClick={() => setOpenProducts((prev) => !prev)}
                >
                  <Image
                    src={asset('/images/header/down.svg')}
                    alt=""
                    width={9}
                    height={8}
                    className={`${styles.downup_sign} ${styles.down_sign}`}
                  />

                  <Image
                    src={asset('/images/header/up.svg')}
                    alt=""
                    width={9}
                    height={8}
                    className={`${styles.downup_sign} ${styles.up_sign}`}
                  />
                </button>
              )}
            </div>

            {isCatalog && (
              <div
                className={`${styles.categories} ${
                  openProducts ? styles.mobile_open_products : ''
                }`}
              >
                {categories &&
                  categories.map((elem) => (
                    <Link
                      href={`/catalog/${elem.slug}`}
                      key={elem.id}
                      className={styles.category}
                      onClick={() => {
                        setOpenProducts(false)
                        setIsMenuOpen(false)
                      }}
                    >
                      <Image
                        src={
                          elem.slug === 'dried-fruits'
                            ? asset('/images/header/dried-fruits.svg')
                            : asset('/images/header/chocolate-covered.svg')
                        }
                        alt={elem.name}
                        width={48}
                        height={48}
                      />

                      <span>{elem.name}</span>
                    </Link>
                  ))}

                <Link
                  href="/catalog"
                  className={styles.category}
                  onClick={() => {
                    setOpenProducts(false)
                    setIsMenuOpen(false)
                  }}
                >
                  <Image
                    src={asset('/images/header/all-products.svg')}
                    alt=""
                    width={48}
                    height={48}
                  />

                  <span>{labels?.all_products}</span>
                </Link>
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}