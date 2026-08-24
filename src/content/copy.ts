import type { ChoiceOption, MatchPair, OrderItem, Text, TrueFalseQuestion } from './types'

export function t(ru: string, en: string): Text {
  return { ru, en }
}

export function choice(
  id: string,
  ru: string,
  en: string,
  correct = false,
): ChoiceOption {
  return { id, label: t(ru, en), correct }
}

export function pair(id: string, left: Text, right: Text): MatchPair {
  return { id, left, right }
}

export function step(id: string, ru: string, en: string, order: number): OrderItem {
  return { id, label: t(ru, en), order }
}

export function truthMyth(
  ru: string,
  en: string,
  factRu: string,
  factEn: string,
  correctIsTrue: boolean,
): TrueFalseQuestion {
  return {
    kind: 'trueFalse',
    pair: 'truthMyth',
    prompt: t(ru, en),
    fact: t(factRu, factEn),
    correctIsTrue,
  }
}
