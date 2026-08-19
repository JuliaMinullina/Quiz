import type { Text } from './types'

export const ui = {
  tagline: {
    ru: 'Пять вопросов о географии, истории, науке и людях России. Займёт 2–4 минуты.',
    en: 'Five questions about Russia’s geography, history, science and people. It takes 2–4 minutes.',
  },
  start: { ru: 'Начать', en: 'Start' },
  restart: { ru: 'Начать сначала', en: 'Start over' },
  next: { ru: 'Далее', en: 'Next' },
  again: { ru: 'Попробовать ещё раз', en: 'Try again' },
  true: { ru: 'Правда', en: 'True' },
  false: { ru: 'Неправда', en: 'False' },
  matchHint: {
    ru: 'Проведите линию слева направо. Линию можно убрать и провести заново.',
    en: 'Draw a line from left to right. You can remove a line and reconnect.',
  },
  orderHint: {
    ru: 'Переместите события в ячейки — от раннего к позднему. Карточку можно вернуть обратно.',
    en: 'Move the events into the cells, earliest to latest. You can put a card back.',
  },
  orderReturn: {
    ru: 'Перетащите карточку сюда, чтобы убрать её из ряда.',
    en: 'Drag a card here to take it out of the row.',
  },
  done: { ru: 'Готово', en: 'Done' },
  langRu: { ru: 'RU', en: 'RU' },
  langEn: { ru: 'EN', en: 'EN' },
} as const satisfies Record<string, Text>
