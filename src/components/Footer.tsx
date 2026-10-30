import React from "react";
import Link from "next/link";
import { EVENT_NAV_ITEMS, SITE_CONFIG } from "@/data/site";
import {
  MaxMessengerIcon,
  TelegramIcon,
  WhatsAppIcon,
} from "@/components/Icons";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          {/* Col 1: Brand & Legal */}
          <div>
            <Link href="/" className="inline-block">
              <img
                src="/images/brand/logo.png"
                alt={SITE_CONFIG.brandAlt}
                loading="lazy"
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
              Пространство «ШУМНО» — стильный приватный лофт 100 м² в центре
              Пятигорска для вечеринок, дней рождения, свадеб и корпоративов.
              Можно шуметь 24/7.
            </p>
            <div className="mt-5 space-y-1 text-xs text-white/55">
              <p>{SITE_CONFIG.legalName}</p>
              <p>ИНН {SITE_CONFIG.inn} • ОГРНИП {SITE_CONFIG.ogrnip}</p>
            </div>
          </div>

          {/* Col 2: Event Formats */}
          <div>
            <h3 className="text-sm font-bold tracking-wider text-[#43ff57] uppercase">
              Мероприятия
            </h3>
            <ul className="mt-4 grid grid-cols-1 gap-2.5 text-sm sm:grid-cols-2 md:grid-cols-1">
              {EVENT_NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/80 transition hover:text-[#43ff57]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contacts & Legal Links */}
          <div>
            <h3 className="text-sm font-bold tracking-wider text-[#43ff57] uppercase">
              Контакты и документы
            </h3>
            <div className="mt-4 space-y-2.5 text-sm">
              <a
                href={SITE_CONFIG.phoneHref}
                className="block text-lg font-bold text-white transition hover:text-[#43ff57]"
              >
                {SITE_CONFIG.phoneDisplay}
              </a>
              <a
                href={SITE_CONFIG.emailHref}
                className="block text-white/80 transition hover:text-[#43ff57]"
              >
                {SITE_CONFIG.email}
              </a>
              <p className="text-white/70">{SITE_CONFIG.address}</p>
            </div>

            <div className="mt-5 flex items-center gap-2.5">
              <a
                href={SITE_CONFIG.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#43ff57] hover:text-black"
              >
                <TelegramIcon className="h-5 w-5" />
              </a>
              <a
                href={SITE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#43ff57] hover:text-black"
              >
                <WhatsAppIcon className="h-5 w-5" />
              </a>
              <a
                href={SITE_CONFIG.maxUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Max"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#43ff57] hover:text-black"
              >
                <MaxMessengerIcon className="h-5 w-5" />
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-4 text-xs text-white/65">
              <Link
                href="/offer"
                className="underline decoration-white/30 underline-offset-4 transition hover:text-[#43ff57]"
              >
                Публичная оферта
              </Link>
              <Link
                href="/blog"
                className="underline decoration-white/30 underline-offset-4 transition hover:text-[#43ff57]"
              >
                Блог
              </Link>
              <Link
                href="/contacts"
                className="underline decoration-white/30 underline-offset-4 transition hover:text-[#43ff57]"
              >
                Контакты
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
