# Лофт-пространство «ШУМНО» / "SHUMNO" Loft (`goodroom26.ru`)

📖 **Полная документация / Full Documentation:**
- 🇷🇺 **[Документация на русском языке (`docs/DOCUMENTATION.ru.md`)](./docs/DOCUMENTATION.ru.md)**
- 🇬🇧 **[Documentation in English (`docs/DOCUMENTATION.en.md`)](./docs/DOCUMENTATION.en.md)**

---

## 🇷🇺 Краткий обзор (Русский)

Автономная продакшен-версия сайта **`https://goodroom26.ru/`** (миграция с Tilda Personal) на стеке **Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4** со строгим сквозным **HTTPS**.

- **0 внешних зависимостей от Tilda (`tildacdn.com`) и Google Fonts:** все фотографии (`public/images/`), иконки, OG-баннеры и шрифты `Comfortaa` (`public/fonts/`) хранятся локально.
- **100% сохранение SEO и URL:** главная (`/`), 6 лендингов мероприятий (`/happybirthday`, `/graduation`, `/children`, `/wedding`, `/corporative`, `/karaoke`), карточка лофта (`/tproduct/892542624922-loft-shumno`), блог (`/blog`, `/tpost/...`), контакты (`/contacts`) и публичная оферта (`/offer`).
- **Сквозной HTTPS:** Nginx TLS 1.2/1.3 + Let's Encrypt (`nginx/goodroom26.ru.conf`, `scripts/setup-https.sh`), прикладной прокси `src/proxy.ts` (`308` редиректы + HSTS + CSP `upgrade-insecure-requests`).
- **Заявки в Telegram:** калькулятор стоимости аренды и быстрые формы отправляют лиды через `POST /api/lead` напрямую в Telegram Bot API.
- **Продакшен и CI/CD:** работает на VPS (`201.8.90.190`, порт **`3002`**) под управлением `PM2` и `Nginx`, автодеплой настроен в `.github/workflows/deploy.yml`.

### Быстрый старт
```bash
npm install
npm run dev          # http://localhost:3000
npm run dev:https    # https://localhost:3000 (локальный HTTPS)
npm run lint
npm run build
npm run start -- -p 3002
```

Подробное описание архитектуры, редактирования цен/контента, настройки Telegram-бота, DNS, Nginx, SSL и команд администрирования — в **[`docs/DOCUMENTATION.ru.md`](./docs/DOCUMENTATION.ru.md)**.

---

## 🇬🇧 Quick Overview (English)

Self-contained production web application for **`https://goodroom26.ru/`** (migrated from Tilda Personal), built with **Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4** and strict end-to-end **HTTPS**.

- **Zero dependency on Tilda (`tildacdn.com`) or external font CDNs:** all 94 images (`public/images/`), icons, OG banners, and `Comfortaa` variable WOFF2 fonts (`public/fonts/`) are self-hosted.
- **100% URL & SEO parity:** homepage (`/`), 6 event landing pages (`/happybirthday`, `/graduation`, `/children`, `/wedding`, `/corporative`, `/karaoke`), product page (`/tproduct/892542624922-loft-shumno`), blog (`/blog`, `/tpost/...`), contacts (`/contacts`), and public offer (`/offer`).
- **Multi-layer HTTPS:** Nginx TLS 1.2/1.3 + Let's Encrypt (`nginx/goodroom26.ru.conf`, `scripts/setup-https.sh`), Next.js 16 Proxy `src/proxy.ts` (`308` canonical HTTPS redirects, HSTS `preload`, CSP `upgrade-insecure-requests`).
- **Telegram Lead Capture:** interactive weekday/weekend booking calculator and quick callback forms powered by `POST /api/lead`.
- **Production & CI/CD:** runs on Ubuntu VPS (`201.8.90.190`, port **`3002`**) via `PM2` and `Nginx` with automated SSH deployment in `.github/workflows/deploy.yml`.

### Quick Start
```bash
npm install
npm run dev          # http://localhost:3000
npm run dev:https    # https://localhost:3000 (local HTTPS)
npm run lint
npm run build
npm run start -- -p 3002
```

For full architecture diagrams, route tables, content editing instructions, Telegram bot setup, DNS/SSL operations, and troubleshooting, see **[`docs/DOCUMENTATION.en.md`](./docs/DOCUMENTATION.en.md)**.
