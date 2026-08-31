import type {
  ChoiceOption,
  MatchPair,
  OrderItem,
  SituationOption,
  SituationQuestion,
  TeacherPortraitId,
  Text,
  TrueFalseQuestion,
} from './types'

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

export function act(
  portraitId: TeacherPortraitId,
  ru: string,
  en: string,
  factRu: string,
  factEn: string,
): SituationOption {
  return {
    id: portraitId,
    label: t(ru, en),
    portraitId,
    fact: t(factRu, factEn),
  }
}

export function situation(
  ru: string,
  en: string,
  options: readonly SituationOption[],
): SituationQuestion {
  return {
    kind: 'situation',
    prompt: t(ru, en),
    options,
  }
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
