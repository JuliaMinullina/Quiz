import { modes } from '../content/modes'
import type { ModeId } from '../content/types'
import { useLocale } from '../lib/locale'
import { KioskButton } from '../components/KioskButton'
import { LanguageToggle } from '../components/LanguageToggle'

export function HomeCopy({ onStart }: { onStart: (modeId: ModeId) => void }) {
  const { tx } = useLocale()
  return (
    <>
      <div className="absolute left-[4.2vmin] top-[3.2vmin] z-40">
        <LanguageToggle />
      </div>
      <div className="pointer-events-auto absolute inset-x-0 bottom-0 z-30 px-[4.2vmin] pb-[5.4vmin]">
        <div className="grid grid-cols-4 gap-[2vmin]">
          {modes.map((mode) => (
            <KioskButton
              key={mode.id}
              variant="mode"
              data-testid={`mode-${mode.id}`}
              onClick={() => onStart(mode.id)}
            >
              {tx(mode.title)}
            </KioskButton>
          ))}
        </div>
      </div>
    </>
  )
}
