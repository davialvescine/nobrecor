import Image from 'next/image'

/**
 * Fundo da hero: seis cenas em transição cruzada, alternando vídeo e foto.
 *
 * Server Component de propósito. A troca é 100% CSS (`.hero-slide`, no
 * globals.css), então não há estado, não há JS de terceiro e o crawler recebe a
 * primeira cena no HTML — mesmo motivo pelo qual o FAQ usa `<details>`.
 *
 * As cenas são geradas, para ambientar a marca. NÃO são obra da Nobre Cor: por
 * isso o bloco inteiro é `aria-hidden`, o `alt` é vazio e não existe legenda em
 * lugar nenhum (ver .claude/rules/conteudo.md).
 *
 * Decisões que não devem ser desfeitas sem motivo:
 *
 * - **Só dois vídeos, e a 720p.** Vídeo em `loop` decodifica o tempo todo, mesmo
 *   invisível. Dois é o teto para não torrar bateria de celular; a 720p, atrás
 *   de dois véus azuis, a diferença para 1080p não aparece e o arquivo cai
 *   para ~100 KB.
 * - **Sem `.webm`.** O VP9 saiu 3,6× maior que o H.264 nestas cenas escuras;
 *   mp4 sozinho cobre todos os navegadores que interessam.
 * - **`objectPosition` por cena.** No corte estreito do celular o pintor sai do
 *   quadro em três das seis. Ancorar no ponto de interesse o mantém visível.
 */

type Cena =
  | { tipo: 'video'; src: string; poster: string; posicao: string }
  | { tipo: 'foto'; src: string; posicao: string; estatica?: boolean }

const CENAS: Cena[] = [
  {
    tipo: 'video',
    src: '/videos/hero-01-fachada.mp4',
    poster: '/images/hero/01-fachada-poster.jpg',
    posicao: '62% center',
  },
  // `estatica` marca a única cena que sobra para quem pede menos movimento.
  // Precisa ser foto, nunca vídeo — ver o bloco prefers-reduced-motion.
  {
    tipo: 'foto',
    src: '/images/hero/02-fachada-dourada.jpg',
    posicao: '58% center',
    estatica: true,
  },
  { tipo: 'foto', src: '/images/hero/03-rolo-macro.jpg', posicao: 'center' },
  {
    tipo: 'video',
    src: '/videos/hero-04-anoitecer.mp4',
    poster: '/images/hero/04-anoitecer-poster.jpg',
    posicao: '55% center',
  },
  { tipo: 'foto', src: '/images/hero/04-sala-azul.jpg', posicao: '62% center' },
  { tipo: 'foto', src: '/images/hero/05-andaime.jpg', posicao: 'center' },
]

/** Segundos que cada cena fica no ar. O ciclo total é isto × CENAS.length. */
const DURACAO = 6

export default function HeroSlideshow() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      {CENAS.map((cena, i) => (
        <div
          key={cena.src}
          className={`hero-slide absolute inset-0 ${
            cena.tipo === 'foto' && cena.estatica ? 'hero-slide--estatico' : ''
          }`}
          style={{
            // O -0.9s deixa a primeira cena já opaca no instante 0: sem ele a
            // hero abre em azul chapado e só depois revela a imagem.
            animationDelay: `${i * DURACAO - 0.9}s`,
          }}
        >
          {cena.tipo === 'video' ? (
            <video
              className="h-full w-full object-cover"
              style={{ objectPosition: cena.posicao }}
              poster={cena.poster}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            >
              <source src={cena.src} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={cena.src}
              alt=""
              fill
              sizes="100vw"
              quality={72}
              style={{ objectFit: 'cover', objectPosition: cena.posicao }}
            />
          )}
        </div>
      ))}
    </div>
  )
}
