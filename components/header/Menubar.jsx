'use client'

import Image from 'next/image'
import { useMenubar } from '@/context/menubarContext'
import styles from './Header.module.css'


const Menubar = () => {
    const {isMenuOpen, setIsMenuOpen} = useMenubar()

    return (
        <div className={styles.menubar_div}>
            <Image
                src={
                    isMenuOpen  ? '/images/header/x_mark.svg'
                                : '/images/header/menubar.svg'
                }
                className={styles.menubar}
                alt='menu-bar'
                width={30}
                height={30}
                onClick={() => setIsMenuOpen(prev => !prev)}
            />
        </div>
    )
}

export default Menubar