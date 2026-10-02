'use client'

import Error from './error'
import { fontVariables } from './fonts'
import './globals.css'

/*
  error.jsx-ը բռնում ա միայն էջերի սխալները։ Եթե սխալը layout-ում ա
  (Header/Footer/CTA-ն API-ից տվյալ չստացան, օրինակ json-server-ը
  միացած չի), Next.js-ը ցույց ա տալիս այս ֆայլը՝ layout-ի փոխարեն։
  Դրա համար այստեղ պետք ա ունենալ սեփական <html> ու <body>։
  Բովանդակությունը նույն error.jsx-ն ա (նույն տեքստերը, նույն ոճը)։
*/
export default function GlobalError({ error, reset }) {
  return (
    <html lang="am" className={fontVariables}>
      <body>
        <Error error={error} reset={reset} />
      </body>
    </html>
  )
}
