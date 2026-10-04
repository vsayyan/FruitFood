import { cookies } from 'next/headers'

export const displayLang = async () => {
  const cookieStore = await cookies()
  return cookieStore.get('lang')?.value ?? 'am'
}
