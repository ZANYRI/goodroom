"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { EVENT_NAV_ITEMS, SITE_CONFIG } from "@/data/site";
import { LOFT_PRODUCT } from "@/data/home";
import { useLeadModal } from "@/components/ModalProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  ChevronDownIcon,
  CloseIcon,
  MaxMessengerIcon,
  MenuIcon,
  TelegramIcon,
  WhatsAppIcon,
} from "@/components/Icons";

export function Header() {
  const pathname = usePathname();
  const { openLeadModal } = useLeadModal();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileEventsOpen, setMobileEventsOpen] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const isEventActive = EVENT_NAV_ITEMS.some((item) => item.href === pathname);

  return (
    <header className="surface-glass sticky top-0 z-40 w-full border-b border-hairline">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* Left: Brand Emblem */}
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className="flex shrink-0 items-center gap-3 focus-visible:outline-2 focus-visible:outline-accent"
        >
          <span className="flex items-center rounded-xl bg-[#08090c] px-2 py-1 ring-1 ring-white/10">
            <img
              src="/images/brand/logo.png"
              alt={SITE_CONFIG.brandAlt}
              className="h-10 w-auto object-contain sm:h-11"
            />
          </span>
        </Link>

        {/* Center: Single-line Architectural Navigation */}
        <nav
          aria-label="Основная навигация"
          className="hidden items-center gap-7 lg:flex"
        >
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              type="button"
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
              onClick={() => setDropdownOpen((v) => !v)}
              className={`inline-flex cursor-pointer items-center gap-1.5 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-accent ${
                isEventActive
                  ? "text-accent-text"
                  : "text-ink hover:text-accent-text"
              }`}
            >
              <span>Мероприятия</span>
              <ChevronDownIcon
                className={`h-4 w-4 transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180 text-accent-text" : ""
                }`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-0 pt-2">
                <div className="w-[248px] rounded-2xl border border-hairline-strong bg-surface p-2 shadow-2xl">
                  {EVENT_NAV_ITEMS.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setDropdownOpen(false)}
                        className={`block rounded-xl px-3.5 py-2.5 text-sm font-semibold transition ${
                          active
                            ? "bg-accent-soft text-accent-text"
                            : "text-ink hover:bg-surface-elevated hover:text-accent-text"
                        }`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <Link
            href={LOFT_PRODUCT.url}
            className={`text-sm font-semibold transition hover:text-accent-text focus-visible:outline-2 focus-visible:outline-accent ${
              pathname === LOFT_PRODUCT.url ? "text-accent-text" : "text-ink"
            }`}
          >
            О площадке
          </Link>

          <Link
            href={pathname === "/" ? "#blog" : "/blog"}
            className={`text-sm font-semibold transition hover:text-accent-text focus-visible:outline-2 focus-visible:outline-accent ${
              pathname.startsWith("/blog") || pathname.startsWith("/tpost")
                ? "text-accent-text"
                : "text-ink"
            }`}
          >
            Блог
          </Link>

          <Link
            href="/contacts"
            className={`text-sm font-semibold transition hover:text-accent-text focus-visible:outline-2 focus-visible:outline-accent ${
              pathname === "/contacts" ? "text-accent-text" : "text-ink"
            }`}
          >
            Контакты
          </Link>
        </nav>

        {/* Right: Messengers, Phone, Theme, Single Primary CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <div className="flex items-center gap-1.5">
            <a
              href={SITE_CONFIG.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Написать в Telegram"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-hairline bg-surface text-ink-muted transition hover:border-accent-text hover:text-accent-text"
            >
              <TelegramIcon className="h-4 w-4" />
            </a>
            <a
              href={SITE_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Написать в WhatsApp"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-hairline bg-surface text-ink-muted transition hover:border-accent-text hover:text-accent-text"
            >
              <WhatsAppIcon className="h-4 w-4" />
            </a>
            <a
              href={SITE_CONFIG.maxUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Написать в Max"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-hairline bg-surface text-ink-muted transition hover:border-accent-text hover:text-accent-text"
            >
              <MaxMessengerIcon className="h-4 w-4" />
            </a>
          </div>

          <a
            href={SITE_CONFIG.phoneHref}
            className="px-1 font-mono text-sm font-bold tracking-tight whitespace-nowrap text-ink tabular-nums transition hover:text-accent-text"
          >
            {SITE_CONFIG.phoneDisplay}
          </a>

          <ThemeToggle />

          <button
            type="button"
            onClick={() =>
              openLeadModal({ mode: "booking", source: "Шапка сайта" })
            }
            className="btn-primary h-10 px-4 text-sm focus-visible:outline-2 focus-visible:outline-accent"
          >
            Проверить дату
          </button>
        </div>

        {/* Mobile Actions & Burger */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />

          <button
            type="button"
            onClick={() =>
              openLeadModal({ mode: "booking", source: "Шапка (моб.)" })
            }
            className="btn-primary h-9 px-3 text-xs"
          >
            Проверить дату
          </button>

          <button
            type="button"
            aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-hairline-strong bg-surface text-ink transition hover:border-accent-text hover:text-accent-text"
          >
            {mobileOpen ? (
              <CloseIcon className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-t border-hairline bg-surface px-4 pt-4 pb-6 lg:hidden">
          <nav aria-label="Мобильное меню" className="space-y-1.5">
            <div>
              <button
                type="button"
                onClick={() => setMobileEventsOpen((v) => !v)}
                className="flex w-full cursor-pointer items-center justify-between rounded-xl bg-surface-elevated px-4 py-3 text-left text-sm font-bold text-ink"
              >
                <span>Мероприятия</span>
                <ChevronDownIcon
                  className={`h-4 w-4 transition-transform ${
                    mobileEventsOpen ? "rotate-180 text-accent-text" : ""
                  }`}
                />
              </button>
              {mobileEventsOpen && (
                <div className="mt-1.5 grid grid-cols-1 gap-1 pl-3">
                  {EVENT_NAV_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`rounded-xl px-3.5 py-2.5 text-sm font-semibold transition ${
                        pathname === item.href
                          ? "bg-accent-soft text-accent-text"
                          : "text-ink-muted hover:text-accent-text"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href={LOFT_PRODUCT.url}
              onClick={() => setMobileOpen(false)}
              className="block rounded-xl px-4 py-3 text-sm font-bold text-ink transition hover:bg-surface-elevated hover:text-accent-text"
            >
              О площадке
            </Link>

            <Link
              href="/blog"
              onClick={() => setMobileOpen(false)}
              className="block rounded-xl px-4 py-3 text-sm font-bold text-ink transition hover:bg-surface-elevated hover:text-accent-text"
            >
              Блог
            </Link>

            <Link
              href="/contacts"
              onClick={() => setMobileOpen(false)}
              className="block rounded-xl px-4 py-3 text-sm font-bold text-ink transition hover:bg-surface-elevated hover:text-accent-text"
            >
              Контакты
            </Link>

            <Link
              href="/offer"
              onClick={() => setMobileOpen(false)}
              className="block rounded-xl px-4 py-3 text-sm font-semibold text-ink-muted transition hover:bg-surface-elevated hover:text-accent-text"
            >
              Публичная оферта
            </Link>
          </nav>

          <div className="mt-5 border-t border-hairline pt-5">
            <a
              href={SITE_CONFIG.phoneHref}
              className="block font-mono text-lg font-bold text-ink tabular-nums hover:text-accent-text"
            >
              {SITE_CONFIG.phoneDisplay}
            </a>
            <p className="mt-1 text-xs text-ink-muted">{SITE_CONFIG.address}</p>

            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              <a
                href={SITE_CONFIG.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-hairline bg-surface-elevated px-3.5 text-xs font-semibold text-ink transition hover:border-accent-text hover:text-accent-text"
              >
                <TelegramIcon className="h-4 w-4" />
                Telegram
              </a>
              <a
                href={SITE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-hairline bg-surface-elevated px-3.5 text-xs font-semibold text-ink transition hover:border-accent-text hover:text-accent-text"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp
              </a>
              <a
                href={SITE_CONFIG.maxUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-hairline bg-surface-elevated px-3.5 text-xs font-semibold text-ink transition hover:border-accent-text hover:text-accent-text"
              >
                <MaxMessengerIcon className="h-4 w-4" />
                Max
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
