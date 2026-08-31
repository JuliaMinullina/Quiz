import type { ChoiceOption, MapRegion, Text } from '../../content/types'
import { useLocale } from '../../lib/locale'
import { KioskButton } from '../KioskButton'
import { RussiaMap } from '../RussiaMap'
import { AnswerFact } from './AnswerFact'

type GridOption = Pick<ChoiceOption, 'id' | 'label'> & { correct?: boolean }

export function ChoiceGrid({
  options,
  fact,
  mapRegion,
  selectedId,
  revealed,
  onPick,
  revealSelected = false,
}: {
  options: readonly GridOption[]
  fact: Text
  mapRegion?: MapRegion
  selectedId: string | null
  revealed: boolean
  onPick: (id: string) => void
  revealSelected?: boolean
}) {
  const { tx } = useLocale()

  const answers = (
    <div className="answer-grid answer-grid--quad grid h-full min-h-0 w-full grid-cols-2 grid-rows-2 gap-[2.15vmin]">
      {options.map((opt) => {
        const selected = selectedId === opt.id
        const glow = revealed && (revealSelected ? selected : Boolean(opt.correct))
        const dim = !revealSelected && revealed && selected && !opt.correct
        return (
          <KioskButton
            key={opt.id}
            variant="choice"
            data-testid={`choice-${opt.id}`}
            disabled={revealed}
            aria-pressed={selected}
            onClick={() => onPick(opt.id)}
            className={`min-h-0 ${glow ? 'answer-card-on' : ''} ${dim ? 'answer-card-off' : ''} ${
              selected && !revealed ? 'answer-card-held' : ''
            }`}
          >
            <span className="answer-label">{tx(opt.label)}</span>
            {glow ? <AnswerFact className="min-h-0" text={tx(fact)} /> : null}
          </KioskButton>
        )
      })}
    </div>
  )

  if (mapRegion) {
    return (
      <div
        data-testid="choice-map"
        className={`choice-map ${revealed ? 'choice-map--revealed' : ''}`}
      >
        <div data-testid="choice-map-stage" className="choice-map__stage">
          <RussiaMap highlight={revealed ? mapRegion : undefined} />
        </div>
        {answers}
      </div>
    )
  }

  return answers
}
