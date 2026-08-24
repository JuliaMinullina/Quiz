import { useState } from 'react'
import type { Question, Text } from '../content/types'
import { ui } from '../content/ui'
import { useLocale } from '../lib/locale'
import { KioskButton } from '../components/KioskButton'
import { QuestionPrompt } from '../components/QuestionPrompt'
import { ChoiceGrid } from '../components/questions/ChoiceGrid'
import { MatchPairs } from '../components/questions/MatchPairs'
import { OrderQuestion } from '../components/questions/OrderQuestion'
import { TrueFalse } from '../components/questions/TrueFalse'

export function QuestionScreen({
  question,
  title,
  onNext,
  onRestart,
}: {
  question: Question
  title: Text
  onNext: () => void
  onRestart: () => void
}) {
  const { tx } = useLocale()
  const [revealed, setRevealed] = useState(false)
  const [choiceId, setChoiceId] = useState<string | null>(null)
  const [tf, setTf] = useState<boolean | null>(null)
  const [map, setMap] = useState<Record<string, string>>({})
  const [slots, setSlots] = useState<(string | null)[]>([null, null, null, null])

  function reveal() {
    setRevealed(true)
  }

  function onChoice(id: string) {
    if (revealed) return
    setChoiceId(id)
    reveal()
  }

  function onTf(value: boolean) {
    if (revealed) return
    setTf(value)
    reveal()
  }

  function onMatch(next: Record<string, string>) {
    setMap(next)
  }

  function onOrder(next: (string | null)[]) {
    setSlots(next)
  }

  const readyToLock =
    (question.kind === 'match' && Object.keys(map).length === 4) ||
    (question.kind === 'order' && slots.every(Boolean))

  const compact =
    question.kind === 'choice4' ||
    question.kind === 'odd' ||
    question.kind === 'who' ||
    question.kind === 'trueFalse'

  return (
    <div className="relative z-40 flex h-full flex-col px-[4.2vmin] pb-[3vmin] pt-[2.8vmin]">
      <header className="mb-[1.4vmin] flex min-h-[8.8vmin] shrink-0 items-center justify-between gap-[2rem]">
        <div className="flex items-center gap-[1.4rem]">
          <p className="font-display text-[1.7rem] font-medium tracking-[-0.02em] text-white">
            {tx(title)}
          </p>
        </div>
        <KioskButton data-testid="restart" variant="ghost" onClick={onRestart}>
          {tx(ui.restart)}
        </KioskButton>
      </header>
      <div
        data-testid="question-panel"
        className={`flex min-h-0 flex-1 flex-col ${compact ? 'justify-center' : ''}`}
      >
        <QuestionPrompt
          className="mx-auto mb-[2.6vmin] w-full shrink-0 text-center"
          text={tx(question.prompt)}
        />
        <div className={compact ? 'h-[min(56vmin,66%)] min-h-[32vmin] w-full shrink-0' : 'min-h-0 flex-1'}>
          {question.kind === 'choice4' || question.kind === 'odd' || question.kind === 'who' || question.kind === 'map' ? (
            <ChoiceGrid
              options={question.options}
              fact={question.fact}
              mapRegion={question.kind === 'map' ? question.mapRegion : undefined}
              selectedId={choiceId}
              revealed={revealed}
              onPick={onChoice}
            />
          ) : null}
          {question.kind === 'trueFalse' ? (
            <TrueFalse
              fact={question.fact}
              picked={tf}
              revealed={revealed}
              correctIsTrue={question.correctIsTrue}
              onPick={onTf}
              falseLabel={question.pair === 'truthMyth' ? ui.myth : ui.false}
            />
          ) : null}
          {question.kind === 'match' ? (
            <MatchPairs
              fact={question.fact}
              pairs={question.pairs}
              revealed={revealed}
              mapping={map}
              onChange={onMatch}
            />
          ) : null}
          {question.kind === 'order' ? (
            <OrderQuestion
              fact={question.fact}
              items={question.items}
              slots={slots}
              revealed={revealed}
              onChange={onOrder}
            />
          ) : null}
        </div>
      </div>
      <div className="mt-[1.5vmin] flex h-[84px] w-full shrink-0 items-stretch justify-end">
        {readyToLock && !revealed ? (
          <KioskButton data-testid="lock-in" onClick={reveal}>
            {tx(ui.done)}
          </KioskButton>
        ) : null}
        {revealed ? (
          <KioskButton data-testid="next" onClick={onNext}>
            {tx(ui.next)}
          </KioskButton>
        ) : null}
      </div>
    </div>
  )
}
