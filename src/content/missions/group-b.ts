import { choice, pair, step, t } from '../copy'
import type { Mission } from '../types'

export const missionMir: Mission = {
  id: 'mir',
  name: t('Станция «Мир»', 'Station Mir'),
  bodyId: 'mira',
  questions: [
    {
      kind: 'map',
      mapRegion: 'chelyuskin',
      prompt: t(
        'Самая северная материковая точка Евразии — мыс…',
        'The northernmost mainland point of Eurasia is Cape…',
      ),
      fact: t(
        'Мыс Челюскин находится на полуострове Таймыр. Мыс Дежнёва — крайняя восточная точка материка. Мыс Флигели и мыс Желания — на островах, не на материке.',
        'Cape Chelyuskin is on the Taymyr Peninsula. Cape Dezhnev is the mainland’s easternmost point. Cape Fligely and Cape Zhelaniya are on islands, not on the mainland.',
      ),
      options: [
        choice('dezhnev', 'Дежнёва', 'Dezhnev'),
        choice('chelyuskin', 'Челюскин', 'Chelyuskin', true),
        choice('zhelaniya', 'Желания', 'Zhelaniya'),
        choice('fligely', 'Флигели', 'Fligely'),
      ],
    },
    {
      kind: 'choice4',
      prompt: t(
        'Шлюпы «Восток» и «Мирный» в экспедиции 1819–1821 годов вели Беллинсгаузен и Лазарев. Куда они ходили?',
        'The sloops Vostok and Mirny, in the 1819–1821 expedition, were led by Bellingshausen and Lazarev. Where did they sail?',
      ),
      fact: t(
        'В 1819–1821 годах шлюпы прошли вдоль антарктических льдов и описали берега Южного материка. Имена «Восток» и «Мирный» позже повторились в названиях космических кораблей и орбитальной станции.',
        'In 1819–1821 the sloops ran along the Antarctic ice and described the shores of the southern continent. The names Vostok and Mirny later returned on spacecraft and an orbital station.',
      ),
      options: [
        choice('north', 'к Северному полюсу', 'toward the North Pole'),
        choice('south', 'к южным полярным льдам, к берегам Антарктиды', 'toward the southern polar ice, to the shores of Antarctica', true),
        choice('africa', 'вокруг Африки в Индию', 'around Africa to India'),
        choice('kamchatka', 'только вдоль Камчатки', 'only along Kamchatka'),
      ],
    },
    {
      kind: 'choice4',
      prompt: t(
        'Иван Павлов всемирно известен опытами с собаками. Что он в них изучал?',
        'Ivan Pavlov is known worldwide for experiments with dogs. What was he studying?',
      ),
      fact: t(
        'Если кормить собаку после звонка, со временем слюна появляется уже на один звонок. Так Павлов показывал, как организм учится реагировать на сигнал. Нобелевскую премию 1904 года он получил за работы по пищеварению.',
        'If a dog is fed after a bell, saliva later appears at the bell alone. That is how Pavlov showed an organism learning to answer a signal. He received the 1904 Nobel Prize for work on digestion.',
      ),
      options: [
        choice('cell', 'строение клетки', 'the structure of the cell'),
        choice('reflex', 'условные рефлексы', 'conditioned reflexes', true),
        choice('soil', 'состав почвы', 'the composition of soil'),
        choice('planets', 'движение планет', 'the motion of planets'),
      ],
    },
    {
      kind: 'choice4',
      prompt: t(
        'Чем Байкал особенно поражает по сравнению с пятью Великими озёрами Северной Америки?',
        'What is especially striking about Baikal compared with North America’s five Great Lakes?',
      ),
      fact: t(
        'Объём байкальской воды — около 23,6 тысячи кубических километров. Озеру десятки миллионов лет; здесь живёт, например, байкальская нерпа.',
        'Baikal holds about 23,600 cubic kilometres of water. The lake is tens of millions of years old; the Baikal seal lives here, among other species.',
      ),
      options: [
        choice('warmer', 'он теплее', 'it is warmer'),
        choice('volume', 'в нём больше пресной воды, чем во всех пяти вместе', 'it holds more fresh water than all five together', true),
        choice('younger', 'он моложе их на миллион лет', 'it is a million years younger'),
        choice('empty', 'в нём нет жизни', 'there is no life in it'),
      ],
    },
    {
      kind: 'choice4',
      prompt: t(
        'Врач-космонавт Валерий Поляков на станции «Мир» провёл один полёт длиной около…',
        'Physician-cosmonaut Valeri Polyakov spent one flight on station Mir lasting about…',
      ),
      fact: t(
        'Это до сих пор рекорд самого длинного непрерывного полёта. Станция «Мир» работала на орбите с 1986 по 2001 год.',
        'It remains the record for the longest continuous flight. Station Mir was in orbit from 1986 to 2001.',
      ),
      options: [
        choice('2w', '2 недель', '2 weeks'),
        choice('3m', '3 месяцев', '3 months'),
        choice('437', '14,5 месяцев (437 суток)', '14.5 months (437 days)', true),
        choice('5y', '5 лет', '5 years'),
      ],
    },
  ],
}

