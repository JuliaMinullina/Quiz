import { truthMyth } from '../copy'
import type { QuizSet } from '../types'

export const neanderthalSets: readonly QuizSet[] = [
  {
    id: 'neo-finds',
    questions: [
      truthMyth(
        '«Самые первые останки неандертальца нашли в 1829 году в пещере Анжи в Бельгии».',
        '“The earliest Neanderthal remains were found in 1829 in Engis Cave in Belgium.”',
        'Это был череп ребёнка 2–3 лет. Неандертальца в этой находке узнали лишь в 1936 году. Вид описали по скелету из грота Фельдгофер в долине Неандерталь.',
        'It was the skull of a child aged two or three. The find was recognised as Neanderthal only in 1936. The species was described from the skeleton in Feldhofer Cave in the Neander Valley.',
        true,
      ),
      truthMyth(
        '«Сейчас у учёных останки около 600 индивидов неандертальцев».',
        '“Researchers now have remains of about 600 Neanderthal individuals.”',
        'К началу XX века антропологам были известны кости уже более десятка неандертальцев — в том числе из пещеры Анжи в Бельгии, грота Фельдгофер в Германии, Шипки в Чехии и Крапины в Хорватии.',
        'By the early twentieth century anthropologists already knew bones from more than a dozen Neanderthals — including Engis Cave in Belgium, Feldhofer Cave in Germany, Šipka in Czechia and Krapina in Croatia.',
        true,
      ),
      truthMyth(
        '«Неандертальцы ходили сутулясь, на полусогнутых ногах, с головой, втянутой в плечи».',
        '“Neanderthals walked hunched over, with bent knees and the head pulled into the shoulders.”',
        'Классический неандерталец — коренастый, с относительно короткими руками и ногами, бочкообразной грудью и выступающим носом: так тело держало тепло. Сутулую походку описал Марселлен Буль по скелету старика из Ля-Шапель-о-Сен: старческие болезни он принял за черты всего вида.',
        'The classic Neanderthal was stocky, with relatively short limbs, a barrel chest and a projecting nose — a body built to keep heat. The hunched gait came from Marcellin Boule’s reading of an old man from La Chapelle-aux-Saints: he took age-related disease for traits of the whole species.',
        false,
      ),
      truthMyth(
        '«Мозг неандертальца был заметно меньше, чем у современного человека».',
        '“The Neanderthal brain was markedly smaller than that of a living human.”',
        'Самый крупный известный мозг неандертальца — у находки из пещеры Амуд, около 1750 см³. Это много по современным меркам. У некоторых кроманьонцев мозг был ещё больше: у мужчины из Барма-Гранде — до 1880 см³.',
        'The largest known Neanderthal brain is from Amud Cave, about 1,750 cm³ — large by today’s standards. Some Cro-Magnon people had still larger brains: a man from Barma Grande reached about 1,880 cm³.',
        false,
      ),
      truthMyth(
        '«Учёные точно знают, почему исчезли неандертальцы».',
        '“Scientists know exactly why Neanderthals disappeared.”',
        'Единого мнения нет. Среди гипотез — вытеснение конкурентами, извержения вулканов, болезни, близкородственные скрещивания, даже едкий дым в плохо проветриваемых пещерах. Ни одна не принята всеми.',
        'There is no single agreed answer. Hypotheses include displacement by rivals, volcanic eruptions, disease, inbreeding, even acrid smoke in poorly ventilated caves. None is accepted by everyone.',
        false,
      ),
    ],
  },
  {
    id: 'neo-craft',
    questions: [
      truthMyth(
        '«Неандертальцы первыми из гоминин стали регулярно хоронить своих сородичей».',
        '“Neanderthals were the first hominins to make a regular habit of burying their dead.”',
        'Известные погребения — Ля-Шапель-о-Сен, Ля-Ферраси (Франция), Кебара (Израиль), Шанидар (Ирак). В Шанидаре IV нашли пыльцу цветов; она могла попасть туда и иначе — ветром, грызунами или насекомыми.',
        'Known burials include La Chapelle-aux-Saints, La Ferrassie (France), Kebara (Israel) and Shanidar (Iraq). Shanidar IV held flower pollen; it could also have arrived on the wind, or with rodents or insects.',
        true,
      ),
      truthMyth(
        '«Неандертальцы пользовались огнём».',
        '“Neanderthals used fire.”',
        'Следы кострищ и обугленные кости есть на многих стоянках. Некоторые археологи считают, что огонь умели добывать: чиркали пиритом по кремню и даже использовали диоксид марганца как катализатор.',
        'Hearth traces and charred bone are found at many sites. Some archaeologists think they could make fire — striking pyrite on flint, even using manganese dioxide as a catalyst.',
        true,
      ),
      truthMyth(
        '«Неандертальцы украшали себя подвесками из раковин и птичьих когтей».',
        '“Neanderthals wore pendants of shells and bird claws.”',
        'Возможно, украшали себя и перьями. В пещере Фумане много костей птиц — в основном от крыльев, со следами орудий. Многие из этих видов «невкусные»; следы на костях крыльев похожи на то, что перья срезали.',
        'They may have worn feathers too. Fumane Cave holds many bird bones — mostly wings, with tool marks. Many of these species are poor eating; marks on the wing bones look like feathers being stripped.',
        true,
      ),
      truthMyth(
        '«Точно известно, как неандертальцы применяли охру».',
        '“It is known exactly how Neanderthals used ochre.”',
        'Охрой — красной краской — пользовались широко, но точно, как её наносили, неизвестно. Ею могли раскрашивать тело; краситель также может служить антисептиком, для выделки шкур или защиты от насекомых.',
        'They used ochre — a red pigment — widely, but how it was applied is uncertain. It may have coloured the body; the pigment can also serve as an antiseptic, in hide working, or against insects.',
        false,
      ),
      truthMyth(
        '«Неандертальцы крепили каменные наконечники к деревянным древкам смолой или верёвками из растительных волокон».',
        '“Neanderthals fixed stone points to wooden shafts with resin or cord of plant fibre.”',
        'Микроскопические остатки таких верёвок нашли на орудиях из Абри-дю-Марас на юге Франции, возрастом около 90 тысяч лет.',
        'Microscopic traces of such cord were found on tools from Abri du Maras in southern France, about 90,000 years old.',
        true,
      ),
    ],
  },
  {
    id: 'neo-genome',
    questions: [
      truthMyth(
        '«В геноме современных людей нет неандертальской ДНК».',
        '“Living people carry no Neanderthal DNA.”',
        'Неандертальцы скрещивались с предками современных людей. У всех неафриканцев в геноме около 2,5% неандертальской ДНК.',
        'Neanderthals interbred with the ancestors of living people. All non-Africans carry about 2.5% Neanderthal DNA.',
        false,
      ),
      truthMyth(
        '«Полностью прочтены геномы двух неандерталок — из пещеры Виндия в Хорватии и Денисовой пещеры на Алтае».',
        '“The genomes of two Neanderthal women have been fully read — from Vindija Cave in Croatia and Denisova Cave in the Altai.”',
        'Обе — женщины. По геномам видно, что неандертальцы реже, чем современные люди, сталкивались с рядом заболеваний — в том числе с болезнью Альцгеймера, аутизмом, синдромом Дауна и шизофренией.',
        'Both were women. The genomes suggest Neanderthals were less affected than living people by several conditions, including Alzheimer’s disease, autism, Down syndrome and schizophrenia.',
        true,
      ),
      truthMyth(
        '«В Африке нашли следы неандертальцев».',
        '“Traces of Neanderthals have been found in Africa.”',
        'Неандертальцы жили в Евразии от Пиренеев до территории современного Узбекистана. Многочисленные останки найдены на Ближнем Востоке. В Африке их следов до сих пор нет.',
        'Neanderthals lived in Eurasia from the Pyrenees to the land of modern Uzbekistan. Many remains have been found in the Near East. No traces of them have been found in Africa.',
        false,
      ),
      truthMyth(
        '«Кости вероятных предков неандертальцев в Сима-де-лос-Уэсос имеют возраст около 430 тысяч лет».',
        '“Bones of likely Neanderthal ancestors at Sima de los Huesos are about 430,000 years old.”',
        'Там останки не менее 32 индивидов. Ядерная ДНК роднит их с более поздними гомининами Европы; митохондриальная — с денисовцами.',
        'The site holds remains of at least 32 individuals. Nuclear DNA ties them to later European hominins; mitochondrial DNA ties them to Denisovans.',
        true,
      ),
      truthMyth(
        '«Неандертальцы охотились и на крупных животных, в том числе на мамонтов».',
        '“Neanderthals also hunted large animals, including mammoths.”',
        'Добыча была разнообразна, но крупные звери — мамонты, носороги, быки — занимали особое место. На стоянке Молодова нашли останки 15 мамонтов. На ребре одного взрослого мамонта есть след от проникающего удара острым предметом.',
        'The take was varied, but large animals — mammoths, rhinoceroses, cattle — held a special place. The Molodova site held remains of 15 mammoths. One adult mammoth rib shows a penetrating wound from a sharp point.',
        true,
      ),
    ],
  },
  {
    id: 'neo-daily',
    questions: [
      truthMyth(
        '«Неандертальцы питались только мясом».',
        '“Neanderthals ate only meat.”',
        'Ели не только мясо, но и растения и грибы. В Шанидаре — ячмень, вероятно варёный. В окаменевших фекалиях из Эль-Сальте тоже есть следы растительной пищи.',
        'They ate plants and fungi as well as meat. At Shanidar there is barley, probably cooked. Fossil faeces from El Salt also hold traces of plant food.',
        false,
      ),
      truthMyth(
        '«Неандертальцы заботились о пожилых сородичах».',
        '“Neanderthals cared for elderly companions.”',
        'Старик из Шанидара был слеп на левый глаз, потерял правую руку, хромал на правую ногу и дожил до старости: без поддержки соплеменников это было бы почти невозможно.',
        'The old man from Shanidar was blind in the left eye, had lost his right arm, limped on the right leg, and still reached old age — almost impossible without help from others.',
        true,
      ),
      truthMyth(
        '«В пещере Эль-Сидро́н нашли кости двенадцати неандертальцев со следами, которые связывают с каннибализмом».',
        '“El Sidrón Cave held the bones of twelve Neanderthals with traces linked to cannibalism.”',
        'Неандертальцы не брезговали каннибализмом, хотя неизвестно, как часто к нему прибегали. По костям не восстановить, что именно происходило.',
        'Neanderthals did practise cannibalism, though how often is unknown. The bones cannot reconstruct exactly what took place.',
        true,
      ),
      truthMyth(
        '«Находок искусства, которое приписывают неандертальцам, мало, и многие из них спорны».',
        '“Finds of art attributed to Neanderthals are few, and many of them are disputed.”',
        'Наиболее древние приписываемые им изображения — в испанских пещерах: красный рисунок в Ла-Пасьеге (~64,8 тыс. лет), пигмент на сталактитах в Ардалесе (~65,5), негатив ладони в Мальтравиесо (~66,7).',
        'The oldest images attributed to them are in Spanish caves: a red drawing in La Pasiega (~64,800 years), pigment on stalactites at Ardales (~65,500), and a hand stencil at Maltravieso (~66,700).',
        true,
      ),
      truthMyth(
        '«Костяная флейта из Дивье Бабе точно сделана неандертальцами».',
        '“The bone flute from Divje Babe was certainly made by Neanderthals.”',
        'Музыкальных инструментов неандертальцев не найдено. Дырки в кости из Словении, скорее всего, оставили гиены.',
        'No Neanderthal musical instruments have been found. The holes in the bone from Slovenia were most likely made by hyenas.',
        false,
      ),
    ],
  },
]

export const NEANDERTHAL_SET_IDS = neanderthalSets.map((set) => set.id)

export function neanderthalSetById(id: string) {
  const found = neanderthalSets.find((set) => set.id === id)
  if (!found) throw new Error(`Unknown Neanderthal set: ${id}`)
  return found
}
