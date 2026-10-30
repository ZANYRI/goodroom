"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { LOFT_PRODUCT } from "@/data/home";
import { useLeadModal } from "@/components/ModalProvider";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CloseIcon,
} from "@/components/Icons";

interface LoftCatalogCardProps {
  showDetailsLink?: boolean;
}

export function LoftCatalogCard({
  showDetailsLink = true,
}: LoftCatalogCardProps) {
  const { openLeadModal } = useLeadModal();
  const [tariffId, setTariffId] = useState<"weekday" | "weekend">("weekday");
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const gallery = LOFT_PRODUCT.gallery;
  const activeEdition =
    LOFT_PRODUCT.editions.find((e) => e.id === tariffId) ||
    LOFT_PRODUCT.editions[0];

  const prevSlide = () =>
    setActiveIndex((idx) => (idx - 1 + gallery.length) % gallery.length);
  const nextSlide = () =>
    setActiveIndex((idx) => (idx + 1) % gallery.length);

  useEffect(() => {
    if (!lightboxOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft")
        setActiveIndex((idx) => (idx - 1 + gallery.length) % gallery.length);
      if (e.key === "ArrowRight")
        setActiveIndex((idx) => (idx + 1) % gallery.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxOpen, gallery.length]);

  return (
    <>
      <div className="overflow-hidden rounded-[18px] border border-black/8 bg-white shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_1fr]">
          {/* Left: 9-Photo Interactive Slider */}
          <div className="bg-[#111111] p-3 sm:p-4">
            <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-[12px] bg-black">
              <img
                src={gallery[activeIndex].src}
                alt={gallery[activeIndex].alt}
                onClick={() => setLightboxOpen(true)}
                className="h-full w-full cursor-zoom-in object-cover transition duration-300"
              />

              {/* SALE Badge */}
              <span className="absolute top-3.5 left-3.5 rounded-[6px] bg-[#ff4a4a] px-3 py-1 text-xs font-bold tracking-wider text-white uppercase shadow-md">
                {LOFT_PRODUCT.badge}
              </span>

              {/* Slide Counter */}
              <span className="absolute top-3.5 right-3.5 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-xs">
                {activeIndex + 1} / {gallery.length}
              </span>

              {/* Arrows */}
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Предыдущее фото"
                className="absolute top-1/2 left-3 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-black shadow-md transition hover:bg-[#43ff57]"
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Следующее фото"
                className="absolute top-1/2 right-3 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-black shadow-md transition hover:bg-[#43ff57]"
              >
                <ArrowRightIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {gallery.map((photo, index) => (
                <button
                  key={photo.src}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Показать фото ${index + 1}`}
                  className={`relative h-14 w-18 shrink-0 cursor-pointer overflow-hidden rounded-[8px] border-2 transition ${
                    index === activeIndex
                      ? "border-[#43ff57] opacity-100"
                      : "border-transparent opacity-60 hover:opacity-90"
                  }`}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Specs, Tariff Selector & CTA */}
          <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-2xl font-bold text-black sm:text-[28px]">
                  {LOFT_PRODUCT.title}
                </h3>
                <span className="rounded-full bg-[#43ff57]/20 px-3 py-1 text-xs font-bold text-[#198227]">
                  Пятигорск • 24/7
                </span>
              </div>

              {/* Price Display */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-3xl font-bold text-[#ff8562] sm:text-4xl">
                  {activeEdition.priceFormatted}
                </span>
                <span className="text-lg font-semibold text-black/35 line-through">
                  {activeEdition.oldPriceFormatted}
                </span>
                <span className="text-sm font-semibold text-black/60">
                  / час
                </span>
              </div>
              <p className="mt-1 text-xs font-medium text-black/55">
                {activeEdition.minHoursHint}
              </p>

              {/* Day of Week Selector */}
              <div className="mt-5">
                <p className="text-xs font-bold tracking-wider text-black/60 uppercase">
                  Выберите день недели
                </p>
                <div className="mt-2 grid grid-cols-2 gap-2.5">
                  {LOFT_PRODUCT.editions.map((ed) => {
                    const selected = ed.id === tariffId;
                    return (
                      <button
                        key={ed.id}
                        type="button"
                        onClick={() => setTariffId(ed.id)}
                        className={`cursor-pointer rounded-[10px] border px-3.5 py-2.5 text-left text-sm font-bold transition ${
                          selected
                            ? "border-black bg-black text-white shadow-sm"
                            : "border-black/15 bg-[#f8f8f8] text-black hover:border-black/40"
                        }`}
                      >
                        <span className="block text-xs font-semibold opacity-85">
                          {ed.label}
                        </span>
                        <span
                          className={`mt-0.5 block text-sm font-bold ${
                            selected ? "text-[#43ff57]" : "text-[#ff8562]"
                          }`}
                        >
                          {ed.priceFormatted} / час
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bullet Specs */}
              <ul className="mt-6 space-y-2.5 text-[15px] text-black/85">
                {LOFT_PRODUCT.specs.map((spec) => (
                  <li key={spec} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#43ff57] ring-2 ring-black/80" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 space-y-2 text-sm leading-relaxed text-black/70">
                {LOFT_PRODUCT.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() =>
                  openLeadModal({
                    mode: "booking",
                    tariffId,
                    source: `Карточка лофта (${activeEdition.label})`,
                  })
                }
                className="inline-flex h-12 flex-1 cursor-pointer items-center justify-center rounded-[8px] bg-[#43ff57] px-6 text-[15px] font-bold text-black transition hover:bg-[#33d744] hover:text-white"
              >
                Забронировать
              </button>

              {showDetailsLink && (
                <Link
                  href={LOFT_PRODUCT.url}
                  className="inline-flex h-12 items-center justify-center rounded-[8px] border border-black/20 bg-white px-6 text-[15px] font-bold text-black transition hover:border-black hover:bg-black hover:text-white"
                >
                  Подробнее
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр фотографии лофта"
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightboxOpen(false);
          }}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            aria-label="Закрыть фото"
            className="absolute top-4 right-4 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#43ff57] hover:text-black"
          >
            <CloseIcon className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={prevSlide}
            aria-label="Предыдущее фото"
            className="absolute top-1/2 left-4 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-[#43ff57] hover:text-black"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </button>

          <figure className="max-h-[86vh] max-w-5xl text-center">
            <img
              src={gallery[activeIndex].src}
              alt={gallery[activeIndex].alt}
              className="max-h-[78vh] w-auto rounded-[12px] object-contain shadow-2xl"
            />
            <figcaption className="mt-3 text-sm text-white/80">
              {gallery[activeIndex].alt} ({activeIndex + 1} / {gallery.length})
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Следующее фото"
            className="absolute top-1/2 right-4 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-[#43ff57] hover:text-black"
          >
            <ArrowRightIcon className="h-6 w-6" />
          </button>
        </div>
      )}
    </>
  );
}
