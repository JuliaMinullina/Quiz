import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: 'solid' | 'ghost' | 'choice'
}

export function KioskButton({ children, variant = 'solid', className = '', ...props }: Props) {
  const base = 'kiosk-btn flex min-h-[64px] items-center justify-center leading-tight'
  const styles = {
    solid:
      'min-h-[84px] min-w-[22rem] rounded-[0.35rem] border border-white bg-white px-[4.2rem] font-display text-[2rem] font-semibold uppercase tracking-[0.18em] text-navy shadow-[0_0_56px_rgba(126,231,255,0.7),0_0_18px_rgba(255,255,255,0.45)]',
    ghost:
      'rounded-[0.35rem] border border-white/30 bg-transparent px-[2.2rem] font-display text-[1.4rem] font-medium uppercase tracking-[0.12em] text-white/90',
    choice:
      'answer-card h-full w-full flex-col items-center justify-center gap-[0.85rem] rounded-[2.4vmin] px-[2.6vmin] py-[2vmin] text-center font-display font-extralight normal-case tracking-[-0.015em] text-white',
  } as const

  return (
    <button type="button" className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
