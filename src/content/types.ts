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

export type ModeId = 'russia' | 'neanderthal' | 'teacher' | 'cyber'

export type QuizModeId = Exclude<ModeId, 'teacher'>

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

export type NeanderthalSetId = 'neo-finds' | 'neo-craft' | 'neo-genome' | 'neo-daily'

export type CyberSetId = 'cyber-passwords' | 'cyber-phishing' | 'cyber-device' | 'cyber-data'

export type TeacherSetId = 'teacher-lesson' | 'teacher-children' | 'teacher-class' | 'teacher-after'

export type TeacherPortraitId = 'task' | 'ethos' | 'personal' | 'community' | 'subject'

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

export type TrueFalsePair = 'trueFalse' | 'truthMyth'

export type TrueFalseQuestion = {
  kind: 'trueFalse'
  prompt: Text
  fact: Text
  correctIsTrue: boolean
  pair?: TrueFalsePair
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

export type SituationOption = {
  id: string
  label: Text
  portraitId: TeacherPortraitId
  fact: Text
}

export type SituationQuestion = {
  kind: 'situation'
  prompt: Text
  options: readonly SituationOption[]
}

export type Question =
  | ChoiceQuestion
  | TrueFalseQuestion
  | MatchQuestion
  | OrderQuestion

export type PlayQuestion = Question | SituationQuestion

export type TeacherSet = {
  id: TeacherSetId
  questions: readonly SituationQuestion[]
}

export type TeacherPortrait = {
  id: TeacherPortraitId
  name: Text
  text: Text
}

export type CelestialBody = {
  id: BodyId
  name: Text
  variant: BodyId
}

export type QuizSet = {
  id: string
  questions: readonly Question[]
}

export type Mission = QuizSet & {
  id: MissionId
  name: Text
  bodyId: BodyId
}

export type ModeKind = 'quiz' | 'portrait'

export type Mode = {
  id: ModeId
  kind: ModeKind
  title: Text
  blurb: Text
}

export type Quote = {
  id: QuoteId
  author: Text
  role: Text
  text: Text
  source?: Text
}
