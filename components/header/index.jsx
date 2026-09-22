"use client"

import Logo from './Logo'
import Navbar from './Navbar'
import Langs from './Langs'
import Menubar from './Menubar'
import styles from './Header.module.css'
import { useMenubar } from '@/context/menubarContext'

export default function Header({ data }) {
  const {isMenuOpen} = useMenubar();
  
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.header_container}>
          <div className={styles.row}>
            <Logo data={data.logo} />
            <div className={`${styles.right_side} ${isMenuOpen ? styles.mobile_open : ""}`}>
              <Navbar data={data.navbar} categories={data.categories} lang={data.lang}/> 
              {/* categories ները պետք է վերցնել layout.jsx-ից որպես props
              "const categories = await getCategories(lang)" */}
              <Langs data={data.langs} lang={data.lang} />                              
            </div>

          </div>

          <Menubar/>
        </div>
      </div>
    </header>
  )
}