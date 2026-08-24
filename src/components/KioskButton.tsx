import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: 'solid' | 'ghost' | 'choice' | 'mode'
}

export function KioskButton({ children, variant = 'solid', className = '', ...props }: Props) {
  const base = 'kiosk-btn flex min-h-[64px] items-center justify-center leading-tight'
  const styles = {
    solid:
      'kiosk-facet min-h-[84px] min-w-[22rem] px-[4.2rem] font-display text-[2rem] font-semibold uppercase tracking-[0.18em] text-white',
    ghost:
      'kiosk-facet kiosk-facet-ghost min-h-[64px] px-[2.2rem] font-display text-[1.4rem] font-medium uppercase tracking-[0.12em] text-white/92',
    choice:
      'answer-card h-full w-full flex-col items-center justify-center gap-[0.85rem] rounded-[2.4vmin] px-[2.6vmin] py-[2vmin] text-center font-display font-extralight normal-case tracking-[-0.015em] text-white',
    mode: 'kiosk-facet kiosk-facet-compact min-h-[72px] w-full min-w-0 px-[1.8vmin] py-[1.1vmin] text-center font-display text-[1.35rem] font-semibold normal-case leading-[1.15] tracking-[0.02em] text-white',
  } as const

  const faceted = variant !== 'choice'

  return (
    <button type="button" className={`${base} ${styles[variant]} ${className}`} {...props}>
      {faceted ? (
        <>
          <span className="kiosk-facet__bloom" aria-hidden />
          <span className="kiosk-facet__face" aria-hidden />
          <span className="kiosk-facet__mark kiosk-facet__mark--ne" aria-hidden />
          <span className="kiosk-facet__mark kiosk-facet__mark--sw" aria-hidden />
          <span className="kiosk-facet__label">{children}</span>
        </>
      ) : (
        children
      )}
    </button>
  )
}
