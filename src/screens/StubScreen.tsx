import { ui } from '../content/ui'
import { useLocale } from '../lib/locale'
import { KioskButton } from '../components/KioskButton'

export function StubScreen({
  title,
  onHome,
}: {
  title: string
  onHome: () => void
}) {
  const { tx } = useLocale()
  return (
    <div
      data-testid="stub"
      className="relative z-40 flex h-full flex-col items-center justify-center px-[10vmin] text-center"
    >
      <p className="font-display text-[2.8rem] font-medium leading-[1.2] tracking-[-0.02em] text-white">
        {title}
      </p>
      <p className="mt-[1.8vmin] max-w-[42rem] text-[1.55rem] text-white/70">{tx(ui.teacherStub)}</p>
      <div className="mt-[4vmin]">
        <KioskButton data-testid="home" onClick={onHome}>
          {tx(ui.home)}
        </KioskButton>
      </div>
    </div>
  )
}
