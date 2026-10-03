'use client'

import Image from 'next/image'
import { useMenubar } from '@/context/menubarContext'
import styles from './Header.module.css'


const Menubar = ({ label }) => {
    const {isMenuOpen, setIsMenuOpen} = useMenubar()

    return (
        <div className={styles.menubar_div}>
            {/* button, որ keyboard-ով ու screen reader-ով էլ բացվի */}
            <button
                type='button'
                className={styles.menubarButton}
                onClick={() => setIsMenuOpen(prev => !prev)}
                aria-label={label ?? ''}
                aria-expanded={isMenuOpen}
            >
                <Image
                    src={
                        isMenuOpen  ? '/images/header/x_mark.svg'
                                    : '/images/header/menubar.svg'
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