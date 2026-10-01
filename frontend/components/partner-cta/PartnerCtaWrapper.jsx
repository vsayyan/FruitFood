'use client'

import { usePathname } from 'next/navigation'
import PartnerCta from './PartnerCta'

export default function PartnerCtaWrapper() {
  const pathname = usePathname()

  if (pathname.startsWith('/contact')) {
    return null
  }

  return <PartnerCta />
}
