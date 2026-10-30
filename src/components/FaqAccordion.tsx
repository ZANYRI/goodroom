"use client";

import React, { useState } from "react";
import { HOME_FAQ } from "@/data/home";

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-[920px] space-y-3">
      {HOME_FAQ.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={item.question}
            className="overflow-hidden rounded-[12px] border border-black/12 bg-white transition hover:border-black/30"
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-5 text-left sm:px-7"
            >
              <span className="text-[17px] leading-snug font-bold text-black sm:text-[19px]">
                {item.question}
              </span>
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition ${
                  isOpen
                    ? "rotate-45 bg-black text-[#43ff57]"
                    : "bg-[#f3f3f3] text-black"
                }`}
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  className="h-5 w-5"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </button>

            {isOpen && (
              <div className="border-t border-black/8 px-5 pt-4 pb-6 text-[15.5px] leading-relaxed text-black/75 sm:px-7 sm:text-[16.5px]">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
