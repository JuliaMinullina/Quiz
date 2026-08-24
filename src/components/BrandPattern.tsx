import { BRAND_ARTBOARD, MOSAIC_FILL, MOSAIC_GAP, mosaicSeamPath, mosaicTiles } from '../lib/brand'

const TILES = mosaicTiles()
const SEAMS = mosaicSeamPath()

export function BrandPattern() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox={`0 0 ${BRAND_ARTBOARD.w} ${BRAND_ARTBOARD.h}`}
      preserveAspectRatio="none"
      data-testid="brand-pattern"
      aria-hidden
    >
      <defs>
        <mask id="brand-mosaic-gaps" maskUnits="userSpaceOnUse">
          <rect width={BRAND_ARTBOARD.w} height={BRAND_ARTBOARD.h} fill="white" />
          <path
            d={SEAMS}
            fill="none"
            stroke="black"
            strokeWidth={MOSAIC_GAP}
            strokeLinecap="square"
          />
        </mask>
      </defs>
      <g mask="url(#brand-mosaic-gaps)">
        {TILES.map((tile, i) => (
          <polygon key={i} points={tile.points} fill={MOSAIC_FILL} />
        ))}
      </g>
    </svg>
  )
}
