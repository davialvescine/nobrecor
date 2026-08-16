import {
  Gem,
  House,
  Building2,
  PaintRoller,
  PaintBucket,
  HousePlus,
  DoorOpen,
  TreePine,
  Grid2x2,
  Blocks,
  Layers,
  Sparkles,
  Palette,
  Store,
  Building,
  Factory,
  Ruler,
  Wrench,
  Layers2,
  Droplets,
  Warehouse,
  CalendarCheck,
  Brush,
  type LucideIcon,
} from 'lucide-react'

/**
 * Mapa nome -> componente do ícone.
 *
 * O catálogo em `src/content/servicos.ts` guarda só a STRING do ícone, para
 * continuar sendo dado puro (serializável, testável, sem importar React). A
 * tradução para componente acontece aqui, num único lugar.
 */
// Cuidado com apelidos do lucide: Home e House são o MESMO desenho. Manter só
// House no mapa — reintroduzir Home recria dois cards com ícone idêntico.
const ICONES: Record<string, LucideIcon> = {
  Gem,
  House,
  Building2,
  PaintRoller,
  PaintBucket,
  HousePlus,
  DoorOpen,
  TreePine,
  Grid2x2,
  Blocks,
  Layers,
  Sparkles,
  Palette,
  Store,
  Building,
  Factory,
  Ruler,
  Wrench,
  Layers2,
  Droplets,
  Warehouse,
  CalendarCheck,
}

interface IconeServicoProps {
  nome: string
  className?: string
}

/**
 * Ícone em traço fino, no estilo do site. `strokeWidth` baixo é proposital:
 * é o que dá a leitura "alto padrão" em vez de "ícone de app".
 */
export default function IconeServico({ nome, className = 'w-8 h-8' }: IconeServicoProps) {
  const Icone = ICONES[nome] ?? Brush
  return <Icone className={className} strokeWidth={1.25} aria-hidden="true" />
}
