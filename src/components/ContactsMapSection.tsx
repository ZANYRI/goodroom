"use client";

import React from "react";
import { SITE_CONFIG } from "@/data/site";
import { useLeadModal } from "@/components/ModalProvider";
import {
  MaxMessengerIcon,
  TelegramIcon,
  WhatsAppIcon,
} from "@/components/Icons";

export function ContactsMapSection() {
  const { openLeadModal } = useLeadModal();

  return (
    <section
      id="contacts"
      aria-labelledby="contacts-section-title"
      className="bg-black py-16 text-white sm:py-22"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
          {/* Left: Contact Info */}
          <div>
            <h2
              id="contacts-section-title"
              className="text-3xl font-bold text-white sm:text-[40px]"
            >
              Контакты
            </h2>

            <div className="mt-8 space-y-6">
              <div>
                <a
                  href={SITE_CONFIG.phoneHref}
                  className="text-2xl font-bold text-white transition hover:text-[#43ff57] sm:text-[28px]"
                >
                  {SITE_CONFIG.phoneDisplay}
                </a>
                <div className="mt-1.5">
                  <button
                    type="button"
                    onClick={() =>
                      openLeadModal({
                        mode: "callback",
                        source: "Блок контактов (Обратный звонок)",
                      })
                    }
                    className="cursor-pointer text-sm font-semibold text-[#ff8562] underline underline-offset-4 transition hover:text-[#43ff57]"
                  >
                    Обратный звонок
                  </button>
                </div>
              </div>

              <div>
                <a
                  href={SITE_CONFIG.emailHref}
                  className="text-xl font-semibold text-white transition hover:text-[#43ff57] sm:text-2xl"
                >
                  {SITE_CONFIG.email}
                </a>
                <div className="mt-1">
                  <a
                    href={SITE_CONFIG.emailHref}
                    className="text-sm font-medium text-[#ff8562] underline underline-offset-4 transition hover:text-[#43ff57]"
                  >
                    Написать на почту
                  </a>
                </div>
              </div>

              <div>
                <p className="text-lg leading-snug font-medium text-white/90 sm:text-[22px]">
                  {SITE_CONFIG.address}
                </p>
                <p className="mt-1.5 text-sm text-white/55">
                  Работаем ежедневно 24/7 по предварительной записи • Бесплатная
                  парковка у входа
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={SITE_CONFIG.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-[10px] bg-white/10 px-4 text-sm font-bold text-white transition hover:bg-[#43ff57] hover:text-black"
                >
                  <TelegramIcon className="h-4 w-4" />
                  Telegram
                </a>
                <a
                  href={SITE_CONFIG.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-[10px] bg-white/10 px-4 text-sm font-bold text-white transition hover:bg-[#43ff57] hover:text-black"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  WhatsApp
                </a>
                <a
                  href={SITE_CONFIG.maxUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-[10px] bg-white/10 px-4 text-sm font-bold text-white transition hover:bg-[#43ff57] hover:text-black"
                >
                  <MaxMessengerIcon className="h-4 w-4" />
                  Max
                </a>
              </div>
            </div>
          </div>

          {/* Right: HTTPS Interactive Yandex Map */}
          <div className="h-[380px] w-full overflow-hidden rounded-[16px] border border-white/10 bg-[#1a1a1a] shadow-2xl sm:h-[440px]">
            <iframe
              src={SITE_CONFIG.yandexMapIframeUrl}
              title="Лофт ШУМНО на Яндекс Картах — Пятигорск, ул. Мира 155А"
              className="h-full w-full border-0"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
