import { t } from './copy'
import type { Mode, ModeId } from './types'

export const modes: readonly Mode[] = [
  {
    id: 'russia',
    kind: 'quiz',
    title: t('Викторина о России', 'Quiz about Russia'),
    blurb: t(
      'География, история, наука и люди. 5 вопросов.',
      'Geography, history, science and people. 5 questions.',
    ),
  },
  {
    id: 'neanderthal',
    kind: 'quiz',
    title: t('Мифы о неандертальцах', 'Myths about Neanderthals'),
    blurb: t('Правда или миф. 5 вопросов.', 'Truth or myth. 5 questions.'),
  },
  {
    id: 'teacher',
    kind: 'portrait',
    title: t('Какой вы педагог', 'What teacher are you'),
    blurb: t(
      'Пять ситуаций в классе. В конце — портрет.',
      'Five classroom situations. A portrait at the end.',
    ),
  },
  {
    id: 'cyber',
    kind: 'quiz',
    title: t('Кибербезопасность', 'Cybersecurity'),
    blurb: t(
      'Основы цифровой безопасности. 5 вопросов.',
      'The basics of digital safety. 5 questions.',
    ),
  },
]

export function modeById(id: ModeId) {
  const found = modes.find((mode) => mode.id === id)
  if (!found) throw new Error(`Unknown mode: ${id}`)
  return found
}
