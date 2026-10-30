"use client";

import React from "react";
import Link from "next/link";
import type { EventPageData } from "@/data/events";
import { INCLUDED_FEATURES, LOFT_PRODUCT } from "@/data/home";
import { EVENT_NAV_ITEMS } from "@/data/site";
import { useLeadModal } from "@/components/ModalProvider";
import { PhotoGalleryGrid } from "@/components/PhotoGalleryGrid";
import { ContactsMapSection } from "@/components/ContactsMapSection";
import { ArrowRightIcon, CheckIcon } from "@/components/Icons";

export function EventLandingView({ data }: { data: EventPageData }) {
  const { openLeadModal } = useLeadModal();

  return (
    <main className="bg-canvas text-ink">
      {/* 1. Asymmetric Split Event Hero (Page Theme Lock + Max 4 Hero Text Elements) */}
      <section className="mx-auto max-w-7xl px-4 pt-10 pb-14 sm:px-6 lg:pt-16 lg:pb-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:gap-14">
          <div>
            {data.heroBadge && (
              <p className="text-xs font-bold tracking-[0.14em] text-accent-text uppercase">
                {data.heroBadge}
              </p>
            )}

            <h1 className="mt-4 font-display text-3xl leading-[1.15] font-semibold text-ink sm:text-4xl lg:text-[44px]">
              {data.heroTitle}
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
              {data.heroSubtitle}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() =>
                  openLeadModal({
                    mode: "booking",
                    source: `Страница формата: ${data.navLabel}`,
                  })
                }
                className="btn-primary h-13 px-7 text-sm"
              >
                <span>Рассчитать и забронировать</span>
                <ArrowRightIcon className="h-4 w-4" />
              </button>

              <Link
                href={LOFT_PRODUCT.url}
                className="btn-secondary h-13 px-6 text-sm"
              >
                Тарифы: от 1 500 ₽/час
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-hairline bg-surface">
            <img
              src={data.heroImage}
              alt={data.heroTitle}
              fetchPriority="high"
              className="aspect-[4/3] h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Highlights Strip Under Hero */}
        <div className="mt-10 grid grid-cols-1 gap-4 rounded-2xl border border-hairline bg-surface p-5 sm:p-6 md:grid-cols-3">
          {data.highlights.map((hl) => (
            <div key={hl} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent-text">
                <CheckIcon className="h-3.5 w-3.5" />
              </span>
              <p className="text-sm leading-relaxed font-medium text-ink">
                {hl}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Event Photo Mosaic */}
      <section className="border-t border-hairline py-18 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 max-w-2xl">
            <h2 className="font-display text-2xl font-semibold text-ink sm:text-4xl">
              {data.galleryTitle}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
              Нажмите на любую фотографию, чтобы рассмотреть зонирование и
              световые сценарии зала в полном размере.
            </p>
          </div>

          <PhotoGalleryGrid images={data.gallery} mosaic />
        </div>
      </section>

      {/* 3. Technical Rider & Private Viewing */}
      <section className="border-t border-hairline bg-surface py-18 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <div>
              <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                Включено в базовую ставку аренды
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted sm:text-base">
                100 м² закрытого пространства до 18-25 гостей. Будни (ПН-ЧТ) от
                1 500 ₽/час, выходные (ПТ-ВС) 2 500 ₽/час. Пробковый сбор 0 ₽.
              </p>

              <div className="mt-7">
                <button
                  type="button"
                  onClick={() =>
                    openLeadModal({
                      mode: "callback",
                      source: `Запись на просмотр (${data.navLabel})`,
                    })
                  }
                  className="btn-secondary h-12 px-6 text-sm"
                >
                  Записаться на просмотр зала
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              {INCLUDED_FEATURES.map((feat) => (
                <div
                  key={feat.title}
                  className="flex items-start gap-3.5 rounded-2xl border border-hairline bg-canvas p-4"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface-elevated p-2.5">
                    <img
                      src={feat.icon}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="icon-adaptive h-full w-full object-contain"
                    />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-ink">{feat.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-ink-muted">
                      {feat.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cross-Links to Other Formats */}
          <div className="mt-14 border-t border-hairline pt-8">
            <p className="text-xs font-semibold text-ink-subtle">
              Другие сценарии в пространстве «ШУМНО»
            </p>
            <div className="mt-3.5 flex flex-wrap gap-2">
              {EVENT_NAV_ITEMS.filter(
                (item) => item.href !== `/${data.slug}`
              ).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl border border-hairline bg-canvas px-4 py-2 text-xs font-semibold text-ink transition hover:border-accent-text hover:text-accent-text"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Contacts & Map */}
      <ContactsMapSection />
    </main>
  );
}
