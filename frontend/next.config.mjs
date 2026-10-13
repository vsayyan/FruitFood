const apiUrl = process.env.NEXT_PUBLIC_API_URL || ''
const isLocalApi = /\/\/(127\.0\.0\.1|localhost)(:|\/|$)/.test(apiUrl)

const apiPatterns = []
if (apiUrl && !isLocalApi) {
  const { protocol, hostname, port } = new URL(apiUrl)
  for (const pathname of ['/media/**', '/static/**']) {
    apiPatterns.push({ protocol: protocol.replace(':', ''), hostname, port, pathname })
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: '127.0.0.1', port: '8000', pathname: '/media/**' },
      { protocol: 'http', hostname: 'localhost', port: '8000', pathname: '/media/**' },
      { protocol: 'http', hostname: '127.0.0.1', port: '8000', pathname: '/static/**' },
      { protocol: 'http', hostname: 'localhost', port: '8000', pathname: '/static/**' },
      ...apiPatterns,
    ],
    // Local Django (127.0.0.1) is a private IP, Next.js blocks it by default.
    // Allowed only when the API itself is local, so a real domain in production stays protected.
    dangerouslyAllowLocalIP: isLocalApi,
  },
}

export default nextConfig
