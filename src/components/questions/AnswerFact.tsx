export function AnswerFact({ text, className = '' }: { text: string; className?: string }) {
  return (
    <p className={`answer-fact ${className}`}>
      {text}
    </p>
  )
}
