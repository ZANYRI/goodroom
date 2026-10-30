"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowUpIcon } from "@/components/Icons";

export function ScrollToTop() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show button once the top 560px sentinel scrolls above the viewport
        setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        ref={sentinelRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 h-[560px] w-px"
      />
      {visible && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Вернуться наверх"
          className="surface-glass fixed bottom-5 left-5 z-30 flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-hairline-strong text-ink shadow-lg transition hover:border-accent-text hover:text-accent-text active:scale-95 sm:bottom-6 sm:left-6"
        >
          <ArrowUpIcon className="h-5 w-5" />
        </button>
      )}
    </>
  );
}
