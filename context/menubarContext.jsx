'use client'

import { createContext, useContext, useState } from 'react'


const MenubarContext = createContext(undefined, undefined)

export const MenubarProvider = ({ children }) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    return (
        <MenubarContext.Provider value={{isMenuOpen, setIsMenuOpen}}>
            {children}
        </MenubarContext.Provider>
    )
}

export const useMenubar = () => useContext(MenubarContext)