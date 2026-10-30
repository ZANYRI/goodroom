"use client";

import React from "react";
import Link from "next/link";
import type { EventPageData } from "@/data/events";
import { INCLUDED_FEATURES, LOFT_PRODUCT } from "@/data/home";
import { EVENT_NAV_ITEMS } from "@/data/site";
import { useLeadModal } from "@/components/ModalProvider";
import { PhotoGalleryGrid } from "@/components/PhotoGalleryGrid";
import { ContactsMapSection } from "@/components/ContactsMapSection";

export function EventLandingView({ data }: { data: EventPageData }) {
  const { openLeadModal } = useLeadModal();

  return (
    <main>
      {/* 1. Event Hero Section */}
      <section className="relative overflow-hidden bg-black py-20 text-white sm:py-28 lg:py-32">
        <img
          src={data.heroImage}
          alt={data.heroTitle}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-black/50" />

        <div className="relative z-10 mx-auto max-w-[1100px] px-4 text-center sm:px-6">
          {data.heroBadge && (
            <span className="inline-block rounded-full border border-[#43ff57]/40 bg-black/70 px-4 py-1.5 text-xs font-bold tracking-wider text-[#43ff57] uppercase backdrop-blur-xs">
              {data.heroBadge}
            </span>
          )}

          <h1 className="mx-auto mt-5 max-w-4xl text-3xl leading-[1.18] font-bold text-white sm:text-5xl lg:text-[54px]">
            {data.heroTitle}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-xl">
            {data.heroSubtitle}
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
            <button
              type="button"
              onClick={() =>
                openLeadModal({
                  mode: "booking",
                  source: `Страница: ${data.navLabel}`,
                })
              }
              className="shimmer-btn inline-flex h-14 w-full cursor-pointer items-center justify-center rounded-[10px] bg-[#43ff57] px-9 text-[16px] font-bold text-black transition hover:bg-[#33d744] hover:text-white sm:w-auto"
            >
              Забронировать
            </button>

            <Link
              href={LOFT_PRODUCT.url}
              className="inline-flex h-14 w-full items-center justify-center rounded-[10px] border border-white/25 bg-white/10 px-7 text-[15px] font-bold text-white backdrop-blur-xs transition hover:border-[#43ff57] hover:text-[#43ff57] sm:w-auto"
            >
              Цены: от 1 500 ₽/час
            </Link>
          </div>

          {/* Highlights Pills */}
          <div className="mx-auto mt-11 grid max-w-4xl grid-cols-1 gap-3 text-left sm:grid-cols-3">
            {data.highlights.map((hl) => (
              <div
                key={hl}
                className="flex items-start gap-2.5 rounded-[12px] border border-white/12 bg-black/65 px-4 py-3.5 text-xs leading-relaxed text-white/90 backdrop-blur-xs sm:text-sm"
              >
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#43ff57]" />
                <span>{hl}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Event Gallery */}
      <section className="bg-white py-16 sm:py-22">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <div className="mb-10 text-center sm:mb-14">
            <h2 className="text-3xl font-bold text-black sm:text-[42px]">
              {data.galleryTitle}
            </h2>
          </div>

          <PhotoGalleryGrid images={data.gallery} />
        </div>
      </section>

      {/* 3. What's Included Strip */}
      <section className="bg-[#f3f3f3] py-16 sm:py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-black sm:text-4xl">
              Всё включено в стоимость аренды
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-black/70 sm:text-base">
              100 м² стильного пространства до 18 гостей • Будни от 1 500 ₽/ч •
              Выходные (ПТ–ВС) 2 500 ₽/ч
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {INCLUDED_FEATURES.map((feat) => (
              <div
                key={feat.title}
                className="flex flex-col items-center rounded-[14px] bg-white p-5 text-center shadow-xs"
              >
                <img
                  src={feat.icon}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="h-11 w-11 object-contain"
                />
                <span className="mt-3.5 text-xs font-bold text-black sm:text-sm">
                  {feat.title}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() =>
                openLeadModal({
                  mode: "callback",
                  source: `Запись на просмотр (${data.navLabel})`,
                })
              }
              className="inline-flex h-13 cursor-pointer items-center justify-center rounded-[10px] bg-black px-8 text-[15px] font-bold text-[#43ff57] transition hover:bg-[#43ff57] hover:text-black"
            >
              Записаться на бесплатный просмотр лофта
            </button>
          </div>

          {/* Other Event Formats Cross-links */}
          <div className="mt-12 border-t border-black/10 pt-8 text-center">
            <p className="text-xs font-bold tracking-wider text-black/50 uppercase">
              Другие форматы мероприятий в «ШУМНО»
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {EVENT_NAV_ITEMS.filter((item) => item.href !== `/${data.slug}`).map(
                (item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-full border border-black/15 bg-white px-4 py-2 text-xs font-bold text-black transition hover:border-black hover:bg-black hover:text-[#43ff57]"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Contacts & Map */}
      <ContactsMapSection />
    </main>
  );
}
