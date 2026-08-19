import { useEffect, useRef } from 'react'

export function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const stars = Array.from({ length: 48 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 0.9 + 0.15,
      a: Math.random() * 0.28 + 0.08,
    }))

    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = window.innerWidth
      const h = window.innerHeight
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr
        canvas.height = h * dpr
        canvas.style.width = `${w}px`
        canvas.style.height = `${h}px`
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      }
      const g = ctx.createRadialGradient(w * 0.5, h * 0.38, 20, w * 0.5, h * 0.5, Math.max(w, h) * 0.78)
      g.addColorStop(0, '#2a5cb8')
      g.addColorStop(0.32, '#163a88')
      g.addColorStop(0.68, '#0c2460')
      g.addColorStop(1, '#071433')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, w, h)

      const arch = ctx.createRadialGradient(w * 0.5, h * -0.05, 10, w * 0.5, h * 0.2, w * 0.55)
      arch.addColorStop(0, 'rgba(90, 210, 255, 0.22)')
      arch.addColorStop(0.55, 'rgba(40, 120, 220, 0.08)')
      arch.addColorStop(1, 'transparent')
      ctx.fillStyle = arch
      ctx.fillRect(0, 0, w, h)

      for (const star of stars) {
        ctx.beginPath()
        ctx.fillStyle = `rgba(210, 236, 255, ${star.a})`
        ctx.arc(star.x * w, star.y * h, star.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }
    draw()
    const onResize = () => draw()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <canvas
      ref={ref}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    />
  )
}
