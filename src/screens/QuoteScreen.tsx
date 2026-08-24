import { quoteById } from '../content/quotes'
import { ui } from '../content/ui'
import { useLocale } from '../lib/locale'
import { KioskButton } from '../components/KioskButton'

export function QuoteScreen({
  quoteId,
  onAgain,
  onRestart,
}: {
  quoteId: string
  onAgain: () => void
  onRestart: () => void
}) {
  const { tx } = useLocale()
  const quote = quoteById(quoteId)
  return (
    <div className="relative z-20 flex h-full flex-col items-center justify-center px-[10vmin] text-center">
      <blockquote className="max-w-[78rem] font-display text-[2.8rem] font-medium leading-[1.28] text-white">
        {tx(quote.text)}
      </blockquote>
      <p className="mt-[2.4vmin] text-[1.55rem] text-white/75">
        {tx(quote.author)}
        <span className="text-white/45"> · {tx(quote.role)}</span>
      </p>
      {quote.source && <p className="mt-[0.6vmin] text-[1.2rem] text-white/40">{tx(quote.source)}</p>}
      <div className="mt-[4vmin] flex flex-wrap items-center justify-center gap-[1.4rem]">
        <KioskButton data-testid="home" variant="ghost" onClick={onRestart}>
          {tx(ui.home)}
        </KioskButton>
        <KioskButton data-testid="again" onClick={onAgain}>
          {tx(ui.again)}
        </KioskButton>
      </div>
    </div>
  )
}
