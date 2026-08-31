import { t } from './copy'
import type { TeacherPortrait, TeacherPortraitId } from './types'

export const PORTRAIT_IDS = [
  'task',
  'ethos',
  'personal',
  'community',
  'subject',
] as const satisfies readonly TeacherPortraitId[]

export const portraits: readonly TeacherPortrait[] = [
  {
    id: 'task',
    name: t('Педагог задачи', 'A teacher of the task'),
    text: t(
      'Вы чаще оставляете ошибку на доске и даёте классу самим найти, где сбились.',
      'You more often leave the mistake on the board and let the class find where they went wrong.',
    ),
  },
  {
    id: 'ethos',
    name: t('Педагог уклада', 'A teacher of the ethos'),
    text: t(
      'Вы держите общее правило кабинета: сейчас слушаем, телефон в сумке, спор заканчиваем так-то. Урок для вас — ещё и порядок, в котором можно учиться.',
      'You keep the room’s shared rule: we listen now, phones in bags, a quarrel ends this way. A lesson, for you, is also the order in which it is possible to learn.',
    ),
  },
  {
    id: 'personal',
    name: t('Педагог персонализации', 'A teacher of personalization'),
    text: t(
      'Вы чаще останавливаетесь у одного ученика. Смотрите, что у него уже выходит, и даёте задачу чуть проще или чуть труднее.',
      'You more often stop beside one student. You look at what already works for them and give a task a little easier or a little harder.',
    ),
  },
  {
    id: 'community',
    name: t('Педагог общности', 'A teacher of community'),
    text: t(
      'Вы не решаете всё в одиночку у доски: сосед объясняет, мама смотрит тетрадь, коллега делит подготовку. Класс для вас — люди, которые работают вместе.',
      'You do not settle everything alone at the board: a neighbour explains, a mother looks at the notebook, a colleague shares the preparation. The class, for you, is people who work together.',
    ),
  },
  {
    id: 'subject',
    name: t('Педагог предмета', 'A teacher of the subject'),
    text: t(
      'Вы возвращаете вопрос к самой дисциплине: зачем треугольники, почему минус в ответе, что река делает с городом.',
      'You bring the question back to the discipline itself: why triangles, why the minus in the answer, what a river does to a city.',
    ),
  },
]

export function portraitById(id: TeacherPortraitId) {
  const found = portraits.find((portrait) => portrait.id === id)
  if (!found) throw new Error(`Unknown portrait: ${id}`)
  return found
}
