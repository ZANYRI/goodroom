"use client";

import React, { useState } from "react";
import { formatRuPhone, isValidRuPhone } from "@/lib/phone";
import { CheckCircleIcon } from "@/components/Icons";

export function HeroQuickForm() {
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidRuPhone(phone)) {
      setStatus("error");
      setErrorMsg("Введите полный номер телефона (+7 ...)");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          source: "Главный экран (быстрое бронирование)",
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMsg(data.error || "Ошибка отправки");
        return;
      }

      setStatus("success");
      setPhone("");
    } catch {
      setStatus("error");
      setErrorMsg("Не удалось отправить. Позвоните нам по телефону в шапке.");
    }
  };

  if (status === "success") {
    return (
      <div className="inline-flex items-center gap-3 rounded-[14px] border border-[#43ff57]/40 bg-black/80 px-5 py-4 text-left text-white backdrop-blur-md">
        <CheckCircleIcon className="h-6 w-6 shrink-0 text-[#43ff57]" />
        <div>
          <p className="text-sm font-bold text-[#43ff57]">
            Заявка принята!
          </p>
          <p className="text-xs text-white/80">
            Перезвоним вам в ближайшие минуты для выбора времени.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="ml-2 cursor-pointer text-xs font-semibold text-white/60 underline hover:text-white"
        >
          Ещё
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[520px]">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="hero-phone" className="sr-only">
          Ваш номер телефона
        </label>
        <input
          id="hero-phone"
          type="tel"
          required
          autoComplete="tel"
          value={phone}
          onChange={(e) => {
            setPhone(formatRuPhone(e.target.value));
            if (status === "error") {
              setStatus("idle");
              setErrorMsg("");
            }
          }}
          placeholder="+7 (000) 000-00-00"
          className="h-14 flex-1 rounded-[10px] border border-white/20 bg-white px-5 text-[16px] font-medium text-black placeholder:text-black/45 outline-none transition focus:ring-2 focus:ring-[#43ff57]"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="shimmer-btn h-14 shrink-0 cursor-pointer rounded-[10px] bg-[#43ff57] px-8 text-[16px] font-bold text-black transition hover:bg-[#33d744] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Отправка..." : "Забронировать"}
        </button>
      </div>
      {status === "error" && errorMsg && (
        <p
          role="alert"
          className="mt-2.5 inline-block rounded-[8px] bg-black/80 px-3 py-1.5 text-xs font-semibold text-[#ff8562]"
        >
          {errorMsg}
        </p>
      )}
    </form>
  );
}
