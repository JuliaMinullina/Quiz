import type { MapRegion } from '../content/types'
import { useLocale } from '../lib/locale'

const labels: Record<MapRegion, { ru: string; en: string }> = {
  ural: { ru: 'Урал', en: 'Urals' },
  kamchatka: { ru: 'Камчатка', en: 'Kamchatka' },
  chelyuskin: { ru: 'мыс Челюскин', en: 'Cape Chelyuskin' },
}

export function RussiaMap({ highlight }: { highlight?: MapRegion }) {
  const { locale } = useLocale()
  const caption = highlight ? labels[highlight][locale] : ''

  return (
    <svg
      viewBox="50 12 590 268"
      preserveAspectRatio="xMidYMid meet"
      className="h-full w-full"
      role="img"
      aria-label={caption || (locale === 'ru' ? 'Карта' : 'Map')}
    >
      <path
        d={MAINLAND}
        fill="rgba(126,231,255,0.2)"
        stroke="rgba(220,236,255,0.82)"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d={KAMCHATKA}
        fill="rgba(126,231,255,0.2)"
        stroke="rgba(220,236,255,0.82)"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <ellipse
        cx="418"
        cy="188"
        rx="6"
        ry="15"
        transform="rotate(-30 418 188)"
        fill="rgba(8,24,48,0.45)"
        stroke="rgba(126,231,255,0.3)"
        strokeWidth="1"
      />
      {highlight === 'ural' && (
        <>
          <path
            d="M188 58 C 182 108, 180 158, 186 214"
            fill="none"
            stroke="#7ee7ff"
            strokeWidth="4.2"
            strokeLinecap="round"
          />
          <circle cx="183" cy="152" r="6.5" fill="#7ee7ff" />
        </>
      )}
      {highlight === 'kamchatka' && (
        <path
          d={KAMCHATKA}
          fill="rgba(126,231,255,0.42)"
          stroke="#7ee7ff"
          strokeWidth="2.6"
          strokeLinejoin="round"
        />
      )}
      {highlight === 'chelyuskin' && (
        <>
          <circle cx="336" cy="36" r="10" fill="none" stroke="#7ee7ff" strokeWidth="2.4" />
          <circle cx="336" cy="36" r="4.2" fill="#7ee7ff" />
        </>
      )}
      {caption && (
        <text
          x={highlight === 'ural' ? 204 : highlight === 'kamchatka' ? 508 : 352}
          y={highlight === 'ural' ? 148 : highlight === 'kamchatka' ? 272 : 24}
          fill="#e8f6ff"
          fontSize="22"
          fontFamily="inherit"
          letterSpacing="0.06em"
        >
          {caption}
        </text>
      )}
    </svg>
  )
}

const MAINLAND =
  'M72 148 L 78 108 108 86 138 78 132 112 128 128 L 158 96 198 82 238 70 278 54 318 42 336 34 358 48 392 56 438 52 492 58 538 70 578 88 608 108 622 128 612 146 578 136 548 148 528 168 498 198 458 214 418 208 388 198 358 214 318 210 278 192 238 206 198 198 168 214 148 188 118 198 96 176 82 160 72 148 Z'

const KAMCHATKA =
  'M548 148 L 568 142 586 158 592 188 598 226 586 252 568 258 554 228 548 188 548 148 Z'
