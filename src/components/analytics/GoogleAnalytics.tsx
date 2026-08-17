'use client'

import { useEffect } from 'react'

/**
 * Propriedade GA4 criada em 17/08/2026 (`G-1H646N1MPQ`), com o fuso de Campo
 * Grande. O ID vive na env `NEXT_PUBLIC_GA_ID` da Vercel, não aqui: em
 * ambiente sem a variável o componente simplesmente não carrega nada, que é o
 * comportamento certo em desenvolvimento e em preview.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || ''

/**
 * Carrega o GA4 só na primeira interação (ou após 5s). Mantém o JS fora do
 * caminho crítico do LCP — o Lighthouse mobile agradece.
 */
export default function GoogleAnalytics() {
  useEffect(() => {
    if (!GA_ID) return
    let carregado = false

    const carregar = () => {
      if (carregado) return
      carregado = true

      const script = document.createElement('script')
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
      script.async = true
      document.head.appendChild(script)

      const inline = document.createElement('script')
      inline.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_ID}', { page_path: window.location.pathname });
      `
      document.head.appendChild(inline)

      window.removeEventListener('scroll', carregar)
      window.removeEventListener('click', carregar)
      window.removeEventListener('touchstart', carregar)
    }

    window.addEventListener('scroll', carregar, { once: true, passive: true })
    window.addEventListener('click', carregar, { once: true })
    window.addEventListener('touchstart', carregar, { once: true, passive: true })
    const timer = setTimeout(carregar, 5000)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', carregar)
      window.removeEventListener('click', carregar)
      window.removeEventListener('touchstart', carregar)
    }
  }, [])

  return null
}
