import { displayLang } from '@/lib/lang'
import { fontVariables } from './fonts'
import PartnerCta from '@/components/partner-cta/PartnerCta'
import PartnerCtaWrapper from '@/components/partner-cta/PartnerCtaWrapper'
import './globals.css'
import { MenubarProvider } from '@/context/menubarContext'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { getLogo } from '@/components/header/action'
import { getFooterLabel } from '@/components/footer/action'

export async function generateMetadata() {
  const lang = await displayLang()
  let siteName = 'Fruit Food'
  let description

  try {
    const [logo, footer] = await Promise.all([getLogo(), getFooterLabel(lang)])
    siteName = logo?.title || siteName
    description = footer?.description
  } catch {
  }

  return {
    title: { default: siteName, template: `%s | ${siteName}` },
    description,
  }
}

export default async function RootLayout({ children }) {
  const lang = await displayLang()

  return (
    <html lang={lang} className={fontVariables}>
      <body className="layout">
        <MenubarProvider>
          <Header />
          <main className="main-content">{children}</main>
          <PartnerCtaWrapper>
            <PartnerCta />
          </PartnerCtaWrapper>
          <Footer />
        </MenubarProvider>
      </body>
    </html>
  )
}
