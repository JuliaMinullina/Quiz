export function paintFilmGrain(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  alpha: number,
  composite: GlobalCompositeOperation = 'source-over',
) {
  const tile = 256
  const off = document.createElement('canvas')
  off.width = tile
  off.height = tile
  const octx = off.getContext('2d', { alpha: true })
  if (!octx) return
  const img = octx.createImageData(tile, tile)
  for (let i = 0; i < img.data.length; i += 4) {
    const v = 128 + (Math.random() - 0.5) * 96
    img.data[i] = v
    img.data[i + 1] = v
    img.data[i + 2] = v
    img.data[i + 3] = 255
  }
  octx.putImageData(img, 0, 0)
  const pattern = ctx.createPattern(off, 'repeat')
  if (!pattern) return
  ctx.save()
  ctx.globalAlpha = alpha
  ctx.globalCompositeOperation = composite
  ctx.fillStyle = pattern
  ctx.fillRect(0, 0, w, h)
  ctx.restore()
}
