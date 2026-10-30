import React from "react";
import Link from "next/link";
import { EVENT_NAV_ITEMS, SITE_CONFIG } from "@/data/site";
import { LOFT_PRODUCT } from "@/data/home";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  MaxMessengerIcon,
  TelegramIcon,
  WhatsAppIcon,
} from "@/components/Icons";

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-surface text-ink">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.35fr_0.9fr_0.85fr_1fr]">
          {/* Col 1: Brand & Spatial Summary */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center rounded-xl bg-[#08090c] px-2.5 py-1.5 ring-1 ring-white/10"
            >
              <img
                src="/images/brand/logo.png"
                alt={SITE_CONFIG.brandAlt}
                loading="lazy"
                className="h-11 w-auto object-contain"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-muted">
              Приватное лофт-пространство 100 м² в Пятигорске для вечеринок,
              дней рождения, камерных свадеб и корпоративов. Работаем 24/7 без
              пробкового сбора.
            </p>
            <div className="mt-5 space-y-1 text-xs text-ink-subtle">
              <p>{SITE_CONFIG.legalName}</p>
              <p className="font-mono tabular-nums">
                ИНН {SITE_CONFIG.inn} · ОГРНИП {SITE_CONFIG.ogrnip}
              </p>
            </div>
          </div>

          {/* Col 2: Event Formats */}
          <div>
            <p className="font-display text-sm font-semibold text-ink">
              Форматы событий
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {EVENT_NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-ink-muted transition hover:text-accent-text"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Navigation & Legal */}
          <div>
            <p className="font-display text-sm font-semibold text-ink">
              Навигация
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  href={LOFT_PRODUCT.url}
                  className="text-ink-muted transition hover:text-accent-text"
                >
                  О площадке и оснащении
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-ink-muted transition hover:text-accent-text"
                >
                  Журнал о событиях
                </Link>
              </li>
              <li>
                <Link
                  href="/contacts"
                  className="text-ink-muted transition hover:text-accent-text"
                >
                  Контакты и схема проезда
                </Link>
              </li>
              <li>
                <Link
                  href="/offer"
                  className="text-ink-muted transition hover:text-accent-text"
                >
                  Публичная оферта
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Direct Contacts */}
          <div>
            <p className="font-display text-sm font-semibold text-ink">
              Связь и адрес
            </p>
            <div className="mt-4 space-y-2 text-sm">
              <a
                href={SITE_CONFIG.phoneHref}
                className="block font-mono text-lg font-bold text-ink tabular-nums transition hover:text-accent-text"
              >
                {SITE_CONFIG.phoneDisplay}
              </a>
              <a
                href={SITE_CONFIG.emailHref}
                className="block text-ink-muted transition hover:text-accent-text"
              >
                {SITE_CONFIG.email}
              </a>
              <p className="text-ink-muted">{SITE_CONFIG.address}</p>
            </div>

            <div className="mt-5 flex items-center gap-2">
              <a
                href={SITE_CONFIG.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-hairline bg-surface-elevated text-ink transition hover:border-accent-text hover:text-accent-text"
              >
                <TelegramIcon className="h-5 w-5" />
              </a>
              <a
                href={SITE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-hairline bg-surface-elevated text-ink transition hover:border-accent-text hover:text-accent-text"
              >
                <WhatsAppIcon className="h-5 w-5" />
              </a>
              <a
                href={SITE_CONFIG.maxUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Max"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-hairline bg-surface-elevated text-ink transition hover:border-accent-text hover:text-accent-text"
              >
                <MaxMessengerIcon className="h-5 w-5" />
              </a>
            </div>

            <div className="mt-5">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
