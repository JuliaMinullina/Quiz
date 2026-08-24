import type { BodyId } from '../content/types'

export type HomeSlot = {
  x: number
  y: number
  size: number
}

export type OrbitDef = {
  cx: number
  cy: number
  rx: number
  ry: number
  rot: number
}

/** 16:9 stage in height-units (height = 100). */
export const STAGE = { w: 1600 / 9, h: 100 } as const

/** Whole constellation vs the original artboard. */
export const FIELD_SCALE = 0.9

export const HERO = { x: STAGE.w / 2, y: STAGE.h / 2, viewX: 50, viewY: 50 } as const

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

export function stageToView(p: { x: number; y: number }) {
  return { x: (p.x / STAGE.w) * 100, y: (p.y / STAGE.h) * 100 }
}

function fmt(n: number) {
  return n.toFixed(3)
}

/** True elliptical arcs — polylines faceted the stroke and `Z` left a seam. */
export function ellipsePath(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  rotDeg: number,
  fromT = 0,
  toT = 1,
): string {
  const start = ellipsePoint(cx, cy, rx, ry, rotDeg, fromT)
  const span = toT - fromT
  if (Math.abs(Math.abs(span) - 1) < 1e-9) {
    const mid = ellipsePoint(cx, cy, rx, ry, rotDeg, fromT + 0.5 * Math.sign(span || 1))
    return `M ${fmt(start.x)} ${fmt(start.y)} A ${rx} ${ry} ${rotDeg} 1 1 ${fmt(mid.x)} ${fmt(mid.y)} A ${rx} ${ry} ${rotDeg} 1 1 ${fmt(start.x)} ${fmt(start.y)}`
  }
  const end = ellipsePoint(cx, cy, rx, ry, rotDeg, toT)
  const large: 0 | 1 = Math.abs(span) > 0.5 ? 1 : 0
  const sweep: 0 | 1 = span >= 0 ? 1 : 0
  return `M ${fmt(start.x)} ${fmt(start.y)} A ${rx} ${ry} ${rotDeg} ${large} ${sweep} ${fmt(end.x)} ${fmt(end.y)}`
}

/** Nested ellipses around the hero — a solar system, not a free-floating pair. */
export const ORBIT_A: OrbitDef = {
  cx: HERO.x,
  cy: HERO.y,
  rx: 76 * FIELD_SCALE,
  ry: 34 * FIELD_SCALE,
  rot: -16,
}
export const ORBIT_B: OrbitDef = {
  cx: HERO.x,
  cy: HERO.y,
  rx: 52 * FIELD_SCALE,
  ry: 30 * FIELD_SCALE,
  rot: 30,
}

export const ORBIT_PLACEMENTS: Record<Exclude<BodyId, 'kolybel'>, { orbit: OrbitDef; t: number; size: number }> =
  {
    kedra: { orbit: ORBIT_A, t: 0.08, size: 11 },
    alta: { orbit: ORBIT_A, t: 0.18, size: 7.5 },
    selena: { orbit: ORBIT_A, t: 0.32, size: 9 },
    mira: { orbit: ORBIT_A, t: 0.44, size: 10.5 },
    efir: { orbit: ORBIT_A, t: 0.58, size: 14 },
    par: { orbit: ORBIT_A, t: 0, size: 9.5 },
    oborot: { orbit: ORBIT_B, t: 0.28, size: 8 },
    polar: { orbit: ORBIT_B, t: 0.48, size: 12.5 },
    vual: { orbit: ORBIT_B, t: 0.9, size: 9 },
  }

function slot(orbit: OrbitDef, t: number, size: number): HomeSlot {
  return {
    ...stageToView(ellipsePoint(orbit.cx, orbit.cy, orbit.rx, orbit.ry, orbit.rot, t)),
    size: size * FIELD_SCALE,
  }
}

export const HOME_LAYOUT: Record<BodyId, HomeSlot> = {
  kolybel: { x: HERO.viewX, y: HERO.viewY, size: 44 * FIELD_SCALE },
  kedra: slot(ORBIT_A, ORBIT_PLACEMENTS.kedra.t, ORBIT_PLACEMENTS.kedra.size),
  alta: slot(ORBIT_A, ORBIT_PLACEMENTS.alta.t, ORBIT_PLACEMENTS.alta.size),
  selena: slot(ORBIT_A, ORBIT_PLACEMENTS.selena.t, ORBIT_PLACEMENTS.selena.size),
  mira: slot(ORBIT_A, ORBIT_PLACEMENTS.mira.t, ORBIT_PLACEMENTS.mira.size),
  efir: slot(ORBIT_A, ORBIT_PLACEMENTS.efir.t, ORBIT_PLACEMENTS.efir.size),
  par: slot(ORBIT_A, ORBIT_PLACEMENTS.par.t, ORBIT_PLACEMENTS.par.size),
  oborot: slot(ORBIT_B, ORBIT_PLACEMENTS.oborot.t, ORBIT_PLACEMENTS.oborot.size),
  polar: slot(ORBIT_B, ORBIT_PLACEMENTS.polar.t, ORBIT_PLACEMENTS.polar.size),
  vual: slot(ORBIT_B, ORBIT_PLACEMENTS.vual.t, ORBIT_PLACEMENTS.vual.size),
}
