import { ui } from '../content/ui'
import { useLocale } from '../lib/locale'
import { KioskButton } from '../components/KioskButton'
import { LanguageToggle } from '../components/LanguageToggle'

export function HomeCopy({ onStart }: { onStart: () => void }) {
  const { tx, locale } = useLocale()
  const [lead, rest] = splitTagline(tx(ui.tagline), locale)
  return (
    <>
      <div className="absolute left-[4.2vmin] top-[3.2vmin] z-40">
        <LanguageToggle />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-between px-[5.2vmin] pb-[5.6vmin]">
        <p className="max-w-[54rem] font-display text-[2.15rem] font-medium leading-[1.2] tracking-[-0.02em] text-white">
          {lead}
          {rest && (
            <span className="mt-[0.5rem] block text-[1.55rem] font-normal tracking-[0.01em] text-white/70">
              {rest}
            </span>
          )}
        </p>
        <div className="pointer-events-auto">
          <KioskButton data-testid="start" onClick={onStart}>
            {tx(ui.start)}
          </KioskButton>
        </div>
      </div>
    </>
  )
}

function splitTagline(text: string, locale: 'ru' | 'en'): [string, string] {
  if (locale === 'ru') {
    const i = text.indexOf('Займёт')
    if (i > 0) return [text.slice(0, i).trim(), text.slice(i)]
  }
  const i = text.indexOf('It takes')
  if (i > 0) return [text.slice(0, i).trim(), text.slice(i)]
  return [text, '']
}