export const missionEkipazh: Mission = {
  id: 'ekipazh',
  name: t('Звёздный экипаж', 'Star crew'),
  bodyId: 'par',
  questions: [
    {
      kind: 'choice4',
      prompt: t(
        'Крупнейшее пресное озеро Европы — это…',
        'Europe’s largest freshwater lake is…',
      ),
      fact: t(
        'Байкал глубже и многоводнее, но лежит в Азии. Каспий больше всех озёр по площади, однако вода в нём солёная. Среди пресных озёр Европы первое — Ладога.',
        'Baikal is deeper and more voluminous, but it lies in Asia. The Caspian is the largest lake by area, yet its water is saline. Among Europe’s freshwater lakes, Ladoga is first.',
      ),
      options: [
        choice('baikal', 'Байкал', 'Baikal'),
        choice('ladoga', 'Ладожское', 'Ladoga', true),
        choice('caspian', 'Каспийское море', 'the Caspian Sea'),
        choice('ilmen', 'Озеро Ильмень', 'Lake Ilmen'),
      ],
    },
    {
      kind: 'match',
      prompt: t('Соедини произведение и автора:', 'Match each work with its author:'),
      fact: t(
        '«Евгений Онегин» — роман в стихах, «Щелкунчик» — балет 1892 года. Чайковский родился в Воткинске.',
        'Eugene Onegin is a novel in verse; The Nutcracker is an 1892 ballet. Tchaikovsky was born in Votkinsk.',
      ),
      pairs: [
        pair('onegin', t('«Евгений Онегин»', 'Eugene Onegin'), t('Александр Пушкин', 'Alexander Pushkin')),
        pair('anna', t('«Анна Каренина»', 'Anna Karenina'), t('Лев Толстой', 'Leo Tolstoy')),
        pair('cherry', t('«Вишнёвый сад»', 'The Cherry Orchard'), t('Антон Чехов', 'Anton Chekhov')),
        pair('nutcracker', t('«Щелкунчик»', 'The Nutcracker'), t('Пётр Чайковский', 'Pyotr Tchaikovsky')),
      ],
    },
    {
      kind: 'trueFalse',
      prompt: t(
        '«Екатеринбург назван в честь Екатерины II Великой».',
        '“Yekaterinburg is named after Catherine II the Great.”',
      ),
      fact: t(
        'Город основали в 1723 году и назвали в честь Екатерины I, жены Петра I. Екатерина II взошла на престол в 1762 году.',
        'The city was founded in 1723 and named after Catherine I, the wife of Peter I. Catherine II came to the throne in 1762.',
      ),
      correctIsTrue: false,
    },
    {
      kind: 'choice4',
      prompt: t(
        'Кто раньше прошёл проливом между Азией и Америкой?',
        'Who first passed through the strait between Asia and America?',
      ),
      fact: t(
        'Семён Дежнёв обогнул Чукотку в 1648 году — за 80 лет до плавания Беринга. Позднее пролив назвали Беринговым.',
        'Semyon Dezhnev rounded Chukotka in 1648 — eighty years before Bering’s voyage. The strait was later named after Bering.',
      ),
      options: [
        choice('bering', 'Витус Беринг в XVIII веке', 'Vitus Bering in the eighteenth century'),
        choice('dezhnev', 'Семён Дежнёв в 1648 году', 'Semyon Dezhnev in 1648', true),
        choice('krusenstern', 'Иван Крузенштерн в XIX веке', 'Ivan Krusenstern in the nineteenth century'),
        choice('cook', 'Джеймс Кук в XVIII веке', 'James Cook in the eighteenth century'),
      ],
    },
    {
      kind: 'choice4',
      prompt: t(
        'Белка и Стрелка известны тем, что они…',
        'Belka and Strelka are known because they…',
      ),
      fact: t(
        'В августе 1960 года они облетели Землю на корабле «Спутник-5» и вернулись живыми. Щенок Стрелки по кличке Пушинка потом жил в семье президента Кеннеди.',
        'In August 1960 they orbited Earth on Sputnik-5 and returned alive. Strelka’s puppy Pushinka later lived with President Kennedy’s family.',
      ),
      options: [
        choice('first', 'первыми живыми существами оказались в космосе', 'were the first living beings in space'),
        choice('return', 'первыми животными, которые вернулись на Землю из орбитального полёта', 'were the first animals to return to Earth from an orbital flight', true),
        choice('moon', 'побывали на Луне', 'went to the Moon'),
        choice('gagarin', 'летали вместе с Гагариным', 'flew with Gagarin'),
      ],
    },
  ],
}

