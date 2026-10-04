'use client'

import { usePathname } from 'next/navigation'

export default function PartnerCtaWrapper({ children }) {
  const pathname = usePathname()

  if (pathname?.startsWith('/contact')) {
    return null
  }

  return children
}
