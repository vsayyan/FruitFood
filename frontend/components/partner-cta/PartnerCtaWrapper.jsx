'use client'

import { usePathname } from 'next/navigation'

// Client Component միայն pathname-ի համար. CTA-ն ինքը server-ում ա render
// արվում ու գալիս ա children-ով, /contact էջում չի ցուցադրվում։
export default function PartnerCtaWrapper({ children }) {
  const pathname = usePathname()

  if (pathname?.startsWith('/contact')) {
    return null
  }

  return children
}
