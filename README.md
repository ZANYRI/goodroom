# Лофт-пространство «ШУМНО» (`goodroom26.ru`) — Next.js + Strict HTTPS

Полная автономная версия сайта `https://goodroom26.ru/` (перенос с Tilda Personal) на **Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4**.

Все фотографии лофта и мероприятий (`public/images/`), иконки, OG-баннеры, шрифты `Comfortaa` (`public/fonts/`), статьи блога, тарифы и текст публичной оферты хранятся локально в проекте — **0 зависимостей от серверов Tilda (`tildacdn.com`) и внешних CDN шрифтов**.

---

## Что реализовано по HTTPS (без смешанного контента)

1. **Nginx + Let's Encrypt TLS 1.2/1.3 (`nginx/goodroom26.ru.conf`, `scripts/setup-https.sh`)**:
   - Автоматический выпуск и автопродление SSL-сертификата для `goodroom26.ru` и `www.goodroom26.ru`.
   - Жёсткий `301` редирект `http://` → `https://goodroom26.ru` и `https://www.goodroom26.ru` → `https://goodroom26.ru`.
2. **Next.js 16 HTTPS Proxy (`src/proxy.ts`)**:
   - На уровне приложения контролирует заголовок `X-Forwarded-Proto` и канонический хост: любые HTTP-запросы или запросы с `www.` в production получают `308` редирект на `https://goodroom26.ru` (при этом `localhost` и `127.0.0.1` работают штатно для локальной разработки и healthcheck-проверок PM2).
3. **Заголовки безопасности (`next.config.ts`)**:
   - `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
   - `Content-Security-Policy: upgrade-insecure-requests`
   - `X-Content-Type-Options: nosniff`
   - `Referrer-Policy: strict-origin-when-cross-origin`
   - `X-Frame-Options: SAMEORIGIN`
4. **100% HTTPS во всех ресурсах и метаданных**:
   - Канонические URL, `sitemap.xml`, `robots.txt`, OpenGraph, JSON-LD (`https://schema.org`), виджеты Яндекс Карт и Отзывов, Яндекс.Метрика (`102654634`) и Telegram Bot API работают строго по `https://`.

---

## Быстрый старт локально

```bash
npm install
npm run dev
```

Откройте `http://localhost:3000`.

### Локальный запуск сразу с HTTPS-сертификатом

```bash
npm run dev:https
```

Next.js автоматически сгенерирует локальный доверенный сертификат и запустит сайт на `https://localhost:3000`.

### Проверка production-сборки

```bash
npm run lint
npm run build
npm run start -- -p 3002
```

---

## Настройка заявок в Telegram (`.env`)

Скопируйте `.env.example` в `.env`:

```bash
cp .env.example .env
```

Заполните переменные:
- `NEXT_PUBLIC_SITE_URL=https://goodroom26.ru`
- `TELEGRAM_BOT_TOKEN=...` — токен вашего бота от `@BotFather`
- `TELEGRAM_CHAT_ID=...` — ID чата или группы менеджеров, куда будут приходить заявки на бронирование и обратный звонок
- `NEXT_PUBLIC_YANDEX_METRIKA_ID=102654634`

---

## Переключение домена `goodroom26.ru` с Tilda на ваш VPS и включение HTTPS

> **Важно:** сертификат Let's Encrypt выпускается только после того, как домен `goodroom26.ru` указывает на IP вашего VPS (а не на IP Tilda).

### Шаг 1. Переключите DNS-записи у регистратора домена
В панели управления DNS домена `goodroom26.ru` замените старые `A`-записи Tilda на IP-адрес вашего VPS:
- Тип `A`, имя `@` → `<IP_ВАШЕГО_VPS>`
- Тип `A`, имя `www` → `<IP_ВАШЕГО_VPS>`
- Если для `@` или `www` были `AAAA`-записи Tilda — удалите их (или укажите IPv6 вашего VPS).

Проверьте обновление DNS (обычно 5–15 минут):
```bash
dig +short goodroom26.ru
```

### Шаг 2. Разверните проект на VPS (порт `3002`)
Проект настроен на порт **`3002`** в `ecosystem.config.cjs`, чтобы работать параллельно с другими сайтами на одном сервере (например, `3000` и `3001`):

```bash
sudo mkdir -p /var/www/goodroom
sudo chown $USER:$USER /var/www/goodroom
git clone git@github.com:<ВАШ_АККАУНТ>/<ВАШ_РЕПОЗИТОРИЙ>.git /var/www/goodroom
cd /var/www/goodroom

cp .env.example .env
nano .env   # укажите TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID

npm ci
npm run build

pm2 start ecosystem.config.cjs
pm2 save
```

### Шаг 3. Выпустите HTTPS-сертификат одной командой
Запустите готовый скрипт из репозитория:

```bash
sudo bash /var/www/goodroom/scripts/setup-https.sh goodroom26@mail.ru
```

Скрипт сам:
1. Установит `nginx` и `certbot` (если они ещё не установлены);
2. Выпустит бесплатный SSL-сертификат Let's Encrypt для `goodroom26.ru` и `www.goodroom26.ru`;
3. Подключит конфиг `nginx/goodroom26.ru.conf` с `HTTP/2`, `HSTS` и `301`-редиректом на `https://goodroom26.ru`;
4. Включит `certbot.timer` для автоматического продления сертификата каждые 60 дней.

Проверить HTTPS после запуска:
```bash
curl -I http://goodroom26.ru
curl -I https://goodroom26.ru
```

---

## Автодеплой через GitHub Actions (CI/CD)

В репозитории настроен workflow `.github/workflows/deploy.yml`. При каждом `git push` в ветку `main` проверяются `npm run lint` и `npm run build`, после чего изменения автоматически раскатываются на VPS по SSH с проверкой healthcheck на `http://127.0.0.1:3002`.

Секреты в GitHub (**Settings → Secrets and variables → Actions**):
- `VPS_HOST` — IP-адрес сервера
- `VPS_SSH_KEY` — приватный SSH-ключ
- `VPS_USER` *(необязательно, по умолчанию `root`)*
- `VPS_PORT` *(необязательно, по умолчанию `22`)*
- `VPS_APP_DIR` *(необязательно, по умолчанию `/var/www/goodroom`)*
