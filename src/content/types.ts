export type Locale = 'ru' | 'en'

export type Text = Record<Locale, string>

export type BodyId =
  | 'kedra'
  | 'alta'
  | 'kolybel'
  | 'selena'
  | 'efir'
  | 'mira'
  | 'par'
  | 'oborot'
  | 'polar'
  | 'vual'

export type MissionId =
  | 'poehali'
  | 'chaika'
  | 'kolybel-razuma'
  | 'lunnaya'
  | 'dvenadcat'
  | 'mir'
  | 'ekipazh'
  | 'polusharie'
  | 'siyanie'
  | 'sosedka'

export type QuoteId =
  | 'lomonosov'
  | 'tsiolkovsky'
  | 'gagarin'
  | 'mendeleev'
  | 'pushkin'
  | 'roerich'
  | 'pavlov'
  | 'vernadsky'
  | 'korolev'
  | 'paustovsky'

export type MapRegion = 'ural' | 'kamchatka' | 'chelyuskin'

export type ChoiceOption = {
  id: string
  label: Text
  correct: boolean
}

export type ChoiceQuestion = {
  kind: 'choice4' | 'odd' | 'who' | 'map'
  prompt: Text
  fact: Text
  options: readonly ChoiceOption[]
  mapRegion?: MapRegion
}

export type TrueFalseQuestion = {
  kind: 'trueFalse'
  prompt: Text
  fact: Text
  correctIsTrue: boolean
}

export type MatchPair = {
  id: string
  left: Text
  right: Text
}

export type MatchQuestion = {
  kind: 'match'
  prompt: Text
  fact: Text
  pairs: readonly MatchPair[]
}

export type OrderItem = {
  id: string
  label: Text
  order: number
}

export type OrderQuestion = {
  kind: 'order'
  prompt: Text
  fact: Text
  items: readonly OrderItem[]
}

export type Question =
  | ChoiceQuestion
  | TrueFalseQuestion
  | MatchQuestion
  | OrderQuestion

export type CelestialBody = {
  id: BodyId
  missionId: MissionId
  name: Text
  variant: BodyId
}

export type Mission = {
  id: MissionId
  name: Text
  bodyId: BodyId
  questions: readonly Question[]
}

export type Quote = {
  id: QuoteId
  author: Text
  role: Text
  text: Text
  source?: Text
}
