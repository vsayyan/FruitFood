'use client'

import { useMenubar } from '@/context/menubarContext'
import Langs from './Langs'
import Navbar from './Navbar'
import styles from './Header.module.css'

export default function RightSide({data}) {
    const {isMenuOpen} = useMenubar()

  return (
     <div className={`${styles.right_side} ${isMenuOpen ? styles.mobile_open : ''}`}>
        <Navbar data={data.navbar} categories={data.categories} lang={data.lang}/>
        <Langs data={data.langs} lang={data.lang} />                              
    </div>
  )
}
