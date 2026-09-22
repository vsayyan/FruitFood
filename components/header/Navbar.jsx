'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Header.module.css'
import { useState } from 'react'
import { useMenubar } from '@/context/menubarContext'

export default function Navbar({ data, categories, lang }) {
  const pathname = usePathname()
  const [openProducts, setOpenProducts] = useState(false)  
  const {setIsMenuOpen} = useMenubar


  const allProducts = {
    "am": "Ամբողջ արտադրանքը",
    "ru": "Все продукты",
    "en": "All products"
  }
  
  return (
    <nav className={styles.nav}>
      {data.map((item) => {

        return (
          <div key={item.id} className={styles.link_div}>
            <Link 
              href={item.url} 
              className={`
                ${styles.navLink} ${pathname === item.url ? styles.active : ""}
                ${item.url.startsWith("/catalog") && pathname.startsWith("/catalog") ? styles.active : ""}
              `}
              onClick={() => {
                 setOpenProducts(false)
                 setIsMenuOpen(false)
              }}
            >
              {item.title}
            </Link>
            {
              item.url.startsWith("/catalog") &&
              <div className={styles.products} onClick={() => setOpenProducts(!openProducts)}>
                <Image 
                            src={`${ openProducts ? "/images/header/up.svg" : "/images/header/down.svg"}`}
                            alt={item.title}
                            width={9}
                            height={8}
                            className={styles.downup_sign}
                />
                <div className={`${styles.categories} ${openProducts ? styles.open_products : ""}`}>
                  {categories && categories.map((elem) => (
                    <Link href={`/catalog/${elem.slug}`} key={elem.id} className={styles.category} onClick={() => setIsMenuOpen(false)}>
                      <Image
                        src={`${elem.slug === "dried-fruits" ? "/images/header/dried-fruits.svg" : "/images/header/chocolate-covered.svg"}`}
                        alt={elem.name}
                        width={48}
                        height={48}
                      />
                      <span>
                        {elem.name}
                      </span>
                    </Link>
                  ))}
                  
                  <Link href={`/catalog`} className={styles.category} onClick={() => setIsMenuOpen(false)}>
                      <Image
                        src={"/images/header/all-products.svg"}
                        alt={"mark for all products"}
                        width={48}
                        height={48}
                      />
                      <span>
                        {allProducts[lang]}
                      </span>
                    </Link>
                </div>
              </div>
            }
          </div>
        )
      })}
    </nav>
  )
}
