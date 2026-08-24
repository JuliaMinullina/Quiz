import { AnimatePresence, motion } from 'motion/react'
import { bodies } from '../content/bodies'
import { BODY_RENDER_VMIN, bodyPose, bodyTransform, type FieldMode } from '../lib/bodyMotion'
import { HOME_LAYOUT } from '../lib/layout'
import { CelestialBody } from './CelestialBody'
import { OrbitTracks } from './OrbitTracks'

const EASE_TRAVEL = [0.4, 0, 0.2, 1] as const
const ZOOM_S = 2.7
const FADE_S = 0.4

export function BodyField({
  mode,
  selectedId,
}: {
  mode: FieldMode
  selectedId: string | null
}) {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] grid place-items-center overflow-visible">
      <div
        data-testid="orbit-stage"
        className="relative overflow-visible"
        style={{
          width: 'min(100vw, calc(100vh * 16 / 9))',
          height: 'min(100vh, calc(100vw * 9 / 16))',
          containerType: 'size',
        }}
      >
        <AnimatePresence>
          {mode === 'constellation' && (
            <motion.div
              key="tracks"
              className="absolute inset-0"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: ZOOM_S, ease: EASE_TRAVEL } }}
            >
              <OrbitTracks showSatellite />
            </motion.div>
          )}
        </AnimatePresence>
        {bodies.map((body) => {
        const slot = HOME_LAYOUT[body.id]
        const isSel = body.id === selectedId
        const pose = bodyPose(mode, slot, isSel, selectedId)
        const zooming = mode === 'zoom' && isSel
        const asking = mode === 'ask' && isSel
        const leaving = (mode === 'zoom' || mode === 'ask') && selectedId && !isSel
        const homeScale = slot.size / BODY_RENDER_VMIN

        return (
          <div
            key={body.id}
            className="absolute isolate overflow-visible"
            style={{
              left: `${slot.x}%`,
              top: `${slot.y}%`,
              width: `${BODY_RENDER_VMIN}cqh`,
              height: `${BODY_RENDER_VMIN}cqh`,
              transform: 'translate(-50%, -50%)',
              zIndex: zooming ? 8 : body.id === 'kolybel' ? 2 : 4,
            }}
          >
          <motion.div
            layout={false}
            data-testid={`body-${body.id}`}
            data-body-state={zooming ? 'zoom' : asking ? 'ask' : leaving ? 'leave' : 'idle'}
            className="h-full w-full overflow-visible"
            style={{
              willChange: zooming ? 'transform, opacity' : 'auto',
              transformOrigin: '50% 50%',
              backfaceVisibility: 'hidden',
            }}
            initial={{ transform: bodyTransform({ x: 0, y: 0, scale: homeScale }), opacity: 1 }}
            animate={{
              transform: bodyTransform(pose),
              opacity: pose.opacity,
            }}
            transition={
              asking
                ? {
                    transform: { duration: 0 },
                    opacity: { duration: FADE_S, ease: EASE_TRAVEL },
                  }
                : zooming || leaving
                  ? { duration: ZOOM_S, ease: EASE_TRAVEL }
                  : { duration: 0.9, ease: EASE_TRAVEL }
            }
          >
            <CelestialBody variant={body.variant} className="h-full w-full" />
          </motion.div>
          </div>
        )
      })}
      </div>
    </div>
  )
}

export function ModeOverlay({ title, blurb }: { title: string; blurb: string }) {
  return (
    <motion.div
      data-testid="mode-overlay"
      className="pointer-events-none absolute inset-x-0 bottom-[5.2vmin] z-[90] px-[8vmin] text-center"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8, transition: { duration: FADE_S, ease: EASE_TRAVEL } }}
      transition={{ delay: 0.25, duration: 0.85, ease: EASE_TRAVEL }}
    >
      <p className="font-display text-[2.6rem] font-medium leading-[1.15] tracking-[-0.02em] text-white [text-shadow:0_2px_28px_rgba(2,8,22,0.85)]">
        {title}
      </p>
      <p className="mt-[0.7rem] text-[1.45rem] leading-[1.3] text-white/80 [text-shadow:0_2px_20px_rgba(2,8,22,0.8)]">
        {blurb}
      </p>
    </motion.div>
  )
}
