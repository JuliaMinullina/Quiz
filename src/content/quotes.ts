import type { Quote } from './types'

export const quotes: readonly Quote[] = [
  {
    id: 'lomonosov',
    author: { ru: 'Михаил Ломоносов', en: 'Mikhail Lomonosov' },
    role: { ru: 'учёный', en: 'scientist' },
    text: {
      ru: 'Может собственных Платонов и быстрых разумом Невтонов российская земля рождать.',
      en: 'The Russian land can bring forth its own Platos and quick-minded Newtons.',
    },
    source: { ru: 'Ода 1747 года', en: 'Ode of 1747' },
  },
  {
    id: 'tsiolkovsky',
    author: { ru: 'Константин Циолковский', en: 'Konstantin Tsiolkovsky' },
    role: { ru: 'учёный', en: 'scientist' },
    text: {
      ru: 'Планета есть колыбель разума, но нельзя вечно жить в колыбели.',
      en: 'A planet is the cradle of reason, but one cannot live in the cradle forever.',
    },
    source: {
      ru: '«Исследование мировых пространств реактивными приборами», 1911–1912',
      en: 'Exploration of Outer Space by Means of Reaction Devices, 1911–1912',
    },
  },
  {
    id: 'gagarin',
    author: { ru: 'Юрий Гагарин', en: 'Yuri Gagarin' },
    role: { ru: 'космонавт', en: 'cosmonaut' },
    text: {
      ru: 'Облетев Землю в корабле-спутнике, я увидел, как прекрасна наша планета.',
      en: 'Having flown around the Earth in a satellite ship, I saw how beautiful our planet is.',
    },
  },
  {
    id: 'mendeleev',
    author: { ru: 'Дмитрий Менделеев', en: 'Dmitri Mendeleev' },
    role: { ru: 'учёный', en: 'scientist' },
    text: {
      ru: 'Стараясь познать бесконечное, наука сама конца не имеет.',
      en: 'In striving to know the infinite, science itself has no end.',
    },
    source: {
      ru: 'предисловие к 8-му изданию «Основ химии», 1906',
      en: 'Preface to the 8th edition of The Principles of Chemistry, 1906',
    },
  },
  {
    id: 'pushkin',
    author: { ru: 'Александр Пушкин', en: 'Alexander Pushkin' },
    role: { ru: 'писатель', en: 'writer' },
    text: {
      ru: 'Москва… как много в этом звуке / Для сердца русского слилось! / Как много в нём отозвалось!',
      en: 'Moscow… how much in that sound / Has fused for the Russian heart! / How much has echoed in it!',
    },
    source: { ru: '«Евгений Онегин»', en: 'Eugene Onegin' },
  },
  {
    id: 'roerich',
    author: { ru: 'Николай Рерих', en: 'Nicholas Roerich' },
    role: { ru: 'художник', en: 'artist' },
    text: {
      ru: 'Культура есть почитание Света. Культура есть любовь к человеку.',
      en: 'Culture is the veneration of Light. Culture is love for the human being.',
    },
    source: {
      ru: 'статья «Культура — почитание Света»',
      en: 'essay “Culture is the Veneration of Light”',
    },
  },
  {
    id: 'pavlov',
    author: { ru: 'Иван Павлов', en: 'Ivan Pavlov' },
    role: { ru: 'учёный', en: 'scientist' },
    text: {
      ru: 'Как ни совершенно крыло птицы, оно никогда не смогло бы поднять её ввысь, не опираясь на воздух. Факты — это воздух учёного.',
      en: 'However perfect a bird’s wing, it could never lift the bird aloft without the air. Facts are the scientist’s air.',
    },
    source: { ru: '«Письмо к молодёжи»', en: 'Letter to the Youth' },
  },
  {
    id: 'vernadsky',
    author: { ru: 'Владимир Вернадский', en: 'Vladimir Vernadsky' },
    role: { ru: 'учёный', en: 'scientist' },
    text: {
      ru: 'Человек может и должен перестраивать своим трудом и мыслью область своей жизни. Перед ним открываются всё более широкие творческие возможности.',
      en: 'A human being can and must reshape the realm of their life by labor and thought. Ever wider creative possibilities open before them.',
    },
    source: {
      ru: '«Несколько слов о ноосфере»',
      en: 'Some Words about the Noosphere',
    },
  },
  {
    id: 'korolev',
    author: { ru: 'Сергей Королёв', en: 'Sergei Korolev' },
    role: { ru: 'конструктор', en: 'chief designer' },
    text: {
      ru: 'Мы бы не двинулись вперёд, если бы не решались на смелые шаги в неизвестное.',
      en: 'We would not have moved forward if we had not dared bold steps into the unknown.',
    },
  },
  {
    id: 'paustovsky',
    author: { ru: 'Константин Паустовский', en: 'Konstantin Paustovsky' },
    role: { ru: 'писатель', en: 'writer' },
    text: {
      ru: 'Природа учит нас понимать прекрасное. Любовь к родной стране невозможна без любви к её природе.',
      en: 'Nature teaches us to understand beauty. Love for one’s native country is impossible without love for its nature.',
    },
  },
] as const

export const QUOTE_IDS = quotes.map((q) => q.id)

export function quoteById(id: string) {
  const found = quotes.find((q) => q.id === id)
  if (!found) throw new Error(`Unknown quote: ${id}`)
  return found
}
