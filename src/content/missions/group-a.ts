import { choice, step, t } from '../copy'
import type { Mission } from '../types'

export const missionPoehali: Mission = {
  id: 'poehali',
  name: t('Поехали!', 'Let’s go!'),
  bodyId: 'kedra',
  questions: [
    {
      kind: 'map',
      mapRegion: 'ural',
      prompt: t(
        'Граница Европы и Азии в районе Екатеринбурга проходит по…',
        'Near Yekaterinburg, the Europe–Asia boundary runs along…',
      ),
      fact: t(
        'Условную границу двух частей света здесь ведут по Уралу. У стелы «Европа — Азия» можно стоять одной ногой в Европе, другой — в Азии.',
        'The conventional boundary of the two continents is drawn along the Urals. At the Europe–Asia stele you can stand with one foot in Europe and the other in Asia.',
      ),
      options: [
        choice('caucasus', 'Кавказскому хребту', 'the Caucasus range'),
        choice('ural', 'Уральским горам', 'the Ural Mountains', true),
        choice('volga', 'реке Волге', 'the Volga River'),
        choice('upland', 'Среднерусской возвышенности', 'the Central Russian Upland'),
      ],
    },
    {
      kind: 'choice4',
      prompt: t(
        'В каком году Пётр I основал Санкт-Петербург?',
        'In what year did Peter I found Saint Petersburg?',
      ),
      fact: t(
        'Город заложили в 1703 году на Заячьем острове, в устье Невы. 1147-й — год первого летописного упоминания Москвы.',
        'The city was founded in 1703 on Zayachy Island, at the mouth of the Neva. 1147 is the year of Moscow’s first chronicle mention.',
      ),
      options: [
        choice('1147', '1147', '1147'),
        choice('1703', '1703', '1703', true),
        choice('1812', '1812', '1812'),
        choice('1917', '1917', '1917'),
      ],
    },
    {
      kind: 'who',
      prompt: t(
        'Помогал открыть университет в Москве, писал труды по русскому языку и создавал мозаики из цветного стекла. Кто это?',
        'He helped open a university in Moscow, wrote on the Russian language, and made mosaics of coloured glass. Who was he?',
      ),
      fact: t(
        'Михаил Ломоносов — учёный-энциклопедист XVIII века. Московский университет открыли в 1755 году при его участии.',
        'Mikhail Lomonosov was an eighteenth-century polymath. Moscow University opened in 1755 with his involvement.',
      ),
      options: [
        choice('mendeleev', 'Дмитрий Менделеев', 'Dmitri Mendeleev'),
        choice('lomonosov', 'Михаил Ломоносов', 'Mikhail Lomonosov', true),
        choice('karamzin', 'Николай Карамзин', 'Nikolai Karamzin'),
        choice('krusenstern', 'Иван Крузенштерн', 'Ivan Krusenstern'),
      ],
    },
    {
      kind: 'choice4',
      prompt: t('Какая река вытекает из Байкала?', 'Which river flows out of Lake Baikal?'),
      fact: t(
        'В Байкал впадают сотни рек, а вытекает одна — Ангара. Дальше она впадает в Енисей. Селенга, наоборот, несёт воду в озеро.',
        'Hundreds of rivers flow into Baikal, but only one flows out — the Angara. It then joins the Yenisei. The Selenga, by contrast, carries water into the lake.',
      ),
      options: [
        choice('selenga', 'Селенга', 'the Selenga'),
        choice('lena', 'Лена', 'the Lena'),
        choice('angara', 'Ангара', 'the Angara', true),
        choice('yenisei', 'Енисей', 'the Yenisei'),
      ],
    },
    {
      kind: 'choice4',
      prompt: t(
        'Какой позывной был у Юрия Гагарина в полёте 12 апреля 1961 года?',
        'What call sign did Yuri Gagarin use on 12 April 1961?',
      ),
      fact: t(
        'Корабль назывался «Восток-1», позывной Гагарина — «Кедр». Он сделал один виток вокруг Земли. «Чайка» — позывной Валентины Терешковой.',
        'The ship was Vostok-1; Gagarin’s call sign was Kedr. He completed one orbit of Earth. Chaika was Valentina Tereshkova’s call sign.',
      ),
      options: [
        choice('chaika', 'Чайка', 'Chaika'),
        choice('vostok', 'Восток', 'Vostok'),
        choice('kedr', 'Кедр', 'Kedr', true),
        choice('almaz', 'Алмаз', 'Almaz'),
      ],
    },
  ],
}

