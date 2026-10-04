'use client'

import Error from './error'
import { fontVariables } from './fonts'
import './globals.css'

export default function GlobalError({ error, reset }) {
  return (
    <html lang="am" className={fontVariables}>
      <body>
        <Error error={error} reset={reset} />
      </body>
    </html>
  )
}
