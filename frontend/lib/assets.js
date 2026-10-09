const apiUrl = process.env.NEXT_PUBLIC_API_URL || ''
const origin = apiUrl ? new URL(apiUrl).origin : ''

export default function asset(path) {
  return `${origin}/static${path}`
}
