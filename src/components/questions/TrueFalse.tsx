import { ui } from '../../content/ui'
import { useLocale } from '../../lib/locale'
import { KioskButton } from '../KioskButton'
import type { Text } from '../../content/types'
import { AnswerFact } from './AnswerFact'

export function TrueFalse({
  fact,
  picked,
  revealed,
  correctIsTrue,
  onPick,
}: {
  fact: Text
  picked: boolean | null
  revealed: boolean
  correctIsTrue: boolean
  onPick: (value: boolean) => void
}) {
  const { tx } = useLocale()
  return (
    <div className="answer-grid answer-grid--pair grid h-full min-h-0 grid-cols-2 gap-[2.15vmin]">
      {[true, false].map((value) => {
        const selected = picked === value
        const isCorrect = value === correctIsTrue
        const glow = revealed && isCorrect
        const dim = revealed && selected && !isCorrect
        return (
          <KioskButton
            key={String(value)}
            variant="choice"
            data-testid={`tf-${value}`}
            disabled={revealed}
            onClick={() => onPick(value)}
            className={`min-h-0 ${glow ? 'answer-card-on' : ''} ${dim ? 'answer-card-off' : ''} ${
              selected && !revealed ? 'answer-card-held' : ''
            }`}
          >
            <span className="answer-label">{tx(value ? ui.true : ui.false)}</span>
            {revealed && isCorrect ? (
              <AnswerFact className="max-h-[48%] overflow-y-auto" text={tx(fact)} />
            ) : null}
          </KioskButton>
        )
      })}
    </div>
  )
}
