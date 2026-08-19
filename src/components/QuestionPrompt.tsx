import { memo, type CSSProperties } from 'react'

export const QuestionPrompt = memo(function QuestionPrompt({
  text,
  className = '',
}: {
  text: string
  className?: string
}) {
  const parts = text.split(/(\s+)/)
  const letterCount = Array.from(text.replace(/\s/g, '')).length
  const span = Math.max(letterCount - 1, 1)
  let i = 0

  return (
    <h2
      className={`question-prompt font-display text-[3.2rem] font-semibold leading-[1.15] tracking-[-0.03em] text-pretty text-white ${className}`}
    >
      {parts.map((part, pi) => {
        if (/^\s+$/.test(part)) {
          return <span key={`s-${pi}`}> </span>
        }
        return (
          <span key={`w-${pi}`} className="question-word">
            {Array.from(part).map((ch) => {
              const n = i
              i += 1
              return (
                <span
                  key={n}
                  className="question-letter"
                  style={{ '--i-n': n / span } as CSSProperties}
                >
                  {ch}
                </span>
              )
            })}
          </span>
        )
      })}
    </h2>
  )
})
