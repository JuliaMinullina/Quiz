import { choice, pair, step, t } from '../copy'
import type { QuizSet } from '../types'

export const cyberSets: readonly QuizSet[] = [
  {
    id: 'cyber-passwords',
    questions: [
      {
        kind: 'choice4',
        prompt: t(
          'Какой пароль устойчивее к подбору?',
          'Which password is harder to guess?',
        ),
        fact: t(
          'Длина и непредсказуемость важнее, чем замена одной буквы на цифру в коротком слове. Дату рождения подобрать проще, чем длинную фразу.',
          'Length and unpredictability matter more than swapping one letter for a digit in a short word. A date of birth is easier to guess than a long phrase.',
        ),
        options: [
          choice('birthday', 'имя и год рождения', 'a name and year of birth'),
          choice(
            'phrase',
            'длинная фраза из нескольких слов, которой нет в списках частых паролей',
            'a long phrase of several words that is not on lists of common passwords',
            true,
          ),
          choice('123', '«123456»', '“123456”'),
          choice('word', 'слово «пароль»', 'the word “password”'),
        ],
      },
      {
        kind: 'trueFalse',
        prompt: t(
          '«Один и тот же пароль удобно ставить на почту, соцсети и банк — так его не забудешь».',
          '“It is handy to use the same password for mail, social networks and the bank, so you will not forget it.”',
        ),
        fact: t(
          'Если один пароль утечёт, откроются и остальные службы. Для разных входов нужны разные пароли.',
          'If one password leaks, the other services open with it. Different logins need different passwords.',
        ),
        correctIsTrue: false,
      },
      {
        kind: 'match',
        prompt: t('Соедини средство и зачем оно:', 'Match each tool with what it is for:'),
        fact: t(
          'Эти четыре привычки закрывают разные дыры: забывчивость, украденный пароль, потерянный телефон и цепочку одинаковых входов.',
          'These four habits close different gaps: forgetfulness, a stolen password, a lost phone, and a chain of identical logins.',
        ),
        pairs: [
          pair(
            'manager',
            t('менеджер паролей', 'a password manager'),
            t('хранит разные длинные пароли', 'stores different long passwords'),
          ),
          pair(
            'factor',
            t('второй фактор', 'a second factor'),
            t('подтверждение входа кодом или ключом', 'confirms a login with a code or a key'),
          ),
          pair(
            'backup',
            t('резервная почта', 'a backup mailbox'),
            t('восстановить доступ, если вход потерян', 'recovers access if the login is lost'),
          ),
          pair(
            'unique',
            t('уникальный пароль на каждый сервис', 'a unique password for each service'),
            t('утечка одного входа не открывает остальные', 'one leak does not open the rest'),
          ),
        ],
      },
      {
        kind: 'odd',
        prompt: t(
          'Что здесь лишнее среди правил к паролю?',
          'Which of these does not belong among password rules?',
        ),
        fact: t(
          'Служба сервиса не просит пароль в переписке. Кто просит — скорее всего, выдаёт себя за неё.',
          'A real service does not ask for your password in chat. Whoever asks is probably impersonating it.',
        ),
        options: [
          choice('repeat', 'не повторять пароль на разных сайтах', 'do not reuse a password on other sites'),
          choice('sticker', 'не писать его на стикере у экрана', 'do not write it on a sticker by the screen'),
          choice('leak', 'сменить его, если сервис сообщил об утечке', 'change it if the service reports a leak'),
          choice(
            'chat',
            'назвать пароль «техподдержке» в чате',
            'tell the password to “support” in a chat',
            true,
          ),
        ],
      },
      {
        kind: 'who',
        prompt: t(
          'Письмо: «Ваш банк. Срочно подтвердите пароль по ссылке». Что это скорее всего?',
          'An email: “Your bank. Confirm your password via this link at once.” What is this most likely?',
        ),
        fact: t(
          'Банк уже знает, что вы клиент, и не собирает пароль через письмо. Поддельная страница копирует вид банка и забирает введённые данные.',
          'The bank already knows you are a customer and does not collect a password from an email. A fake page copies the bank’s look and takes whatever you type.',
        ),
        options: [
          choice('notice', 'обычное уведомление банка', 'an ordinary bank notice'),
          choice(
            'phish',
            'фишинг: банк не просит пароль по ссылке из письма',
            'phishing: a bank does not ask for a password via a link in mail',
            true,
          ),
          choice('robot', 'проверка, что вы не робот', 'a check that you are not a robot'),
          choice('fee', 'обязательный платёж за обслуживание', 'a required service fee'),
        ],
      },
    ],
  },
  {
    id: 'cyber-phishing',
    questions: [
      {
        kind: 'choice4',
        prompt: t(
          'Какой признак чаще выдаёт поддельную ссылку?',
          'Which sign most often gives away a fake link?',
        ),
        fact: t(
          'Смотреть нужно не на картинку кнопки, а на адрес, куда она ведёт. Одна замена буквы делает чужой сайт.',
          'Look at the address the button opens, not at the picture on the button. One swapped letter makes a different site.',
        ),
        options: [
          choice('noon', 'письмо пришло днём', 'the email arrived in daytime'),
          choice(
            'typo',
            'адрес сайта чуть изменён: одна буква, лишний дефис, чужая зона',
            'the site address is slightly changed: one letter, an extra hyphen, another zone',
            true,
          ),
          choice('logo', 'в письме есть логотип компании', 'the email has the company logo'),
          choice('big', 'кнопка крупная', 'the button is large'),
        ],
      },
      {
        kind: 'trueFalse',
        prompt: t(
          '«Неожиданное вложение «счёт.zip» от неизвестного отправителя можно сразу открыть, если тема письма деловая».',
          '“An unexpected attachment named invoice.zip from an unknown sender can be opened at once if the subject looks businesslike.”',
        ),
        fact: t(
          'Вложение может запустить программу, которая не спрашивает разрешения. Деловая тема легко подделывается.',
          'An attachment can start a program that does not ask permission. A businesslike subject is easy to fake.',
        ),
        correctIsTrue: false,
      },
      {
        kind: 'match',
        prompt: t(
          'Соедини приём и в чём риск:',
          'Match each trick with the risk it carries:',
        ),
        fact: t(
          'Обман идёт не только почтой. Код из приложения, QR и «удобная» сеть — те же попытки оказаться между вами и настоящим сервисом.',
          'The con is not only email. An app code, a QR sticker and a “handy” network are the same attempt to stand between you and the real service.',
        ),
        pairs: [
          pair(
            'sms',
            t('SMS с короткой ссылкой «ваш пакет»', 'an SMS with a short “your parcel” link'),
            t('часто поддельная страница', 'often a fake page'),
          ),
          pair(
            'qr',
            t('QR на случайной наклейке', 'a QR code on a random sticker'),
            t('может вести на чужой сайт', 'may open someone else’s site'),
          ),
          pair(
            'call',
            t('звонок «я из техподдержки, назовите код»', 'a call: “I am support, read me the code”'),
            t('попытка получить ваш вход', 'an attempt to take your login'),
          ),
          pair(
            'wifi',
            t('бесплатный Wi‑Fi с именем банка в кафе', 'free café Wi‑Fi named after a bank'),
            t('чужая точка доступа', 'someone else’s access point'),
          ),
        ],
      },
      {
        kind: 'odd',
        prompt: t(
          'Что здесь лишнее среди безопасных действий?',
          'Which of these does not belong among safe actions?',
        ),
        fact: t(
          'Ввод пароля на странице из письма как раз и отдаёт вход. Проверяют сервис тем каналом, который вы открыли сами.',
          'Typing a password on a page from an email is how the login is given away. You check a service through a channel you opened yourself.',
        ),
        options: [
          choice('from', 'проверить адрес отправителя', 'check the sender’s address'),
          choice(
            'app',
            'открыть сайт банка через своё приложение, не из письма',
            'open the bank in your own app, not from the email',
          ),
          choice('card', 'позвонить в банк по номеру с карты', 'call the bank on the number printed on the card'),
          choice(
            'test',
            'перейти по ссылке и ввести пароль, «чтобы проверить»',
            'follow the link and type the password “to check”',
            true,
          ),
        ],
      },
      {
        kind: 'choice4',
        prompt: t(
          'Ссылку из странного письма уже открыли. Что делать дальше в первую очередь?',
          'A link from a strange email is already open. What should come first?',
        ),
        fact: t(
          'Закрытая страница без ввода данных часто ничем не кончается. Если пароль уже отдали — его меняют и закрывают вход вторым фактором, пока чужой им пользуется.',
          'Closing the page without typing anything often ends there. If the password was already given, change it and lock the login with a second factor while someone else may still use it.',
        ),
        options: [
          choice('forward', 'переслать письмо всем знакомым', 'forward the email to everyone you know'),
          choice(
            'close',
            'закрыть страницу и ничего не вводить; если данные уже ввели — сменить пароль и включить второй фактор',
            'close the page and type nothing; if data were already entered, change the password and turn on a second factor',
            true,
          ),
          choice('share', 'отправить пароль друзьям «на всякий случай»', 'send the password to friends “just in case”'),
          choice(
            'wait',
            'подождать: само пройдёт, даже если пароль уже ввели',
            'wait: it will pass, even if the password was already typed',
          ),
        ],
      },
    ],
  },
  {
    id: 'cyber-device',
    questions: [
      {
        kind: 'trueFalse',
        prompt: t(
          '«В открытой сети кафе безопасно входить в банк с паролем — ведь телефон новый».',
          '“On café public Wi‑Fi it is safe to log into a bank with a password, because the phone is new.”',
        ),
        fact: t(
          'В открытой сети чужой может подменить точку или видеть незащищённый трафик. Для банка лучше своя мобильная сеть или проверенный VPN и только официальное приложение.',
          'On an open network someone else can spoof the hotspot or see unencrypted traffic. For a bank, use your mobile network or a trusted VPN, and only the official app.',
        ),
        correctIsTrue: false,
      },
      {
        kind: 'choice4',
        prompt: t('Зачем на телефоне замок экрана?', 'Why lock a phone screen?'),
        fact: t(
          'Замок не шифрует интернет сам по себе, но закрывает уже открытые сессии, пока устройство лежит на столе.',
          'A lock does not encrypt the internet by itself, but it closes sessions that are already open while the device sits on a table.',
        ),
        options: [
          choice('fade', 'чтобы обои не выцветали', 'so the wallpaper does not fade'),
          choice(
            'lock',
            'чтобы посторонний не открыл почту и приложения, если телефон оставили',
            'so a stranger cannot open mail and apps if the phone is left behind',
            true,
          ),
          choice('battery', 'чтобы батарея садилась быстрее', 'so the battery drains faster'),
          choice('kids', 'это нужно только детям', 'it is only for children'),
        ],
      },
      {
        kind: 'match',
        prompt: t(
          'Соедини средство и что оно делает:',
          'Match each tool with what it does:',
        ),
        fact: t(
          'Шифрование пути, туннель, закрытый радиоинтерфейс и копия решают разные задачи. Одно не заменяет другое.',
          'Path encryption, a tunnel, a closed radio interface and a backup solve different problems. One does not replace another.',
        ),
        pairs: [
          pair(
            'https',
            t('значок замка / HTTPS в адресе', 'the lock icon / HTTPS in the address'),
            t('шифрует путь до сайта', 'encrypts the path to the site'),
          ),
          pair(
            'vpn',
            t('VPN', 'a VPN'),
            t('туннель в недоверенной сети', 'a tunnel on an untrusted network'),
          ),
          pair(
            'bt',
            t('выключенный Bluetooth, если им не пользуются', 'Bluetooth off when unused'),
            t('меньше случайных подключений', 'fewer chance connections'),
          ),
          pair(
            'copy',
            t('резервная копия', 'a backup'),
            t('вернуть данные, если устройство потеряно', 'restore data if the device is lost'),
          ),
        ],
      },
      {
        kind: 'odd',
        prompt: t(
          'Что здесь лишнее среди причин обновлять систему и приложения?',
          'Which of these does not belong among reasons to update the system and apps?',
        ),
        fact: t(
          'Обновление как раз закрывает дыры, о которых уже известно злоумышленникам. Яркость рекламы к этому не относится.',
          'An update closes holes that attackers already know about. Brighter ads have nothing to do with that.',
        ),
        options: [
          choice('holes', 'закрыть уже известные дыры', 'close holes that are already known'),
          choice('bugs', 'получить исправления ошибок', 'get bug fixes'),
          choice('browser', 'продлить защиту браузера', 'keep the browser’s protection current'),
          choice('ads', 'чтобы реклама стала ярче', 'so ads become brighter', true),
        ],
      },
      {
        kind: 'choice4',
        prompt: t(
          'На улице нашли чужую флешку. Как безопаснее?',
          'A stranger’s USB stick is found in the street. What is safer?',
        ),
        fact: t(
          'Флешка — такое же устройство, как диск. Автозапуск или файл «открой меня» может запустить чужую программу, не спрашивая.',
          'A stick is a drive like any other. Autostart or a file named “open me” can launch someone else’s program without asking.',
        ),
        options: [
          choice('plug', 'сразу вставить в свой компьютер', 'plug it into your computer at once'),
          choice(
            'leave',
            'не подключать к своему устройству: программа на ней может запуститься сама',
            'do not connect it to your device: a program on it may start by itself',
            true,
          ),
          choice('share', 'открыть дома и разослать файлы друзьям', 'open it at home and send the files to friends'),
          choice(
            'format',
            'отформатировать и подарить, не проверяя',
            'format it and give it away without checking',
          ),
        ],
      },
    ],
  },
  {
    id: 'cyber-data',
    questions: [
      {
        kind: 'choice4',
        prompt: t(
          'Что из этого — персональные данные?',
          'Which of these are personal data?',
        ),
        fact: t(
          'Персональные данные позволяют узнать конкретного человека. Погоду и марку транспорта к нему не привяжешь.',
          'Personal data can identify a particular person. Weather and a bus model cannot.',
        ),
        options: [
          choice('river', 'название реки', 'the name of a river'),
          choice(
            'id',
            'имя, телефон, точный адрес',
            'a name, a phone number, a precise address',
            true,
          ),
          choice('temp', 'температура за окном', 'the temperature outside'),
          choice('bus', 'марка общественного автобуса', 'the model of a city bus'),
        ],
      },
      {
        kind: 'trueFalse',
        prompt: t(
          '«Снимок из галереи телефона может хранить координаты места съёмки».',
          '“A photo in a phone gallery can store the coordinates of where it was taken.”',
        ),
        fact: t(
          'Во многих фото есть геометка. Если выкладывать снимок дома или школы, координаты иногда уезжают вместе с картинкой.',
          'Many photos hold a geotag. If a picture of a home or a school is posted, the coordinates sometimes travel with it.',
        ),
        correctIsTrue: true,
      },
      {
        kind: 'match',
        prompt: t('Соедини понятие и смысл:', 'Match each idea with its meaning:'),
        fact: t(
          'Следы остаются не только в «секретных» файлах. То, что выложили как открытое, копируют независимо от кнопки «удалить».',
          'Traces are not only in “secret” files. What was posted as public can be copied even after the delete button.',
        ),
        pairs: [
          pair(
            'cookie',
            t('cookie', 'a cookie'),
            t('сайт запоминает настройки и вход', 'the site remembers settings and a login'),
          ),
          pair(
            'factor',
            t('второй фактор', 'a second factor'),
            t('вход не только паролем', 'a login that is not password-only'),
          ),
          pair(
            'crypt',
            t('шифрование', 'encryption'),
            t('данные не читаются без ключа', 'data cannot be read without a key'),
          ),
          pair(
            'post',
            t('публичный пост', 'a public post'),
            t(
              'его могут сохранить и переслать даже после удаления',
              'it can be saved and forwarded even after deletion',
            ),
          ),
        ],
      },
      {
        kind: 'odd',
        prompt: t(
          'Чем здесь лишнее делиться в открытом профиле?',
          'Which of these does not belong among things to share on an open profile?',
        ),
        fact: t(
          'Скан документа и номер карты позволяют выдать себя за вас или списать деньги. Цвет и фильм к доступу не ведут.',
          'A document scan and a card number can be used to impersonate you or to take money. A colour and a film do not open an account.',
        ),
        options: [
          choice('color', 'любимый цвет', 'a favourite colour'),
          choice('film', 'фильм', 'a film'),
          choice('nick', 'вымышленный ник', 'a made-up nickname'),
          choice('scan', 'скан паспорта и номер карты', 'a passport scan and a card number', true),
        ],
      },
      {
        kind: 'order',
        prompt: t(
          'Если вход в аккаунт украли, расставь шаги от раннего к позднему:',
          'If an account login is stolen, put the steps in order, earliest to latest:',
        ),
        fact: t(
          'Сначала закрывают вход, потом усиливают его, затем смотрят, где ещё открыты сессии, и только после этого предупреждают людей, которым уже могли написать.',
          'First close the login, then strengthen it, then see where sessions are still open, and only then warn people who may already have been messaged.',
        ),
        items: [
          step('password', 'Сменить пароль', 'Change the password', 1),
          step('factor', 'Включить второй фактор', 'Turn on a second factor', 2),
          step('sessions', 'Проверить устройства и сессии', 'Check devices and sessions', 3),
          step(
            'warn',
            'Предупредить близких, если писали от вашего имени',
            'Warn people close to you if messages went out in your name',
            4,
          ),
        ],
      },
    ],
  },
]

export const CYBER_SET_IDS = cyberSets.map((set) => set.id)

export function cyberSetById(id: string) {
  const found = cyberSets.find((set) => set.id === id)
  if (!found) throw new Error(`Unknown cyber set: ${id}`)
  return found
}
