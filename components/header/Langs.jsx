'use client'

import Image from 'next/image'
import styles from './Header.module.css'
import { useMenubar } from '@/context/menubarContext'

// Լեզուն փոխելը = cookie գրել + reload անել, որ Server Component-երը
// (page.jsx, layout.js) նոր lang-ով նորից fetch անեն json-server-ից։
export default function Langs({ data, lang }) {
  const {isMenuOpen} = useMenubar();

  const changeLang = (code) => {
    const date = new Date()
    date.setFullYear(date.getFullYear() + 10)
    document.cookie = `lang=${code}; path=/; expires=${date.toUTCString()}`
    document.cookie = `munubar=${isMenuOpen}; path=/; expires=${date.toUTCString()}`
    window.location.reload()
  }

  return (
    <div className={styles.langDropdown}>
      <span className={styles.currentLang}>
        <Image
                src={`/images/header/${lang}.svg`}
                alt="language"
                width={19}
                height={15}
                loading="eager"
            />
      </span>
      <div className={styles.langMenu}>
        {data.map((item) => (
          <button key={item.id} onClick={(e) => changeLang(item.code)} className={styles.langOption}>
             <Image
                            src={item.image}
                            alt={item.label}
                            width={19}
                            height={15}
                            className={styles.language_flag}
                        />
                        <p className={styles.language}>
                            {item.label}
                        </p>
            
          </button>
        ))}
      </div>
    </div>
  )
}
