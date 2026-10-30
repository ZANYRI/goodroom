# Лофт-пространство «ШУМНО» / "SHUMNO" Loft (`goodroom26.ru`)

📖 **Полная документация / Full Documentation:**
- 🇷🇺 **[Документация на русском языке (`docs/DOCUMENTATION.ru.md`)](./docs/DOCUMENTATION.ru.md)**
- 🇬🇧 **[Documentation in English (`docs/DOCUMENTATION.en.md`)](./docs/DOCUMENTATION.en.md)**

---

## 🇷🇺 Краткий обзор (Русский)

Автономная продакшен-версия сайта **`https://goodroom26.ru/`** (миграция с Tilda Personal + архитектурный редизайн) на стеке **Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4** со строгим сквозным **HTTPS**.

- **0 внешних зависимостей от Tilda (`tildacdn.com`) и Google Fonts:** все 94 фотографии (`public/images/`), иконки, OG-баннеры и вариативные шрифты `Unbounded`, `Manrope` и `Comfortaa` (`public/fonts/`) хранятся локально.
- **Архитектурный дизайн с переключением Темной и Светлой темы:** две полноценные семантические палитры (`Dark Architectural Lounge` `#0b0d10` и `Warm Architectural Stone` `#f2f2ec`, фирменный акцент `#3be85e`), реактивный переключатель темы без вспышки FOUC (`localStorage` + `useSyncExternalStore`).
- **Нативные отзывы и адаптивные Яндекс Карты:** фирменный виджет отзывов `YandexReviewsWidget` с фоновой синхронизацией через `GET /api/reviews` и интерактивные векторные Яндекс Карты, автоматически меняющие цветовую схему (`theme=dark` / `theme=light`) вслед за темой сайта.
- **100% сохранение SEO и URL:** главная (`/`), 6 лендингов мероприятий (`/happybirthday`, `/graduation`, `/children`, `/wedding`, `/corporative`, `/karaoke`), карточка лофта (`/tproduct/892542624922-loft-shumno`), блог (`/blog`, `/tpost/...`), контакты (`/contacts`) и публичная оферта (`/offer`).
- **Сквозной HTTPS:** Nginx TLS 1.2/1.3 + Let's Encrypt (`nginx/goodroom26.ru.conf`, `scripts/setup-https.sh`), прикладной прокси `src/proxy.ts` (`308` редиректы + HSTS + CSP `upgrade-insecure-requests`).
- **Заявки в Telegram:** калькулятор стоимости аренды и быстрые формы отправляют лиды через `POST /api/lead` напрямую в Telegram Bot API.
- **Продакшен и CI/CD:** работает на VPS (`201.8.90.190`, порт **`3002`**) под управлением `PM2` и `Nginx`; автодеплой настроен в `.github/workflows/deploy.yml` при пуше в ветку `main` (разработка ведется в ветках вроде `dev_danil` без затрагивания боевого сервера).

### Быстрый старт
```bash
npm install
npm run dev          # http://localhost:3000
npm run dev:https    # https://localhost:3000 (локальный HTTPS)
npm run lint
npm run build
npm run start -- -p 3002
```

Подробное описание архитектуры, дизайн-токенов, переключения тем, API отзывов и заявок, редактирования контента, настройки Telegram-бота, DNS, Nginx, SSL и команд администрирования — в **[`docs/DOCUMENTATION.ru.md`](./docs/DOCUMENTATION.ru.md)**.

---

## 🇬🇧 Quick Overview (English)

Self-contained production web application for **`https://goodroom26.ru/`** (migrated from Tilda Personal with a bespoke architectural redesign), built with **Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4** and strict end-to-end **HTTPS**.

- **Zero dependency on Tilda (`tildacdn.com`) or external font CDNs:** all 94 images (`public/images/`), icons, OG banners, and variable WOFF2 fonts (`Unbounded`, `Manrope`, `Comfortaa` in `public/fonts/`) are self-hosted.
- **Architectural Dual-Theme UI (Dark & Light):** semantic CSS token system featuring `Dark Architectural Lounge` (`#0b0d10`) and `Warm Architectural Stone` (`#f2f2ec`) palettes with signature `#3be85e` accent, zero-FOUC initialization, and tactile segmented theme switchers.
- **Native Yandex Reviews & Theme-Aware Yandex Maps:** bespoke `YandexReviewsWidget` synced with live Yandex Maps reviews via `GET /api/reviews` (1-hour cache + static snapshot fallback), plus interactive Yandex Map embeds that dynamically switch vector tiles (`theme=dark` / `theme=light`) with the active site theme.
- **100% URL & SEO parity:** homepage (`/`), 6 event landing pages (`/happybirthday`, `/graduation`, `/children`, `/wedding`, `/corporative`, `/karaoke`), product page (`/tproduct/892542624922-loft-shumno`), blog (`/blog`, `/tpost/...`), contacts (`/contacts`), and public offer (`/offer`).
- **Multi-layer HTTPS:** Nginx TLS 1.2/1.3 + Let's Encrypt (`nginx/goodroom26.ru.conf`, `scripts/setup-https.sh`), Next.js 16 Proxy `src/proxy.ts` (`308` canonical HTTPS redirects, HSTS `preload`, CSP `upgrade-insecure-requests`).
- **Telegram Lead Capture:** interactive weekday/weekend booking calculator and quick callback forms powered by `POST /api/lead`.
- **Production & CI/CD:** runs on Ubuntu VPS (`201.8.90.190`, port **`3002`**) via `PM2` and `Nginx` with automated SSH deployment on `main` in `.github/workflows/deploy.yml` (feature branches like `dev_danil` remain safely isolated from production until merged).

### Quick Start
```bash
npm install
npm run dev          # http://localhost:3000
npm run dev:https    # https://localhost:3000 (local HTTPS)
npm run lint
npm run build
npm run start -- -p 3002
```

For full architecture diagrams, route tables, theme & review widget internals, content editing instructions, Telegram bot setup, DNS/SSL operations, and troubleshooting, see **[`docs/DOCUMENTATION.en.md`](./docs/DOCUMENTATION.en.md)**.
