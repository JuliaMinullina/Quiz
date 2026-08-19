import { useEffect, useRef } from 'react'
import { paintFilmGrain } from '../lib/grain'

export function Grain() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    const paint = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.fillStyle = '#808080'
      ctx.fillRect(0, 0, w, h)
      paintFilmGrain(ctx, w, h, 1)
    }
    paint()
    window.addEventListener('resize', paint)
    return () => window.removeEventListener('resize', paint)
  }, [])

  return (
    <canvas
      ref={ref}
      className="pointer-events-none absolute inset-0 z-[100] h-full w-full mix-blend-overlay opacity-40"
      data-testid="film-grain"
      aria-hidden
    />
  )
}