export const missionChaika: Mission = {
  id: 'chaika',
  name: t('Чайка', 'Chaika'),
  bodyId: 'alta',
  questions: [
    {
      kind: 'choice4',
      prompt: t(
        'Куда впадает Волга — самая длинная река Европы?',
        'Where does the Volga — Europe’s longest river — empty?',
      ),
      fact: t(
        'Волга заканчивается в Каспии — крупнейшем замкнутом водоёме планеты. До Мирового океана её вода не доходит.',
        'The Volga ends in the Caspian, the planet’s largest enclosed body of water. Its water never reaches the world ocean.',
      ),
      options: [
        choice('black', 'в Чёрное море', 'the Black Sea'),
        choice('baltic', 'в Балтийское море', 'the Baltic Sea'),
        choice('caspian', 'в Каспийское море', 'the Caspian Sea', true),
        choice('white', 'в Белое море', 'the White Sea'),
      ],
    },
    {
      kind: 'match',
      prompt: t('Соедини город и устойчивое прозвище:', 'Match each city with its lasting nickname:'),
      fact: t(
        'У Петербурга — каналы и острова Невы, у Москвы — холмы, у Екатеринбурга — Уральский рубеж двух частей света, у Сочи — черноморское побережье.',
        'Petersburg has the Neva’s canals and islands; Moscow has its hills; Yekaterinburg sits on the Ural divide of two continents; Sochi faces the Black Sea.',
      ),
      pairs: [
        {
          id: 'spb',
          left: t('Санкт-Петербург', 'Saint Petersburg'),
          right: t('«северная Венеция»', '“Venice of the North”'),
        },
        {
          id: 'msk',
          left: t('Москва', 'Moscow'),
          right: t('город на семи холмах', 'a city of seven hills'),
        },
        {
          id: 'ekb',
          left: t('Екатеринбург', 'Yekaterinburg'),
          right: t('город на границе Европы и Азии', 'a city on the Europe–Asia boundary'),
        },
        {
          id: 'sochi',
          left: t('Сочи', 'Sochi'),
          right: t('«летняя столица» у тёплого моря', 'a “summer capital” by a warm sea'),
        },
      ],
    },
    {
      kind: 'choice4',
      prompt: t(
        'Эрмитаж в Петербурге начинался как личная коллекция…',
        'The Hermitage in Petersburg began as the private collection of…',
      ),
      fact: t(
        'В 1764 году Екатерина II купила большое собрание картин — так начался будущий Эрмитаж. Павел Третьяков собирал другую коллекцию, в Москве.',
        'In 1764 Catherine II bought a large group of paintings — the future Hermitage began there. Pavel Tretyakov built a different collection, in Moscow.',
      ),
      options: [
        choice('peter', 'Петра I', 'Peter I'),
        choice('catherine', 'Екатерины II', 'Catherine II', true),
        choice('pushkin', 'Александра Пушкина', 'Alexander Pushkin'),
        choice('tretyakov', 'Павла Третьякова', 'Pavel Tretyakov'),
      ],
    },
    {
      kind: 'odd',
      prompt: t('Что здесь лишнее?', 'Which one does not belong?'),
      fact: t(
        'Байкал, Ладога и Онега — озёра. Волга — река.',
        'Baikal, Ladoga and Onega are lakes. The Volga is a river.',
      ),
      options: [
        choice('baikal', 'Байкал', 'Lake Baikal'),
        choice('ladoga', 'Ладожское озеро', 'Lake Ladoga'),
        choice('onega', 'Онежское озеро', 'Lake Onega'),
        choice('volga', 'Волга', 'the Volga', true),
      ],
    },
    {
      kind: 'choice4',
      prompt: t(
        'Валентина Терешкова (позывной «Чайка») до сих пор единственная в мире женщина, которая…',
        'Valentina Tereshkova (call sign Chaika) is still the only woman in the world who…',
      ),
      fact: t(
        '16–19 июня 1963 года она летела на «Востоке-6» одна. Все женщины после неё летали уже в экипажах. В открытый космос первой из женщин вышла Светлана Савицкая.',
        'On 16–19 June 1963 she flew Vostok-6 alone. Every woman after her flew in a crew. The first woman to walk in open space was Svetlana Savitskaya.',
      ),
      options: [
        choice('eva', 'вышла в открытый космос', 'walked in open space'),
        choice('solo', 'совершила космический полёт в одиночку', 'flew a space mission alone', true),
        choice('moon', 'побывала на Луне', 'went to the Moon'),
        choice('iss', 'командовала Международной космической станцией', 'commanded the International Space Station'),
      ],
    },
  ],
}

