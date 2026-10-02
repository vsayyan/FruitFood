import { Noto_Sans_Armenian, Noto_Sans } from 'next/font/google'

// Տառատեսակները մեկ տեղում են, որ layout.jsx-ն ու global-error.jsx-ը
// (որը layout-ի փոխարեն ա երևում) նույն տառատեսակն ունենան

const notoSansArmenian = Noto_Sans_Armenian({
  subsets: ['armenian', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-main',
  // Fallback-ը (Arial) չենք ուզում. այն կբռներ ռուսերեն տառերը Noto Sans-ից առաջ
  adjustFontFallback: false,
  fallback: [],
})

// Noto Sans Armenian-ը կիրիլյան տառեր չունի, դրա համար ռուսերենը
// գալիս ա Noto Sans-ից (նույն ընտանիքը, նույն տեսքը)
const notoSansCyrillic = Noto_Sans({
  subsets: ['cyrillic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cyrillic',
  adjustFontFallback: false,
  fallback: [],
})

export const fontVariables = `${notoSansArmenian.variable} ${notoSansCyrillic.variable}`
