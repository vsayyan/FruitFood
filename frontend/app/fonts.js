import { Noto_Sans_Armenian, Noto_Sans } from 'next/font/google'

const notoSansArmenian = Noto_Sans_Armenian({
  subsets: ['armenian', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-main',
  adjustFontFallback: false,
  fallback: [],
})

const notoSansCyrillic = Noto_Sans({
  subsets: ['cyrillic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cyrillic',
  adjustFontFallback: false,
  fallback: [],
})

export const fontVariables = `${notoSansArmenian.variable} ${notoSansCyrillic.variable}`
