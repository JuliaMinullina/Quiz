import { useEffect, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { modeById } from './content/modes'
import { quizSetById } from './content/quizSets'
import { ui } from './content/ui'
import type { BodyId, ModeId, QuizModeId } from './content/types'
import { BodyField, ModeOverlay } from './components/BodyField'
import { BrandMark } from './components/BrandMark'
import { BrandPattern } from './components/BrandPattern'
import { Grain } from './components/Grain'
import { Hud } from './components/Hud'
import { KioskButton } from './components/KioskButton'
import { Starfield } from './components/Starfield'
import { Aurora } from './components/Aurora'
import { LocaleProvider, useLocale } from './lib/locale'
import { drawBodyId, drawQuoteId, drawSetId } from './lib/session'
import { HomeCopy } from './screens/HomeCopy'
import { QuestionScreen } from './screens/QuestionScreen'
import { QuoteScreen } from './screens/QuoteScreen'
import { StubScreen } from './screens/StubScreen'

const ZOOM_MS = 3800 // planet approach, then first question or stub

type Phase =
  | { name: 'home' }
  | { name: 'zoom'; modeId: QuizModeId; bodyId: BodyId; setId: string }
  | { name: 'zoom'; modeId: 'teacher'; bodyId: BodyId }
  | { name: 'ask'; modeId: QuizModeId; bodyId: BodyId; setId: string; index: number }
  | { name: 'quote'; modeId: QuizModeId; quoteId: string }
  | { name: 'stub'; modeId: 'teacher'; bodyId: BodyId }

function isQuizMode(id: ModeId): id is QuizModeId {
  return id !== 'teacher'
}

function Kiosk() {
  const { tx } = useLocale()
  const [phase, setPhase] = useState<Phase>({ name: 'home' })

  const selectedId =
    phase.name === 'zoom' || phase.name === 'ask' || phase.name === 'stub' ? phase.bodyId : null

  const fieldMode =
    phase.name === 'home'
      ? 'constellation'
      : phase.name === 'zoom'
        ? 'zoom'
        : phase.name === 'ask' || phase.name === 'stub'
          ? 'ask'
          : 'hidden'

  const zoomMode = phase.name === 'zoom' ? modeById(phase.modeId) : null

  useEffect(() => {
    if (phase.name !== 'zoom') return
    const id = window.setTimeout(() => {
      if (phase.modeId === 'teacher') {
        setPhase({ name: 'stub', modeId: 'teacher', bodyId: phase.bodyId })
        return
      }
      setPhase({
        name: 'ask',
        modeId: phase.modeId,
        bodyId: phase.bodyId,
        setId: phase.setId,
        index: 0,
      })
    }, ZOOM_MS)
    return () => window.clearTimeout(id)
  }, [phase])

  function begin(modeId: ModeId) {
    const bodyId = drawBodyId()
    if (!isQuizMode(modeId)) {
      setPhase({ name: 'zoom', modeId, bodyId })
      return
    }
    setPhase({ name: 'zoom', modeId, bodyId, setId: drawSetId(modeId) })
  }

  function goHome() {
    setPhase({ name: 'home' })
  }

  function nextQuestion() {
    if (phase.name !== 'ask') return
    const questions = quizSetById(phase.modeId, phase.setId).questions
    if (phase.index >= questions.length - 1) {
      setPhase({ name: 'quote', modeId: phase.modeId, quoteId: drawQuoteId() })
      return
    }
    setPhase({
      name: 'ask',
      modeId: phase.modeId,
      bodyId: phase.bodyId,
      setId: phase.setId,
      index: phase.index + 1,
    })
  }

  const askSet = phase.name === 'ask' ? quizSetById(phase.modeId, phase.setId) : null
  const askQuestion = askSet?.questions[phase.name === 'ask' ? phase.index : 0]

  return (
    <div className="relative isolate h-full w-full overflow-hidden">
      <Starfield />
      <BrandPattern />
      {phase.name === 'quote' && <Aurora />}
      {phase.name !== 'quote' && <BodyField mode={fieldMode} selectedId={selectedId} />}
      {phase.name === 'home' && <HomeCopy onStart={begin} />}
      {phase.name === 'zoom' && (
        <div className="absolute right-[4.2vmin] top-[3.2vmin] z-[55]">
          <KioskButton data-testid="restart" variant="ghost" onClick={goHome}>
            {tx(ui.restart)}
          </KioskButton>
        </div>
      )}
      <AnimatePresence>
        {zoomMode && <ModeOverlay title={tx(zoomMode.title)} blurb={tx(zoomMode.blurb)} />}
      </AnimatePresence>
      {phase.name === 'ask' && askQuestion && (
        <QuestionScreen
          key={`${phase.modeId}-${phase.setId}-${phase.index}`}
          question={askQuestion}
          title={modeById(phase.modeId).title}
          onNext={nextQuestion}
          onRestart={goHome}
        />
      )}
      {phase.name === 'stub' && (
        <StubScreen title={tx(modeById('teacher').title)} onHome={goHome} />
      )}
      {phase.name === 'quote' && (
        <QuoteScreen quoteId={phase.quoteId} onAgain={() => begin(phase.modeId)} onRestart={goHome} />
      )}
      <BrandMark
        current={phase.name === 'ask' ? phase.index + 1 : undefined}
        total={askSet?.questions.length ?? 5}
      />
      <Hud />
      <Grain />
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
