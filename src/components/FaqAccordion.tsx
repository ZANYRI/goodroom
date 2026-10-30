"use client";

import React, { useState } from "react";
import { HOME_FAQ } from "@/data/home";
import { PlusIcon } from "@/components/Icons";

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="rounded-2xl border border-hairline bg-surface">
      {HOME_FAQ.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={item.question}
            className="border-b border-hairline last:border-b-0"
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-5 text-left transition hover:bg-surface-elevated/55 sm:px-7"
            >
              <span className="font-display text-base leading-snug font-medium text-ink sm:text-lg">
                {item.question}
              </span>
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition duration-200 ${
                  isOpen
                    ? "rotate-45 border-accent-text bg-accent-soft text-accent-text"
                    : "border-hairline bg-surface-elevated text-ink-muted"
                }`}
              >
                <PlusIcon className="h-4 w-4" />
              </span>
            </button>

            {isOpen && (
              <div className="px-5 pb-6 text-sm leading-relaxed text-ink-muted sm:px-7 sm:text-base">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
