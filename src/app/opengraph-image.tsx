import { ImageResponse } from 'next/og'
import { BUSINESS } from '@/lib/business'

/**
 * Imagem de preview de link (WhatsApp, Instagram, Facebook, LinkedIn, X).
 *
 * Gerada no build pelo `ImageResponse`, em vez de um .jpg solto em `public/`:
 * assim ela nunca fica desatualizada em relação ao telefone e à marca, e não
 * depende de alguém lembrar de reexportar um arquivo.
 *
 * O WhatsApp é o destino mais importante aqui (é o canal de conversão do
 * negócio) e o mais exigente: ele só busca a imagem uma vez e guarda em cache
 * por bastante tempo. Por isso 1200x630 exatos, contraste alto e texto grande o
 * suficiente para ler no card pequeno da conversa.
 */

export const alt = `${BUSINESS.legalName} — Pintura de alto padrão em Campo Grande MS`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * Busca uma fonte do Google Fonts para o `ImageResponse`.
 *
 * Precisa das DUAS famílias da marca: o Satori não tem fallback para
 * 'sans-serif', ele usa a única fonte registrada. Sem a Jakarta, a linha de
 * apoio e o rodapé saíam em Bebas (condensada e só caixa-alta), o que fica
 * ilegível no card pequeno da conversa do WhatsApp.
 *
 * Falha em silêncio de propósito: se a rede cair durante o build, a imagem sai
 * com a fonte padrão em vez de derrubar o deploy por causa de um card.
 */
async function carregarFonte(familia: string): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=${familia}&display=swap`,
      { headers: { 'User-Agent': 'Mozilla/5.0' } }
    ).then((r) => r.text())

    const url = css.match(/src:\s*url\(([^)]+)\)/)?.[1]
    if (!url) return null

    return await fetch(url).then((r) => r.arrayBuffer())
  } catch {
    return null
  }
}

export default async function Image() {
  const [bebas, jakarta] = await Promise.all([
    carregarFonte('Bebas+Neue'),
    carregarFonte('Plus+Jakarta+Sans:wght@500'),
  ])

  const fontes = [
    ...(bebas
      ? [{ name: 'Bebas', data: bebas, style: 'normal' as const, weight: 400 as const }]
      : []),
    ...(jakarta
      ? [{ name: 'Jakarta', data: jakarta, style: 'normal' as const, weight: 500 as const }]
      : []),
  ]

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '70px 80px',
          background: 'linear-gradient(135deg, #0f2437 0%, #1b3a5c 52%, #24486e 100%)',
          fontFamily: 'Bebas',
        }}
      >
        {/* Diamante grande, recortado no canto: dá presença de marca sem virar ruído */}
        <svg
          width="620"
          height="620"
          viewBox="-70 -86 140 172"
          style={{ position: 'absolute', right: -170, top: -40, opacity: 0.07 }}
        >
          <polygon points="0,-78 62,0 0,78 -62,0" fill="#2E5580" />
          <polygon points="0,-78 62,0 0,10" fill="#5B7FA6" />
          <polygon points="0,-78 -62,0 0,10" fill="#2E5580" />
          <polygon points="-62,0 0,10 0,78" fill="#C8963E" />
          <polygon points="62,0 0,10 0,78" fill="#A87B2F" />
        </svg>

        {/* Marca */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <svg width="62" height="76" viewBox="-70 -86 140 172">
            <polygon points="0,-78 62,0 0,78 -62,0" fill="#2E5580" />
            <polygon points="0,-78 62,0 0,10" fill="#5B7FA6" />
            <polygon points="0,-78 -62,0 0,10" fill="#2E5580" />
            <polygon points="-62,0 0,10 0,78" fill="#C8963E" />
            <polygon points="62,0 0,10 0,78" fill="#A87B2F" />
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontSize: 52, letterSpacing: 2, lineHeight: 1 }}>
              <span style={{ color: '#F7F4EF' }}>NOBRE&nbsp;</span>
              <span style={{ color: '#C8963E' }}>COR</span>
            </div>
            <div
              style={{
                fontSize: 19,
                letterSpacing: 11,
                color: 'rgba(255,255,255,0.55)',
                marginTop: 8,
                fontFamily: 'Jakarta',
              }}
            >
              PINTURAS
            </div>
          </div>
        </div>

        {/* Chamada principal */}
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 900 }}>
          <div style={{ fontSize: 78, color: '#FFFFFF', lineHeight: 1.02, letterSpacing: 1 }}>
            PINTURA DE ALTO PADRÃO
          </div>
          <div style={{ fontSize: 78, color: '#C8963E', lineHeight: 1.02, letterSpacing: 1 }}>
            EM CAMPO GRANDE MS
          </div>
          <div
            style={{
              fontSize: 28,
              color: 'rgba(255,255,255,0.75)',
              marginTop: 26,
              fontFamily: 'Jakarta',
              lineHeight: 1.4,
            }}
          >
            Residencial, comercial e predial. Equipe uniformizada, obra limpa e prazo cumprido.
          </div>
        </div>

        {/* Rodapé */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            borderTop: '1px solid rgba(255,255,255,0.15)',
            paddingTop: 26,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'linear-gradient(135deg, #D9A94C 0%, #C8963E 55%, #A87B2F 100%)',
              color: '#1B3A5C',
              fontSize: 25,
              letterSpacing: 1.5,
              padding: '14px 30px',
              borderRadius: 10,
            }}
          >
            ORÇAMENTO SEM COMPROMISSO
          </div>
          <div
            style={{
              fontSize: 24,
              color: 'rgba(255,255,255,0.6)',
              fontFamily: 'Jakarta',
            }}
          >
            {`nobrecor.com.br · ${BUSINESS.phoneFormatted}`}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fontes,
    }
  )
}