export const missionKolybel: Mission = {
  id: 'kolybel-razuma',
  name: t('Колыбель разума', 'Cradle of reason'),
  bodyId: 'kolybel',
  questions: [
    {
      kind: 'choice4',
      prompt: t('Сколько часовых поясов сейчас в России?', 'How many time zones does Russia have now?'),
      fact: t(
        'Поясов 11: от Калининграда до Камчатки. Когда в Москве утро, на Камчатке уже вечер.',
        'There are 11, from Kaliningrad to Kamchatka. When it is morning in Moscow, it is already evening on Kamchatka.',
      ),
      options: [
        choice('7', '7', '7'),
        choice('9', '9', '9'),
        choice('11', '11', '11', true),
        choice('24', '24', '24'),
      ],
    },
    {
      kind: 'choice4',
      prompt: t(
        'Что необычного сделал Дмитрий Менделеев в таблице 1869 года?',
        'What unusual step did Dmitri Mendeleev take in his 1869 table?',
      ),
      fact: t(
        'Пустые места он оставил сознательно и описал свойства будущих элементов. Позже там оказались галлий, скандий и германий.',
        'He left the gaps on purpose and described the properties of elements yet to be found. Gallium, scandium and germanium later filled them.',
      ),
      options: [
        choice('alpha', 'расположил элементы по алфавиту', 'arranged the elements alphabetically'),
        choice('gaps', 'оставил пустые клетки для ещё не открытых элементов', 'left empty cells for elements not yet discovered', true),
        choice('metals', 'включил только металлы', 'included only metals'),
        choice('eternal', 'подписал таблицу как «вечную и неизменную»', 'labelled the table “eternal and unchanging”'),
      ],
    },
    {
      kind: 'trueFalse',
      prompt: t(
        '«Байкал — самое большое озеро Земли по площади».',
        '“Baikal is Earth’s largest lake by area.”',
      ),
      fact: t(
        'По площади больше Каспий (его часто называют морем, но это озеро). Байкал — самое глубокое озеро планеты: 1642 метра. В нём около 20% озёрной пресной воды мира.',
        'The Caspian is larger by area (often called a sea, yet it is a lake). Baikal is the planet’s deepest lake: 1,642 metres. It holds about 20% of the world’s lake fresh water.',
      ),
      correctIsTrue: false,
    },
    {
      kind: 'who',
      prompt: t(
        'Этот академик писал о живой оболочке планеты и о том, что разум человека становится геологической силой. Его слова — «биосфера» и «ноосфера».',
        'This academician wrote of the planet’s living envelope and of human reason becoming a geological force. His words are “biosphere” and “noosphere”.',
      ),
      fact: t(
        'Владимир Вернадский описал биосферу как оболочку Земли, которую создаёт жизнь. Ноосферой он называл следующий этап: когда мысль человека становится силой планетарного масштаба.',
        'Vladimir Vernadsky described the biosphere as Earth’s envelope shaped by life. He called the next stage the noosphere: when human thought becomes a planetary force.',
      ),
      options: [
        choice('pavlov', 'Иван Павлов', 'Ivan Pavlov'),
        choice('vernadsky', 'Владимир Вернадский', 'Vladimir Vernadsky', true),
        choice('tsiolkovsky', 'Константин Циолковский', 'Konstantin Tsiolkovsky'),
        choice('dokuchaev', 'Василий Докучаев', 'Vasily Dokuchaev'),
      ],
    },
    {
      kind: 'choice4',
      prompt: t(
        'Константин Циолковский, живший в Калуге, назвал Землю «колыбелью разума». Чем он закончил эту мысль?',
        'Konstantin Tsiolkovsky, who lived in Kaluga, called Earth “the cradle of reason.” How did he finish the thought?',
      ),
      fact: t(
        'Калужский учитель вывел формулу ракеты и подробно описал, как человек может уйти за атмосферу. Рядом с его домом сейчас Музей космонавтики.',
        'The Kaluga schoolteacher derived the rocket equation and described in detail how a human being might leave the atmosphere. The Museum of Cosmonautics now stands beside his house.',
      ),
      options: [
        choice('stay', '«и лучше из неё не вылезать»', '“and it is better not to climb out of it”'),
        choice('cradle', '«но нельзя вечно жить в колыбели»', '“but one cannot live in the cradle forever”', true),
        choice('needless', '«поэтому космос человеку не нужен»', '“therefore space is of no use to humankind”'),
        choice('moon', '«колыбель должна быть только на Луне»', '“the cradle should be only on the Moon”'),
      ],
    },
  ],
}

