import type { NextConfig } from 'next'

/**
 * Cabeçalhos de segurança — mesma base usada em produção no projeto irmão
 * (Niza Manutenções). `frame-ancestors 'none'` substitui X-Frame-Options:
 * é mais forte e não entra em conflito com a CSP.
 */
const CSP = [
  "default-src 'self'",
  // 'unsafe-eval' SÓ em dev: o React de desenvolvimento usa eval() para
  // reconstruir stack traces e, sem a liberação, o console enche de erro de
  // CSP. Em produção o React nunca chama eval — e a política continua sem ele.
  `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ''} https://www.googletagmanager.com https://www.google-analytics.com`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com",
  "media-src 'self'",
  "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com",
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://wa.me",
  'upgrade-insecure-requests',
].join('; ')

const nextConfig: NextConfig = {
  // Sem isto o Turbopack sobe a raiz procurando lockfile e acha o de ~/ —
  // aí ignora o package-lock.json do projeto e avisa a cada boot.
  turbopack: { root: __dirname },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
  trailingSlash: false,
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Content-Security-Policy', value: CSP },
        ],
      },
    ]
  },
  async redirects() {
    return [
      { source: '/home', destination: '/', permanent: true },
      { source: '/areas-atendidas', destination: '/bairros', permanent: true },
    ]
  },
}

export default nextConfig
