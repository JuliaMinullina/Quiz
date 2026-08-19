import { useEffect, useState } from 'react'
import { bodyByMission } from './content/bodies'
import { missionById } from './content/missions'
import { BodyField } from './components/BodyField'
import { Grain } from './components/Grain'
import { Hud } from './components/Hud'
import { Starfield } from './components/Starfield'
import { Aurora } from './components/Aurora'
import { LocaleProvider } from './lib/locale'
import { bodyIdForMission, drawMissionId, drawQuoteId } from './lib/session'
import { HomeCopy } from './screens/HomeCopy'
import { QuestionScreen } from './screens/QuestionScreen'
import { QuoteScreen } from './screens/QuoteScreen'

const ZOOM_MS = 3800

type Phase =
  | { name: 'home' }
  | { name: 'zoom'; missionId: string }
  | { name: 'ask'; missionId: string; index: number }
  | { name: 'quote'; quoteId: string }

function Kiosk() {
  const [phase, setPhase] = useState<Phase>({ name: 'home' })

  const selectedId =
    phase.name === 'zoom' || phase.name === 'ask'
      ? bodyIdForMission(phase.missionId)
      : null

  const fieldMode =
    phase.name === 'home'
      ? 'constellation'
      : phase.name === 'zoom'
        ? 'zoom'
        : phase.name === 'ask'
          ? 'ask'
          : 'hidden'

  useEffect(() => {
    if (phase.name !== 'zoom') return
    const id = window.setTimeout(() => {
      setPhase({ name: 'ask', missionId: phase.missionId, index: 0 })
    }, ZOOM_MS)
    return () => window.clearTimeout(id)
  }, [phase])

  function begin() {
    const missionId = drawMissionId()
    setPhase({ name: 'zoom', missionId })
  }

  function goHome() {
    setPhase({ name: 'home' })
  }

  function nextQuestion() {
    if (phase.name !== 'ask') return
    if (phase.index >= 4) {
      setPhase({ name: 'quote', quoteId: drawQuoteId() })
      return
    }
    setPhase({ name: 'ask', missionId: phase.missionId, index: phase.index + 1 })
  }

  return (
    <div className="relative h-full w-full overflow-hidden">
      <Starfield />
      {phase.name === 'quote' && <Aurora />}
      {phase.name !== 'quote' && <BodyField mode={fieldMode} selectedId={selectedId} />}
      <Grain />
      {phase.name === 'home' && <HomeCopy onStart={begin} />}
      {phase.name === 'ask' && missionById(phase.missionId).questions[phase.index] && (
        <QuestionScreen
          key={`${phase.missionId}-${phase.index}`}
          question={missionById(phase.missionId).questions[phase.index]!}
          index={phase.index}
          bodyName={bodyByMission(phase.missionId).name}
          onNext={nextQuestion}
          onRestart={goHome}
        />
      )}
      {phase.name === 'quote' && (
        <QuoteScreen quoteId={phase.quoteId} onAgain={begin} onRestart={goHome} />
      )}
      <Hud />
    </div>
  )
}

export default function App() {
  return (
    <LocaleProvider>
      <Kiosk />
    </LocaleProvider>
  )
}
