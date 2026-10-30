"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { LOFT_PRODUCT } from "@/data/home";
import { useLeadModal } from "@/components/ModalProvider";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  CloseIcon,
  MinusIcon,
  PlusIcon,
} from "@/components/Icons";

interface LoftCatalogCardProps {
  showDetailsLink?: boolean;
}

export function LoftCatalogCard({
  showDetailsLink = true,
}: LoftCatalogCardProps) {
  const { openLeadModal } = useLeadModal();
  const [tariffId, setTariffId] = useState<"weekday" | "weekend">("weekday");
  const [hours, setHours] = useState(3);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const gallery = LOFT_PRODUCT.gallery;
  const activeEdition =
    LOFT_PRODUCT.editions.find((e) => e.id === tariffId) ||
    LOFT_PRODUCT.editions[0];

  const handleTariffSelect = (nextId: "weekday" | "weekend") => {
    setTariffId(nextId);
    const ed = LOFT_PRODUCT.editions.find((e) => e.id === nextId);
    if (ed && hours < ed.minHours) {
      setHours(ed.minHours);
    }
  };

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

  const estimatedTotal = activeEdition.price * hours;

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-hairline bg-surface">
        <div className="grid grid-cols-1 lg:grid-cols-[1.12fr_0.88fr]">
          {/* Left: Clean Unobstructed Gallery Stage + Filmstrip Controls Below */}
          <div className="border-b border-hairline p-4 sm:p-6 lg:border-r lg:border-b-0">
            <div className="overflow-hidden rounded-xl bg-surface-elevated">
              <img
                src={gallery[activeIndex].src}
                alt={gallery[activeIndex].alt}
                onClick={() => setLightboxOpen(true)}
                className="aspect-[4/3] h-full w-full cursor-zoom-in object-cover transition duration-300"
              />
            </div>

            {/* Caption & Controls OUTSIDE the image (no overlaid pills) */}
            <div className="mt-3.5 flex items-center justify-between gap-3">
              <p className="line-clamp-1 text-xs text-ink-muted">
                {gallery[activeIndex].alt}
              </p>

              <div className="flex shrink-0 items-center gap-1.5">
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Предыдущее фото"
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-hairline-strong bg-surface-elevated text-ink transition hover:border-accent-text hover:text-accent-text"
                >
                  <ArrowLeftIcon className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Следующее фото"
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-hairline-strong bg-surface-elevated text-ink transition hover:border-accent-text hover:text-accent-text"
                >
                  <ArrowRightIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Filmstrip Thumbnails */}
            <div className="mt-3.5 grid grid-cols-5 gap-2 sm:grid-cols-9">
              {gallery.map((photo, index) => (
                <button
                  key={photo.src}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Фото зала ${index + 1}`}
                  className={`aspect-[4/3] cursor-pointer overflow-hidden rounded-lg border-2 transition ${
                    index === activeIndex
                      ? "border-accent opacity-100"
                      : "border-transparent opacity-55 hover:opacity-90"
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

          {/* Right: Interactive Tariff & Budget Configurator */}
          <div className="flex flex-col justify-between p-6 sm:p-8">
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-2xl font-semibold text-ink">
                  {LOFT_PRODUCT.title}
                </h3>
                <span className="rounded-lg bg-accent-soft px-2.5 py-1 text-xs font-bold text-accent-text">
                  100 м² · 24/7
                </span>
              </div>

              {/* Rate Display */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-mono text-3xl font-bold text-accent-text tabular-nums sm:text-4xl">
                  {activeEdition.priceFormatted}
                </span>
                <span className="font-mono text-base font-medium text-ink-subtle line-through tabular-nums">
                  {activeEdition.oldPriceFormatted}
                </span>
                <span className="text-sm font-medium text-ink-muted">
                  за 1 час аренды
                </span>
              </div>

              {/* Day Switcher */}
              <div className="mt-5 grid grid-cols-2 gap-2.5">
                {LOFT_PRODUCT.editions.map((ed) => {
                  const selected = ed.id === tariffId;
                  return (
                    <button
                      key={ed.id}
                      type="button"
                      onClick={() => handleTariffSelect(ed.id)}
                      className={`cursor-pointer rounded-xl border p-3 text-left transition ${
                        selected
                          ? "border-accent-text bg-accent-soft text-ink"
                          : "border-hairline bg-surface-elevated text-ink-muted hover:border-hairline-strong hover:text-ink"
                      }`}
                    >
                      <span className="block text-xs font-semibold">
                        {ed.label}
                      </span>
                      <span className="mt-1 block font-mono text-sm font-bold text-accent-text tabular-nums">
                        {ed.priceFormatted} / ч
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Live Hours Calculator */}
              <div className="mt-4 rounded-xl border border-hairline bg-surface-elevated p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <span className="block text-xs font-semibold text-ink">
                      Время мероприятия
                    </span>
                    <span className="text-xs text-ink-muted">
                      {activeEdition.minHoursHint}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setHours((h) =>
                          Math.max(activeEdition.minHours, h - 1)
                        )
                      }
                      aria-label="Уменьшить количество часов"
                      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-hairline-strong bg-surface text-ink transition hover:border-accent-text hover:text-accent-text"
                    >
                      <MinusIcon className="h-4 w-4" />
                    </button>
                    <span className="min-w-[48px] text-center font-mono text-sm font-bold text-ink tabular-nums">
                      {hours} ч
                    </span>
                    <button
                      type="button"
                      onClick={() => setHours((h) => Math.min(24, h + 1))}
                      aria-label="Увеличить количество часов"
                      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-hairline-strong bg-surface text-ink transition hover:border-accent-text hover:text-accent-text"
                    >
                      <PlusIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-hairline pt-3">
                  <span className="text-xs font-semibold text-ink-muted">
                    Итого за весь зал (+30 мин на подготовку):
                  </span>
                  <span className="font-mono text-lg font-bold text-ink tabular-nums">
                    {estimatedTotal.toLocaleString("ru-RU")} ₽
                  </span>
                </div>
              </div>

              {/* Spatial Specs */}
              <ul className="mt-5 space-y-2 text-sm text-ink-muted">
                {LOFT_PRODUCT.specs.map((spec) => (
                  <li key={spec} className="flex items-start gap-2.5">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent-text" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Row */}
            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <button
                type="button"
                onClick={() =>
                  openLeadModal({
                    mode: "booking",
                    tariffId,
                    hours,
                    source: `Конфигуратор лофта (${activeEdition.label}, ${hours} ч)`,
                  })
                }
                className="btn-primary h-12 flex-1 px-5 text-sm"
              >
                Рассчитать и забронировать
              </button>

              {showDetailsLink && (
                <Link
                  href={LOFT_PRODUCT.url}
                  className="btn-secondary h-12 px-5 text-sm"
                >
                  Оснащение залов
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Keyboard-Accessible Lightbox */}
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
            className="absolute top-4 right-4 flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-accent hover:text-accent-ink"
          >
            <CloseIcon className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={prevSlide}
            aria-label="Предыдущее фото"
            className="absolute top-1/2 left-4 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-xl bg-white/15 text-white transition hover:bg-accent hover:text-accent-ink"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>

          <figure className="max-h-[86vh] max-w-5xl text-center">
            <img
              src={gallery[activeIndex].src}
              alt={gallery[activeIndex].alt}
              className="max-h-[78vh] w-auto rounded-2xl object-contain shadow-2xl"
            />
            <figcaption className="mt-3 text-sm text-white/80">
              {gallery[activeIndex].alt}
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Следующее фото"
            className="absolute top-1/2 right-4 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-xl bg-white/15 text-white transition hover:bg-accent hover:text-accent-ink"
          >
            <ArrowRightIcon className="h-5 w-5" />
          </button>
        </div>
      )}
    </>
  );
}
