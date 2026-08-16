// Eventos do Google Analytics 4. Nomes em pt-BR para leitura direta no painel.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function trackEvent(nome: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', nome, params || {})
  }
}

export function trackWhatsAppClick(origem: string, servico?: string, bairro?: string) {
  trackEvent('clique_whatsapp', {
    origem,
    servico: servico || 'nao_especificado',
    bairro: bairro || 'nao_especificado',
  })
}

export function trackPhoneClick(origem: string) {
  trackEvent('clique_telefone', { origem })
}

export function trackServiceClick(nome: string, slug: string) {
  trackEvent('clique_servico', { servico_nome: nome, servico_slug: slug })
}

export function trackBairroClick(nome: string, slug: string) {
  trackEvent('clique_bairro', { bairro_nome: nome, bairro_slug: slug })
}