export const missionLunnaya: Mission = {
  id: 'lunnaya',
  name: t('Лунная дорожка', 'Moon path'),
  bodyId: 'selena',
  questions: [
    {
      kind: 'map',
      mapRegion: 'kamchatka',
      prompt: t(
        'Долина гейзеров — один из крупнейших гейзерных районов мира. Где она?',
        'The Valley of Geysers is one of the world’s largest geyser fields. Where is it?',
      ),
      fact: t(
        'На Камчатке десятки вулканов и горячих источников. Долину гейзеров в 1941 году описала гидрогеолог Татьяна Устинова.',
        'Kamchatka has dozens of volcanoes and hot springs. Hydrogeologist Tatyana Ustinova described the Valley of Geysers in 1941.',
      ),
      options: [
        choice('baikal', 'на Байкале', 'at Baikal'),
        choice('altai', 'на Алтае', 'in the Altai'),
        choice('kamchatka', 'на Камчатке', 'on Kamchatka', true),
        choice('karelia', 'в Карелии', 'in Karelia'),
      ],
    },
    {
      kind: 'choice4',
      prompt: t(
        'Протяжённость Транссибирской магистрали от Москвы до Владивостока — около…',
        'The Trans-Siberian Railway from Moscow to Vladivostok is about…',
      ),
      fact: t(
        'Это самая длинная железная дорога на планете: около 9288 км. Строить её начали в 1891 году.',
        'It is the longest railway on the planet: about 9,288 km. Construction began in 1891.',
      ),
      options: [
        choice('1800', '1800 км', '1,800 km'),
        choice('4500', '4500 км', '4,500 km'),
        choice('9300', '9300 км', '9,300 km', true),
        choice('20000', '20 000 км', '20,000 km'),
      ],
    },
    {
      kind: 'order',
      prompt: t(
        'Расставь события от раннего к позднему:',
        'Put these events in order from earliest to latest:',
      ),
      fact: t(
        'Екатеринбург основали в 1723 году как завод-крепость на Исети — через 20 лет после Петербурга.',
        'Yekaterinburg was founded in 1723 as a factory-fortress on the Iset — twenty years after Petersburg.',
      ),
      items: [
        step('spb', 'Основание Санкт-Петербурга', 'Founding of Saint Petersburg', 1),
        step('ekb', 'Основание Екатеринбурга', 'Founding of Yekaterinburg', 2),
        step('msu', 'Открытие Московского университета', 'Opening of Moscow University', 3),
        step('transsib', 'Начало строительства Транссиба', 'Start of Trans-Siberian construction', 4),
      ],
    },
    {
      kind: 'choice4',
      prompt: t(
        'Кто возглавил первое российское кругосветное плавание (1803–1806, корабли «Надежда» и «Нева»)?',
        'Who led the first Russian circumnavigation (1803–1806, the ships Nadezhda and Neva)?',
      ),
      fact: t(
        'Иван Крузенштерн и Юрий Лисянский обошли земной шар и уточнили карту Тихого океана. Беринг ходил от Камчатки к Америке, но кругосветного плавания не совершал.',
        'Ivan Krusenstern and Yuri Lisyansky sailed around the globe and refined the map of the Pacific. Bering sailed from Kamchatka toward America, but he did not circumnavigate the Earth.',
      ),
      options: [
        choice('bering', 'Витус Беринг', 'Vitus Bering'),
        choice('krusenstern', 'Иван Крузенштерн', 'Ivan Krusenstern', true),
        choice('dezhnev', 'Семён Дежнёв', 'Semyon Dezhnev'),
        choice('przhevalsky', 'Николай Пржевальский', 'Nikolai Przhevalsky'),
      ],
    },
    {
      kind: 'choice4',
      prompt: t(
        'В 1970 году на Луну доставили «Луноход-1». Что в этом было впервые в мире?',
        'In 1970 Lunokhod-1 was delivered to the Moon. What was a world first in that?',
      ),
      fact: t(
        '«Луноход-1» сел в Море Дождей 17 ноября 1970 года и ехал по командам с Земли. Снимки обратной стороны Луны сделала «Луна-3» в 1959 году. Лунный грунт на Землю раньше привезла станция «Луна-16».',
        'Lunokhod-1 landed in the Sea of Rains on 17 November 1970 and drove on commands from Earth. Luna-3 photographed the Moon’s far side in 1959. Luna-16 had already brought lunar soil to Earth.',
      ),
      options: [
        choice('human', 'первый человек на Луне', 'the first person on the Moon'),
        choice('rover', 'первый дистанционный планетоход на другом небесном теле', 'the first remote planetary rover on another celestial body', true),
        choice('farside', 'первая фотография обратной стороны Луны', 'the first photograph of the Moon’s far side'),
        choice('soil', 'первая доставка лунного грунта на Землю', 'the first delivery of lunar soil to Earth'),
      ],
    },
  ],
}

