"use client";

import React from "react";
import { SITE_CONFIG } from "@/data/site";
import { useTheme } from "@/lib/theme";
import { useLeadModal } from "@/components/ModalProvider";
import {
  ArrowUpRightIcon,
  MapPinIcon,
  MaxMessengerIcon,
  TelegramIcon,
  WhatsAppIcon,
} from "@/components/Icons";

export function ContactsMapSection() {
  const { openLeadModal } = useLeadModal();
  const { theme } = useTheme();
  const themedMapUrl = `${SITE_CONFIG.yandexMapIframeUrl}&theme=${theme}`;

  return (
    <section
      id="contacts"
      aria-labelledby="contacts-section-title"
      className="border-t border-hairline bg-canvas py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          {/* Left: Architectural Contact Panel */}
          <div className="flex flex-col justify-between rounded-2xl border border-hairline bg-surface p-6 sm:p-9">
            <div>
              <h2
                id="contacts-section-title"
                className="font-display text-2xl font-semibold text-ink sm:text-4xl"
              >
                Контакты и расположение
              </h2>

              <div className="mt-8 space-y-6">
                <div>
                  <span className="block text-xs font-semibold text-ink-subtle">
                    Бронирование и консультация
                  </span>
                  <a
                    href={SITE_CONFIG.phoneHref}
                    className="mt-1 inline-block font-mono text-2xl font-bold text-ink tabular-nums transition hover:text-accent-text sm:text-3xl"
                  >
                    {SITE_CONFIG.phoneDisplay}
                  </a>
                  <div className="mt-1.5">
                    <button
                      type="button"
                      onClick={() =>
                        openLeadModal({
                          mode: "callback",
                          source: "Блок контактов (Заказать звонок)",
                        })
                      }
                      className="cursor-pointer text-sm font-semibold text-accent-text underline underline-offset-4 transition hover:text-ink"
                    >
                      Заказать звонок менеджера
                    </button>
                  </div>
                </div>

                <div>
                  <span className="block text-xs font-semibold text-ink-subtle">
                    Электронная почта
                  </span>
                  <a
                    href={SITE_CONFIG.emailHref}
                    className="mt-1 inline-block text-lg font-semibold text-ink transition hover:text-accent-text"
                  >
                    {SITE_CONFIG.email}
                  </a>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-hairline bg-surface-elevated p-4">
                  <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent-text" />
                  <div>
                    <p className="text-base font-semibold text-ink">
                      {SITE_CONFIG.address}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-ink-muted">
                      Круглосуточно 24/7 по предварительной записи. Бесплатная
                      парковка непосредственно у входа.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-2.5 border-t border-hairline pt-6">
              <a
                href={SITE_CONFIG.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary h-11 px-4 text-xs"
              >
                <TelegramIcon className="h-4 w-4 text-accent-text" />
                <span>Telegram</span>
              </a>
              <a
                href={SITE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary h-11 px-4 text-xs"
              >
                <WhatsAppIcon className="h-4 w-4 text-accent-text" />
                <span>WhatsApp</span>
              </a>
              <a
                href={SITE_CONFIG.maxUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary h-11 px-4 text-xs"
              >
                <MaxMessengerIcon className="h-4 w-4 text-accent-text" />
                <span>Max</span>
              </a>
              <a
                href={SITE_CONFIG.yandexMapsOrgUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary h-11 px-4 text-xs"
              >
                <span>Маршрут</span>
                <ArrowUpRightIcon className="h-4 w-4 text-accent-text" />
              </a>
            </div>
          </div>

          {/* Right: Theme-Aware HTTPS Interactive Yandex Map */}
          <div className="min-h-[380px] w-full overflow-hidden rounded-2xl border border-hairline bg-surface lg:min-h-[460px]">
            <iframe
              key={theme}
              src={themedMapUrl}
              title="Лофт ШУМНО на Яндекс Картах, Пятигорск, ул. Мира 155А"
              className="h-full min-h-[380px] w-full border-0 lg:min-h-[460px]"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
