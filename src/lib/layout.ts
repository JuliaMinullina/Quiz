import type { BodyId } from '../content/types'

export type HomeSlot = {
  x: number
  y: number
  size: number
}

export function ellipsePoint(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  rotDeg: number,
  t: number,
): { x: number; y: number } {
  const a = t * Math.PI * 2
  const x0 = rx * Math.cos(a)
  const y0 = ry * Math.sin(a)
  const rot = (rotDeg * Math.PI) / 180
  return {
    x: cx + x0 * Math.cos(rot) - y0 * Math.sin(rot),
    y: cy + x0 * Math.sin(rot) + y0 * Math.cos(rot),
  }
}

export const ORBIT_A = { cx: 50, cy: 44, rx: 41, ry: 31, rot: -19 }
export const ORBIT_B = { cx: 50, cy: 46, rx: 33, ry: 15, rot: 31 }

export const HOME_LAYOUT: Record<BodyId, HomeSlot> = {
  kolybel: { x: 50, y: 40, size: 44 },
  kedra: { ...ellipsePoint(ORBIT_A.cx, ORBIT_A.cy, ORBIT_A.rx, ORBIT_A.ry, ORBIT_A.rot, 0.06), size: 11 },
  alta: { ...ellipsePoint(ORBIT_A.cx, ORBIT_A.cy, ORBIT_A.rx, ORBIT_A.ry, ORBIT_A.rot, 0.2), size: 7.5 },
  selena: { ...ellipsePoint(ORBIT_A.cx, ORBIT_A.cy, ORBIT_A.rx, ORBIT_A.ry, ORBIT_A.rot, 0.34), size: 9 },
  efir: { ...ellipsePoint(ORBIT_A.cx, ORBIT_A.cy, ORBIT_A.rx, ORBIT_A.ry, ORBIT_A.rot, 0.58), size: 14 },
  mira: { ...ellipsePoint(ORBIT_A.cx, ORBIT_A.cy, ORBIT_A.rx, ORBIT_A.ry, ORBIT_A.rot, 0.74), size: 10.5 },
  par: { ...ellipsePoint(ORBIT_A.cx, ORBIT_A.cy, ORBIT_A.rx, ORBIT_A.ry, ORBIT_A.rot, 0.9), size: 9.5 },
  oborot: { ...ellipsePoint(ORBIT_B.cx, ORBIT_B.cy, ORBIT_B.rx, ORBIT_B.ry, ORBIT_B.rot, 0.12), size: 8 },
  polar: { ...ellipsePoint(ORBIT_B.cx, ORBIT_B.cy, ORBIT_B.rx, ORBIT_B.ry, ORBIT_B.rot, 0.48), size: 12.5 },
  vual: { ...ellipsePoint(ORBIT_B.cx, ORBIT_B.cy, ORBIT_B.rx, ORBIT_B.ry, ORBIT_B.rot, 0.78), size: 9 },
}