export const missionPolusharie: Mission = {
  id: 'polusharie',
  name: t('Невидимое полушарие', 'The unseen hemisphere'),
  bodyId: 'oborot',
  questions: [
    {
      kind: 'match',
      prompt: t(
        'Соедини реку и море, в которое она в итоге несёт воду:',
        'Match each river with the sea that finally receives its water:',
      ),
      fact: t(
        'Обь впадает в Обскую губу Карского моря, Лена — в море Лаптевых, Амур — в Амурский лиман Охотского моря, Нева — в Балтику у Санкт-Петербурга.',
        'The Ob empties into the Gulf of Ob on the Kara Sea; the Lena into the Laptev Sea; the Amur into the Amur Liman of the Sea of Okhotsk; the Neva into the Baltic at Saint Petersburg.',
      ),
      pairs: [
        pair('ob', t('Обь', 'the Ob'), t('Карское море', 'the Kara Sea')),
        pair('lena', t('Лена', 'the Lena'), t('море Лаптевых', 'the Laptev Sea')),
        pair('amur', t('Амур', 'the Amur'), t('Охотское море', 'the Sea of Okhotsk')),
        pair('neva', t('Нева', 'the Neva'), t('Балтийское море', 'the Baltic Sea')),
      ],
    },
    {
      kind: 'choice4',
      prompt: t('На каком озере стоит остров Кижи?', 'On which lake does the island of Kizhi stand?'),
      fact: t(
        'Кижи — остров на Онежском озере в Карелии. Там стоит Преображенская церковь XVIII века, собранная из сосны.',
        'Kizhi is an island on Lake Onega in Karelia. The eighteenth-century Church of the Transfiguration stands there, built of pine.',
      ),
      options: [
        choice('baikal', 'Байкал', 'Baikal'),
        choice('onega', 'Онежское', 'Onega', true),
        choice('balaton', 'Балатон', 'Balaton'),
        choice('teletskoye', 'Телецкое', 'Teletskoye'),
      ],
    },
    {
      kind: 'who',
      prompt: t(
        'Москвичка XIX века стала профессором математики в Стокгольме — одной из первых женщин-профессоров математики в Европе. Кто она?',
        'A nineteenth-century Muscovite became a professor of mathematics in Stockholm — one of Europe’s first women professors of mathematics. Who was she?',
      ),
      fact: t(
        'Софья Ковалевская занималась уравнениями в частных производных и вращением твёрдого тела. Екатерина Дашкова возглавляла Академию наук, но математиком не была.',
        'Sofya Kovalevskaya worked on partial differential equations and the rotation of a rigid body. Yekaterina Dashkova headed the Academy of Sciences, but she was not a mathematician.',
      ),
      options: [
        choice('tereshkova', 'Валентина Терешкова', 'Valentina Tereshkova'),
        choice('kovalevskaya', 'Софья Ковалевская', 'Sofya Kovalevskaya', true),
        choice('dashkova', 'Екатерина Дашкова', 'Yekaterina Dashkova'),
        choice('akhmatova', 'Анна Ахматова', 'Anna Akhmatova'),
      ],
    },
    {
      kind: 'choice4',
      prompt: t(
        'Принятая оценка возраста озера Байкал — около…',
        'The accepted estimate of Lake Baikal’s age is about…',
      ),
      fact: t(
        'Большинство озёр мелеет и зарастает за тысячи лет. Байкал лежит в рифтовой впадине: ему десятки миллионов лет, и котловина до сих пор медленно расширяется.',
        'Most lakes silt up and fill in over thousands of years. Baikal lies in a rift: it is tens of millions of years old, and the basin is still slowly widening.',
      ),
      options: [
        choice('10k', '10 тысяч лет', '10 thousand years'),
        choice('1m', '1 миллиона лет', '1 million years'),
        choice('25m', '25 миллионов лет', '25 million years', true),
        choice('500m', '500 миллионов лет', '500 million years'),
      ],
    },
    {
      kind: 'choice4',
      prompt: t(
        'Какой аппарат в 1959 году впервые сфотографировал обратную сторону Луны?',
        'Which craft first photographed the far side of the Moon in 1959?',
      ),
      fact: t(
        'С Земли обратная сторона Луны не видна: спутник всегда повёрнут к нам одним и тем же полушарием. В 1959 году «Луна-3» обошла её и передала первые снимки.',
        'The Moon’s far side cannot be seen from Earth: the satellite always faces us with the same hemisphere. In 1959 Luna-3 rounded it and sent back the first pictures.',
      ),
      options: [
        choice('sputnik', '«Спутник-1»', 'Sputnik-1'),
        choice('luna3', '«Луна-3»', 'Luna-3', true),
        choice('lunokhod', '«Луноход-1»', 'Lunokhod-1'),
        choice('vostok', '«Восток-1»', 'Vostok-1'),
      ],
    },
  ],
}

