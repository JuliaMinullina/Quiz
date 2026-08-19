import { useEffect, useRef } from 'react'

export function Grain() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const tile = 256
    const off = document.createElement('canvas')
    off.width = tile
    off.height = tile
    const octx = off.getContext('2d', { alpha: true })
    if (!octx) return
    const img = octx.createImageData(tile, tile)
    for (let i = 0; i < img.data.length; i += 4) {
      const v = 128 + (Math.random() - 0.5) * 48
      img.data[i] = v
      img.data[i + 1] = v
      img.data[i + 2] = v
      img.data[i + 3] = 255
    }
    octx.putImageData(img, 0, 0)
    const pattern = ctx.createPattern(off, 'repeat')
    if (!pattern) return

    const paint = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.globalAlpha = 0.045
      ctx.fillStyle = pattern
      ctx.fillRect(0, 0, w, h)
    }
    paint()
    window.addEventListener('resize', paint)
    return () => window.removeEventListener('resize', paint)
  }, [])

  return (
    <canvas
      ref={ref}
      className="pointer-events-none absolute inset-0 z-[45] h-full w-full mix-blend-overlay"
      aria-hidden
    />
  )
}
