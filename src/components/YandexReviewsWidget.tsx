"use client";

import React, { useEffect, useState } from "react";
import {
  FALLBACK_YANDEX_REVIEWS,
  type YandexReviewsPayload,
} from "@/lib/yandex-reviews";
import { ArrowUpRightIcon, StarFilledIcon } from "@/components/Icons";

export function YandexReviewsWidget() {
  const [data, setData] = useState<YandexReviewsPayload>(
    FALLBACK_YANDEX_REVIEWS
  );
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let active = true;
    fetch("/api/reviews")
      .then((res) => (res.ok ? res.json() : null))
      .then((json: { ok?: boolean; data?: YandexReviewsPayload } | null) => {
        if (active && json?.ok && json.data?.reviews?.length) {
          setData(json.data);
        }
      })
      .catch(() => {
        // Keep verified fallback snapshot
      });

    return () => {
      active = false;
    };
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-hairline-strong bg-surface shadow-xl">
      {/* Top Header: Venue Name, Yandex Maps Badge & Aggregate Rating */}
      <div className="border-b border-hairline p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <a
            href={data.orgUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display text-lg font-semibold text-ink transition hover:text-accent-text"
          >
            {data.orgName}
          </a>

          <a
            href={data.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-lg border border-hairline bg-surface-elevated px-2.5 py-1 text-xs font-semibold text-ink-muted transition hover:border-accent-text hover:text-accent-text"
          >
            <span>Яндекс Карты</span>
            <ArrowUpRightIcon className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4">
          <span className="font-display text-4xl leading-none font-semibold text-ink tabular-nums sm:text-5xl">
            {data.rating}
          </span>

          <div>
            <div
              className="flex items-center gap-1 text-accent-text"
              aria-label={`Рейтинг ${data.rating} из 5`}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <StarFilledIcon key={i} className="h-4 w-4" />
              ))}
            </div>
            <a
              href={data.reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block text-xs font-semibold text-ink-muted transition hover:text-accent-text"
            >
              {data.summaryText}
            </a>
          </div>
        </div>

        {/* Leave Review Action Bar (themed replacement for Yandex's blue bar) */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-hairline bg-surface-elevated px-4 py-3">
          <span className="text-xs font-semibold text-ink sm:text-sm">
            Были у нас на празднике? Поставьте оценку
          </span>
          <a
            href={data.addReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary h-9 px-4 text-xs"
          >
            Оставить отзыв
          </a>
        </div>
      </div>

      {/* Scrollable Feed of Verified Guest Reviews */}
      <div className="reviews-scroll max-h-[430px] divide-y divide-hairline overflow-y-auto px-5 sm:px-6">
        {data.reviews.map((review) => {
          const isLong = review.text.length > 210;
          const isExpanded = Boolean(expandedIds[review.id]);
          const displayedText =
            isLong && !isExpanded
              ? `${review.text.slice(0, 210).trimEnd()}...`
              : review.text;

          return (
            <article key={review.id} className="py-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent-text/25 bg-accent-soft font-mono text-xs font-bold text-accent-text"
                  >
                    {review.initials}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-ink">
                      {review.author}
                    </p>
                    <p className="text-xs text-ink-subtle">{review.date}</p>
                  </div>
                </div>

                <div
                  className="flex items-center gap-0.5 text-accent-text"
                  aria-label={`${review.stars} из 5`}
                >
                  {Array.from({ length: review.stars }).map((_, sIdx) => (
                    <StarFilledIcon key={sIdx} className="h-3.5 w-3.5" />
                  ))}
                </div>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {displayedText}
              </p>

              {isLong && (
                <button
                  type="button"
                  onClick={() => toggleExpand(review.id)}
                  className="mt-1.5 cursor-pointer text-xs font-bold text-accent-text transition hover:text-ink"
                >
                  {isExpanded ? "Свернуть" : "Читать полностью"}
                </button>
              )}
            </article>
          );
        })}
      </div>

      {/* Footer Link to Full Yandex Maps Profile */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-hairline bg-surface-elevated/60 px-5 py-3.5 text-xs sm:px-6">
        <a
          href={data.reviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-bold text-accent-text transition hover:text-ink"
        >
          <span>Больше отзывов на Яндекс Картах</span>
          <ArrowUpRightIcon className="h-3.5 w-3.5" />
        </a>
        <a
          href={data.orgUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-ink-muted transition hover:text-ink"
        >
          Шумно на карте Пятигорска
        </a>
      </div>
    </div>
  );
}
