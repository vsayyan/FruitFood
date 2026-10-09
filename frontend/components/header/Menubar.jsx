'use client'

import Image from 'next/image'
import { useMenubar } from '@/context/menubarContext'
import styles from './Header.module.css'
import asset from '@/lib/assets'

const Menubar = ({ label }) => {
    const {isMenuOpen, setIsMenuOpen} = useMenubar()

    return (
        <div className={styles.menubar_div}>
            <button
                type='button'
                className={styles.menubarButton}
                onClick={() => setIsMenuOpen(prev => !prev)}
                aria-label={label ?? ''}
                aria-expanded={isMenuOpen}
            >
                <Image
                    src={
                        isMenuOpen  ? asset('/images/header/x_mark.svg')
                                    : asset('/images/header/menubar.svg')
                    }
                    className={styles.menubar}
                    alt=''
                    width={30}
                    height={30}
                />
            </button>
        </div>
    )
}

export default Menubar