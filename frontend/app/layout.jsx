import { Noto_Sans_Armenian } from 'next/font/google'
import { displayLang } from '@/lib/lang'
import PartnerCtaWrapper from '@/components/partner-cta/PartnerCtaWrapper'
import './globals.css'
import { MenubarProvider } from '@/context/menubarContext'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { getLogo } from '@/components/header/action'
import { getFooterLabel } from '@/components/footer/action'

const notoSansArmenian = Noto_Sans_Armenian({
  subsets: ['armenian', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-main',
})

// Site-ի անունը և նկարագրությունը գալիս են db-ից՝ ըստ լեզվի։ Եթե API-ն
// հասանելի չի, metadata-ն պարզապես մնում ա անունով, էջը չի ընկնում։
export async function generateMetadata() {
  const lang = await displayLang()
  let siteName = 'Fruit Food'
  let description

  try {
    const [logo, footer] = await Promise.all([getLogo(), getFooterLabel(lang)])
    siteName = logo?.title || siteName
    description = footer?.description
  } catch {
    // API-ն հասանելի չի՝ թողնում ենք default-ը
  }

  return {
    title: { default: siteName, template: `%s | ${siteName}` },
    description,
  }
}

export default async function RootLayout({ children }) {
  // displayLang()-ը միայն cookie ա կարդում՝ ոչ մի API request,
  // ուրեմն layout-ը աշխատում ա նաև առանց json-server-ի։
  // <html lang>-ը կարևոր ա. error.jsx-ը (Client Component) հենց այդտեղից
  // ա լեզուն վերցնում։
  const lang = await displayLang()

  return (
    <html lang={lang} className={notoSansArmenian.variable}>
      <body className="layout">
        <MenubarProvider>
          <Header />
          <main className="main-content">{children}</main>
          <PartnerCtaWrapper />
          <Footer />
        </MenubarProvider>
      </body>
    </html>
  )
}
