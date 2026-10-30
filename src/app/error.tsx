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
    <main className="flex min-h-[70vh] flex-col items-center justify-center bg-black px-4 py-20 text-center text-white">
      <span className="inline-block rounded-full border border-[#ff8562]/40 bg-white/5 px-4 py-1 text-xs font-bold tracking-widest text-[#ff8562] uppercase">
        Что-то пошло не так
      </span>
      <h1 className="mt-5 text-3xl font-bold text-white sm:text-5xl">
        Произошла ошибка загрузки
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70 sm:text-base">
        Попробуйте обновить страницу или вернуться на главную страницу
        пространства «ШУМНО».
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex h-12 cursor-pointer items-center justify-center rounded-[10px] bg-[#43ff57] px-7 text-[15px] font-bold text-black transition hover:bg-[#33d744] hover:text-white"
        >
          Попробовать снова
        </button>
        <Link
          href="/"
          className="inline-flex h-12 items-center justify-center rounded-[10px] border border-white/20 bg-white/10 px-6 text-[15px] font-bold text-white transition hover:border-[#43ff57] hover:text-[#43ff57]"
        >
          На главную
        </Link>
      </div>
    </main>
  );
}
