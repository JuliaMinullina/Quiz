# Орбита России

Киоск-викторина для горизонтального тачскрина. Источник правды — [`ТРЕБОВАНИЯ.md`](ТРЕБОВАНИЯ.md).

Онлайн: [juliaminullina.github.io/Quiz](https://juliaminullina.github.io/Quiz/)

## Запуск

```bash
npm install
npm run dev
```

Откройте `http://localhost:5173` в Chrome на весь экран.

## Киоск (Chrome)

Соберите и откройте превью, затем запустите Chrome без рамок:

```bash
npm run build
npm run preview
```

```bash
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
  --kiosk \
  --app=http://127.0.0.1:4173 \
  --overscroll-history-navigation=0
```

Экран должен быть горизонтальным 16:9. Точный пиксельный размер не важен: вёрстка резиновая.

## Проверки

```bash
npm test
npx playwright install chromium
npm run test:e2e
```