export const missionDvenadcat: Mission = {
  id: 'dvenadcat',
  name: t('Двенадцать минут', 'Twelve minutes'),
  bodyId: 'efir',
  questions: [
    {
      kind: 'choice4',
      prompt: t('Какая вершина — высочайшая в России?', 'Which peak is the highest in Russia?'),
      fact: t(
        'Высота Эльбруса — около 5642 метров, это потухший вулкан. Народная — высшая точка Урала, Ключевская Сопка — один из высочайших действующих вулканов Евразии, но ниже Эльбруса.',
        'Elbrus stands about 5,642 metres; it is a dormant volcano. Narodnaya is the Urals’ high point; Klyuchevskaya Sopka is among Eurasia’s tallest active volcanoes, yet lower than Elbrus.',
      ),
      options: [
        choice('narodnaya', 'Народная (Урал)', 'Narodnaya (Urals)'),
        choice('belukha', 'Белуха (Алтай)', 'Belukha (Altai)'),
        choice('klyuchevskaya', 'Ключевская Сопка (Камчатка)', 'Klyuchevskaya Sopka (Kamchatka)'),
        choice('elbrus', 'Эльбрус (Кавказ)', 'Elbrus (Caucasus)', true),
      ],
    },
    {
      kind: 'trueFalse',
      prompt: t(
        '«Большие фонтаны Петергофа задумал Пётр I так, чтобы они били за счёт перепада высот, без насосов».',
        '“Peter I designed Peterhof’s great fountains to play from a drop in height, without pumps.”',
      ),
      fact: t(
        'Вода к Большому каскаду идёт из верхних прудов самотёком. Насосной станции для этого не требовалось. Систему заложили при Петре I.',
        'Water reaches the Grand Cascade from the upper ponds by gravity. A pumping station was not required. The system was laid out under Peter I.',
      ),
      correctIsTrue: true,
    },
    {
      kind: 'choice4',
      prompt: t(
        'Русский путешественник XIX века жил среди папуасов Новой Гвинеи и доказывал, что все народы равны. Кто это?',
        'A nineteenth-century Russian traveller lived among the Papuans of New Guinea and argued that all peoples are equal. Who was he?',
      ),
      fact: t(
        'Николай Миклухо-Маклай подолгу жил на берегу Новой Гвинеи, вёл дневники и отстаивал, что человечество едино по природе.',
        'Nikolai Miklouho-Maclay lived for long stretches on the New Guinea coast, kept journals, and held that humankind is one by nature.',
      ),
      options: [
        choice('przhevalsky', 'Николай Пржевальский', 'Nikolai Przhevalsky'),
        choice('maclay', 'Николай Миклухо-Маклай', 'Nikolai Miklouho-Maclay', true),
        choice('krusenstern', 'Иван Крузенштерн', 'Ivan Krusenstern'),
        choice('semenov', 'Пётр Семёнов-Тян-Шанский', 'Pyotr Semyonov-Tyan-Shansky'),
      ],
    },
    {
      kind: 'odd',
      prompt: t('Какой город не стоит на Волге?', 'Which city does not stand on the Volga?'),
      fact: t(
        'Новосибирск стоит на Оби. Казань, Нижний Новгород и Волгоград — на Волге.',
        'Novosibirsk stands on the Ob. Kazan, Nizhny Novgorod and Volgograd stand on the Volga.',
      ),
      options: [
        choice('kazan', 'Казань', 'Kazan'),
        choice('nn', 'Нижний Новгород', 'Nizhny Novgorod'),
        choice('nsk', 'Новосибирск', 'Novosibirsk', true),
        choice('volgograd', 'Волгоград', 'Volgograd'),
      ],
    },
    {
      kind: 'trueFalse',
      prompt: t(
        '«Алексей Леонов в 1965 году первым вышел в открытый космос — и едва вернулся внутрь, потому что скафандр раздулся».',
        '“In 1965 Alexei Leonov was the first to walk in open space — and barely got back inside because his suit ballooned.”',
      ),
      fact: t(
        'В вакууме костюм вспух, и Леонов стравил давление, чтобы пролезть в шлюз. Выход длился около 12 минут. Он же первым рисовал в космосе.',
        'In vacuum the suit swelled; Leonov bled off pressure to squeeze into the airlock. The spacewalk lasted about twelve minutes. He was also the first to draw in space.',
      ),
      correctIsTrue: true,
    },
  ],
}
