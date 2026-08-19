import type { HomeSlot } from './layout'
import { HERO } from './layout'

/** Intrinsic CSS size; visual size comes from scale so layout never jumps. */
export const BODY_RENDER_VMIN = 44
export const BODY_ZOOM_VMIN = 54

export type FieldMode = 'constellation' | 'zoom' | 'ask' | 'hidden'

export type BodyPose = {
  x: number
  y: number
  scale: number
  opacity: number
}

export function bodyPose(
  mode: FieldMode,
  slot: HomeSlot,
  isSelected: boolean,
  selectedId: string | null,
): BodyPose {
  const homeScale = slot.size / BODY_RENDER_VMIN
  const zoomScale = BODY_ZOOM_VMIN / BODY_RENDER_VMIN
  const leaving =
    (mode === 'zoom' || mode === 'ask' || mode === 'hidden') && Boolean(selectedId) && !isSelected
  const zooming = mode === 'zoom' && isSelected
  const fadingOut = (mode === 'ask' || mode === 'hidden') && isSelected

  if (zooming) {
    return { x: HERO.viewX - slot.x, y: HERO.viewY - slot.y, scale: zoomScale, opacity: 1 }
  }
  if (fadingOut) {
    return { x: HERO.viewX - slot.x, y: HERO.viewY - slot.y, scale: zoomScale, opacity: 0 }
  }
  if (leaving) {
    return {
      x: (slot.x - HERO.viewX) * 0.7,
      y: (slot.y - HERO.viewY) * 0.7,
      scale: homeScale * 0.72,
      opacity: 0,
    }
  }
  return { x: 0, y: 0, scale: homeScale, opacity: 1 }
}

/** Percent of the 16:9 orbit stage. Centering lives on the outer wrapper, not here. */
export function bodyTransform({ x, y, scale }: Pick<BodyPose, 'x' | 'y' | 'scale'>) {
  return `translate3d(${x}cqw, ${y}cqh, 0) scale(${scale})`
}
