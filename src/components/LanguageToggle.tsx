import { useLocale } from '../lib/locale'

export function LanguageToggle() {
  const { locale, setLocale } = useLocale()
  return (
    <div className="inline-flex min-h-[64px] items-center gap-[0.2rem]" role="group" aria-label="Language">
      {(['ru', 'en'] as const).map((code, i) => {
        const on = locale === code
        return (
          <span key={code} className="flex items-center">
            {i === 1 && <span className="mx-[0.55rem] h-[1.1rem] w-px bg-white/25" />}
            <button
              type="button"
              data-testid={`lang-${code}`}
              className={`kiosk-btn min-h-[64px] min-w-[64px] px-[0.4rem] font-display text-[1.45rem] tracking-[0.22em] ${
                on ? 'text-white' : 'text-white/55'
              }`}
              aria-pressed={on}
              onClick={() => setLocale(code)}
            >
              {code.toUpperCase()}
            </button>
          </span>
        )
      })}
    </div>
  )
}