export const missionSiyanie: Mission = {
  id: 'siyanie',
  name: t('Северное сияние', 'Northern lights'),
  bodyId: 'polar',
  questions: [
    {
      kind: 'choice4',
      prompt: t(
        'На каком острове России дольше всего жили последние шерстистые мамонты?',
        'On which Russian island did the last woolly mammoths live longest?',
      ),
      fact: t(
        'На острове Врангеля мамонты жили ещё около четырёх тысяч лет назад — в то время, когда в Египте уже стояли пирамиды. Сейчас это заповедник и объект ЮНЕСКО.',
        'On Wrangel Island mammoths still lived about four thousand years ago — when the pyramids already stood in Egypt. It is now a nature reserve and a UNESCO site.',
      ),
      options: [
        choice('sakhalin', 'Сахалин', 'Sakhalin'),
        choice('valaam', 'Валаам', 'Valaam'),
        choice('wrangel', 'Врангеля', 'Wrangel', true),
        choice('kizhi', 'Кижи', 'Kizhi'),
      ],
    },
    {
      kind: 'choice4',
      prompt: t(
        'Белые ночи в Санкт-Петербурге бывают потому, что город…',
        'White nights in Saint Petersburg happen because the city…',
      ),
      fact: t(
        'Петербург лежит примерно на 60-й параллели. Летом Солнце опускается за горизонт неглубоко, и ночь остаётся светлой. Мурманск севернее: там бывает полярный день.',
        'Petersburg lies near the 60th parallel. In summer the Sun sinks only shallowly below the horizon, and the night stays light. Murmansk is farther north: polar day occurs there.',
      ),
      options: [
        choice('current', 'стоит у тёплого течения', 'stands by a warm current'),
        choice('lat', 'находится на высокой широте: летом Солнце почти не заходит', 'lies at a high latitude: in summer the Sun barely sets', true),
        choice('mirrors', 'окружён зеркалами каналов', 'is ringed by canal mirrors'),
        choice('pole', 'ближе к Северному полюсу, чем Мурманск', 'is closer to the North Pole than Murmansk'),
      ],
    },
    {
      kind: 'order',
      prompt: t('От раннего к позднему:', 'From earliest to latest:'),
      fact: t(
        'Университет открыли в 1755 году, работу Лобачевского опубликовали в Казани в 1829-м, таблицу Менделеев составил в 1869-м, Павлов получил Нобелевскую премию в 1904-м.',
        'The university opened in 1755; Lobachevsky’s work was published in Kazan in 1829; Mendeleev compiled his table in 1869; Pavlov received the Nobel Prize in 1904.',
      ),
      items: [
        step('msu', 'Московский университет (1755)', 'Moscow University (1755)', 1),
        step('lobachevsky', 'Геометрия Лобачевского (~1829, Казань)', 'Lobachevsky’s geometry (~1829, Kazan)', 2),
        step('table', 'Таблица Менделеева (1869)', 'Mendeleev’s table (1869)', 3),
        step('nobel', 'Нобелевская премия Ивана Павлова (1904)', 'Ivan Pavlov’s Nobel Prize (1904)', 4),
      ],
    },
    {
      kind: 'choice4',
      prompt: t(
        'Павел Третьяков собрал и передал Москве коллекцию, ставшую Третьяковской галереей. Что в ней было главным?',
        'Pavel Tretyakov gathered and gave Moscow a collection that became the Tretyakov Gallery. What was at its heart?',
      ),
      fact: t(
        'Более сорока лет Третьяков покупал картины русских художников и в 1892 году передал собрание Москве. Так появилась Третьяковская галерея.',
        'For more than forty years Tretyakov bought paintings by Russian artists and in 1892 gave the collection to Moscow. That is how the Tretyakov Gallery began.',
      ),
      options: [
        choice('antique', 'античные статуи', 'antique statues'),
        choice('painting', 'русская живопись', 'Russian painting', true),
        choice('stars', 'карты звёздного неба', 'star charts'),
        choice('crowns', 'императорские короны', 'imperial crowns'),
      ],
    },
    {
      kind: 'choice4',
      prompt: t(
        'Кто первым из женщин вышел в открытый космос?',
        'Who was the first woman to walk in open space?',
      ),
      fact: t(
        'Терешкова в 1963 году летела одна и из корабля не выходила. Светлана Савицкая вышла в открытый космос 25 июля 1984 года со станции «Салют-7».',
        'Tereshkova flew alone in 1963 and did not leave the ship. Svetlana Savitskaya walked in open space on 25 July 1984 from station Salyut-7.',
      ),
      options: [
        choice('tereshkova', 'Валентина Терешкова', 'Valentina Tereshkova'),
        choice('savitskaya', 'Светлана Савицкая', 'Svetlana Savitskaya', true),
        choice('ride', 'Салли Райд', 'Sally Ride'),
        choice('kondakova', 'Елена Кондакова', 'Yelena Kondakova'),
      ],
    },
  ],
}

