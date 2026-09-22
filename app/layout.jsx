import { Noto_Sans_Armenian } from 'next/font/google'
import { displayLang } from '@/lib/lang'
import PartnerCtaWrapper from '@/components/partner-cta/PartnerCtaWrapper'
import './globals.css'

const notoSansArmenian = Noto_Sans_Armenian({
  subsets: ['armenian', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-main',
})

export const metadata = {
  title: { default: 'Fruit Food', template: '%s | Fruit Food' },
  description: 'Հայաստանյան բնական չրագործեր և միրգային քաղցրավենիք 1995 թվականից',
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
        {/* TODO(Vahag): <Header /> — components/header (§6) */}
        <main className="main-content">{children}</main>
        <PartnerCtaWrapper />
        {/* TODO(Vahag): <Footer /> — components/footer (§6) */}
      </body>
    </html>
  )
}
