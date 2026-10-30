"use client";

import React, { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[GoodRoom Error]", error);
  }, [error]);

  return (
    <main className="flex min-h-[70dvh] flex-col items-center justify-center bg-canvas px-4 py-20 text-center text-ink">
      <p className="font-mono text-xs font-bold tracking-[0.14em] text-accent-text uppercase">
        Сбой загрузки
      </p>
      <h1 className="mt-4 font-display text-2xl font-semibold text-ink sm:text-4xl">
        Не удалось загрузить страницу
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-muted sm:text-base">
        Обновите страницу или вернитесь на главную страницу пространства
        «ШУМНО».
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="btn-primary h-12 px-7 text-sm"
        >
          Попробовать снова
        </button>
        <Link href="/" className="btn-secondary h-12 px-6 text-sm">
          На главную
        </Link>
      </div>
    </main>
  );
}