export const missionSosedka: Mission = {
  id: 'sosedka',
  name: t('Соседняя планета', 'A neighbouring planet'),
  bodyId: 'vual',
  questions: [
    {
      kind: 'choice4',
      prompt: t(
        'Дикий амурский тигр в России в основном живёт в лесах…',
        'In Russia the wild Amur tiger lives mainly in the forests of…',
      ),
      fact: t(
        'Хребет Сихотэ-Алинь в Приморском крае — основная территория дикого амурского тигра в России. Там же живёт дальневосточный леопард.',
        'The Sikhote-Alin range in Primorye is the main range of the wild Amur tiger in Russia. The Far Eastern leopard lives there too.',
      ),
      options: [
        choice('caucasus', 'Кавказа', 'the Caucasus'),
        choice('sikhote', 'Сихотэ-Алиня', 'Sikhote-Alin', true),
        choice('kola', 'Кольского полуострова', 'the Kola Peninsula'),
        choice('moscow', 'Подмосковья', 'the Moscow region'),
      ],
    },
    {
      kind: 'who',
      prompt: t(
        'В XIX веке ректор Казанского университета описал геометрию, в которой через точку вне прямой можно провести несколько прямых, параллельных данной. Кто это?',
        'In the nineteenth century the rector of Kazan University described a geometry in which, through a point outside a line, more than one line parallel to the given line can be drawn. Who was he?',
      ),
      fact: t(
        'Лобачевский изложил эту систему в 1829 году. Её называют геометрией Лобачевского, или неевклидовой геометрией. Позже ею пользовались физики.',
        'Lobachevsky set out this system in 1829. It is called Lobachevsky geometry, or non-Euclidean geometry. Physicists later made use of it.',
      ),
      options: [
        choice('euclid', 'Евклид', 'Euclid'),
        choice('lobachevsky', 'Николай Лобачевский', 'Nikolai Lobachevsky', true),
        choice('mendeleev', 'Дмитрий Менделеев', 'Dmitri Mendeleev'),
        choice('korolev', 'Сергей Королёв', 'Sergei Korolev'),
      ],
    },
    {
      kind: 'match',
      prompt: t('Соедини место и регион:', 'Match each place with its region:'),
      fact: t(
        'Долина гейзеров — на Камчатке, Ленские столбы — на реке Лене в Якутии, Эльбрус — на Кавказе. Малахит, о котором писал Бажов, добывали на Урале.',
        'The Valley of Geysers is on Kamchatka; the Lena Pillars stand on the Lena in Yakutia; Elbrus is in the Caucasus. The malachite in Bazhov’s tales was mined in the Urals.',
      ),
      pairs: [
        pair('geysers', t('Долина гейзеров', 'Valley of Geysers'), t('Камчатка', 'Kamchatka')),
        pair('lena', t('Ленские столбы', 'Lena Pillars'), t('Якутия', 'Yakutia')),
        pair('elbrus', t('Эльбрус', 'Elbrus'), t('Кавказ', 'the Caucasus')),
        pair('malachite', t('Малахит в сказах Бажова', 'Malachite in Bazhov’s tales'), t('Урал', 'the Urals')),
      ],
    },
    {
      kind: 'odd',
      prompt: t('Что здесь не про Урал?', 'Which of these is not about the Urals?'),
      fact: t(
        'Хохломской росписью издавна занимались в заволжских сёлах, это Нижегородская область. Малахит, сказы Бажова и Невьянская башня — уральские.',
        'Khokhloma painting has long been practised in trans-Volga villages, in Nizhny Novgorod Region. Malachite, Bazhov’s tales and the Nevyansk Tower belong to the Urals.',
      ),
      options: [
        choice('malachite', 'малахит', 'malachite'),
        choice('bazhov', 'сказы Бажова', 'Bazhov’s tales'),
        choice('nevyansk', 'Невьянская башня', 'the Nevyansk Tower'),
        choice('khokhloma', 'хохлома', 'khokhloma', true),
      ],
    },
    {
      kind: 'choice4',
      prompt: t(
        'Аппарат «Венера-7» в 1970 году впервые в мире…',
        'In 1970 the craft Venera-7 was the first in the world to…',
      ),
      fact: t(
        'У поверхности Венеры давление в десятки раз выше земного, температура — около 460 °C. Станция успела передать сигнал с грунта. Обратную сторону Луны сняла «Луна-3».',
        'At Venus’s surface the pressure is dozens of times Earth’s, the temperature about 460 °C. The station managed to send a signal from the ground. Luna-3 photographed the Moon’s far side.',
      ),
      options: [
        choice('human', 'высадил человека на Венеру', 'land a person on Venus'),
        choice('surface', 'передал данные с поверхности другой планеты', 'transmit data from the surface of another planet', true),
        choice('mars', 'привёз грунт с Марса', 'bring soil from Mars'),
        choice('moon', 'сфотографировал обратную сторону Луны', 'photograph the far side of the Moon'),
      ],
    },
  ],
}
