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

    /*
      O `gtag` nasce aqui, na hidratação, e não junto do script pesado.

      Antes ele só passava a existir quando a biblioteca era carregada, na
      primeira interação. Só que o handler do React roda ANTES do listener de
      `window` que dispara esse carregamento — então o primeiro clique da
      sessão encontrava `window.gtag` indefinido e era descartado em silêncio
      por trackEvent(). Justamente o clique que mais importa: em boa parte das
      visitas, o primeiro clique é o do WhatsApp, que é a conversão.

      O gtag real é só uma fila: empilha no dataLayer e a biblioteca consome
      tudo quando sobe. Criá-lo cedo não custa requisição nenhuma, e o script
      de verdade continua fora do caminho crítico do LCP.
    */
    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params -- o gtag oficial empilha o próprio `arguments`.
      window.dataLayer!.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', GA_ID, { page_path: window.location.pathname })

    let carregado = false

    const carregar = () => {
      if (carregado) return
      carregado = true

      const script = document.createElement('script')
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
      script.async = true
      document.head.appendChild(script)

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
