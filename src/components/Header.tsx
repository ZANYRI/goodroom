"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { EVENT_NAV_ITEMS, SITE_CONFIG } from "@/data/site";
import { useLeadModal } from "@/components/ModalProvider";
import {
  ChevronDownIcon,
  CloseIcon,
  MaxMessengerIcon,
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
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-black text-white">
      <div className="mx-auto flex h-[74px] max-w-[1280px] items-center justify-between gap-4 px-4 sm:px-6">
        {/* Left: Brand Logo */}
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className="flex shrink-0 items-center gap-3 focus-visible:outline-2 focus-visible:outline-[#43ff57]"
        >
          <img
            src="/images/brand/logo.png"
            alt={SITE_CONFIG.brandAlt}
            className="h-11 w-auto object-contain sm:h-12"
          />
        </Link>

        {/* Center: Desktop Navigation */}
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
              className={`inline-flex cursor-pointer items-center gap-1.5 py-2 text-[15px] font-semibold transition focus-visible:outline-2 focus-visible:outline-[#43ff57] ${
                isEventActive
                  ? "text-[#43ff57]"
                  : "text-white hover:text-[#43ff57]"
              }`}
            >
              <span>Мероприятия</span>
              <ChevronDownIcon
                className={`h-4 w-4 transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180 text-[#43ff57]" : ""
                }`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-0 pt-2">
                <div className="w-[240px] rounded-[12px] border border-white/10 bg-[#2b2b2b] p-2 shadow-2xl">
                  {EVENT_NAV_ITEMS.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setDropdownOpen(false)}
                        className={`block rounded-[8px] px-3.5 py-2.5 text-[14px] font-semibold transition ${
                          active
                            ? "bg-white/10 text-[#43ff57]"
                            : "text-white hover:bg-white/5 hover:text-[#43ff57]"
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
            href={pathname === "/" ? "#blog" : "/blog"}
            className={`text-[15px] font-semibold transition hover:text-[#43ff57] focus-visible:outline-2 focus-visible:outline-[#43ff57] ${
              pathname.startsWith("/blog") || pathname.startsWith("/tpost")
                ? "text-[#43ff57]"
                : "text-white"
            }`}
          >
            Блог
          </Link>

          <Link
            href="/contacts"
            className={`text-[15px] font-semibold transition hover:text-[#43ff57] focus-visible:outline-2 focus-visible:outline-[#43ff57] ${
              pathname === "/contacts" ? "text-[#43ff57]" : "text-white"
            }`}
          >
            Контакты
          </Link>
        </nav>

        {/* Right: Socials, Phone, CTA */}
        <div className="hidden items-center gap-4 lg:flex">
          <div className="flex items-center gap-2">
            <a
              href={SITE_CONFIG.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Написать в Telegram"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#43ff57] hover:text-black"
            >
              <TelegramIcon className="h-4 w-4" />
            </a>
            <a
              href={SITE_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Написать в WhatsApp"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#43ff57] hover:text-black"
            >
              <WhatsAppIcon className="h-4 w-4" />
            </a>
            <a
              href={SITE_CONFIG.maxUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Написать в Max"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#43ff57] hover:text-black"
            >
              <MaxMessengerIcon className="h-4 w-4" />
            </a>
          </div>

          <a
            href={SITE_CONFIG.phoneHref}
            className="text-[16px] font-bold whitespace-nowrap text-white transition hover:text-[#43ff57]"
          >
            {SITE_CONFIG.phoneDisplay}
          </a>

          <button
            type="button"
            onClick={() => openLeadModal({ mode: "callback", source: "Шапка сайта" })}
            className="inline-flex h-10 cursor-pointer items-center justify-center rounded-[6px] bg-[#43ff57] px-4 text-[14px] font-bold text-black transition hover:bg-[#33d744] hover:text-white focus-visible:outline-2 focus-visible:outline-[#43ff57]"
          >
            Оставить заявку
          </button>
        </div>

        {/* Mobile Actions & Burger */}
        <div className="flex items-center gap-2.5 lg:hidden">
          <button
            type="button"
            onClick={() => openLeadModal({ mode: "callback", source: "Шапка (моб.)" })}
            className="inline-flex h-9 cursor-pointer items-center justify-center rounded-[6px] bg-[#43ff57] px-3 text-xs font-bold text-black transition hover:bg-[#33d744]"
          >
            Заявка
          </button>

          <button
            type="button"
            aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[8px] border border-white/15 text-white transition hover:border-[#43ff57] hover:text-[#43ff57]"
          >
            {mobileOpen ? (
              <CloseIcon className="h-6 w-6" />
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#0d0d0d] px-4 pt-4 pb-6 lg:hidden">
          <nav aria-label="Мобильное меню" className="space-y-2">
            <div>
              <button
                type="button"
                onClick={() => setMobileEventsOpen((v) => !v)}
                className="flex w-full cursor-pointer items-center justify-between rounded-[10px] bg-white/5 px-4 py-3 text-left text-[15px] font-bold text-white"
              >
                <span>Мероприятия</span>
                <ChevronDownIcon
                  className={`h-4 w-4 transition-transform ${
                    mobileEventsOpen ? "rotate-180 text-[#43ff57]" : ""
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
                      className={`rounded-[8px] px-3.5 py-2.5 text-sm font-semibold transition ${
                        pathname === item.href
                          ? "bg-white/10 text-[#43ff57]"
                          : "text-white/85 hover:text-[#43ff57]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/blog"
              onClick={() => setMobileOpen(false)}
              className="block rounded-[10px] px-4 py-3 text-[15px] font-bold text-white transition hover:bg-white/5 hover:text-[#43ff57]"
            >
              Блог
            </Link>

            <Link
              href="/contacts"
              onClick={() => setMobileOpen(false)}
              className="block rounded-[10px] px-4 py-3 text-[15px] font-bold text-white transition hover:bg-white/5 hover:text-[#43ff57]"
            >
              Контакты
            </Link>

            <Link
              href="/offer"
              onClick={() => setMobileOpen(false)}
              className="block rounded-[10px] px-4 py-3 text-sm font-semibold text-white/75 transition hover:bg-white/5 hover:text-[#43ff57]"
            >
              Публичная оферта
            </Link>
          </nav>

          <div className="mt-5 border-t border-white/10 pt-5">
            <a
              href={SITE_CONFIG.phoneHref}
              className="block text-xl font-bold text-white hover:text-[#43ff57]"
            >
              {SITE_CONFIG.phoneDisplay}
            </a>
            <p className="mt-1 text-xs text-white/60">{SITE_CONFIG.address}</p>

            <div className="mt-4 flex items-center gap-3">
              <a
                href={SITE_CONFIG.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-[8px] bg-white/10 px-3.5 text-xs font-semibold text-white transition hover:bg-[#43ff57] hover:text-black"
              >
                <TelegramIcon className="h-4 w-4" />
                Telegram
              </a>
              <a
                href={SITE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-[8px] bg-white/10 px-3.5 text-xs font-semibold text-white transition hover:bg-[#43ff57] hover:text-black"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp
              </a>
              <a
                href={SITE_CONFIG.maxUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-[8px] bg-white/10 px-3.5 text-xs font-semibold text-white transition hover:bg-[#43ff57] hover:text-black"
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
