"use client";

import React, { useState } from "react";
import { formatRuPhone, isValidRuPhone } from "@/lib/phone";
import { CheckCircleIcon } from "@/components/Icons";

export function HeroQuickForm() {
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
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
      setErrorMsg("Не удалось отправить. Позвоните нам по номеру в шапке.");
    }
  };

  if (status === "success") {
    return (
      <div className="inline-flex items-center gap-3 rounded-2xl border border-hairline-strong bg-surface px-5 py-4 text-left">
        <CheckCircleIcon className="h-6 w-6 shrink-0 text-accent-text" />
        <div>
          <p className="text-sm font-bold text-ink">Заявка принята</p>
          <p className="text-xs text-ink-muted">
            Перезвоним в ближайшие минуты и проверим свободные слоты.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="ml-2 cursor-pointer text-xs font-semibold text-accent-text underline underline-offset-4 hover:text-ink"
        >
          Новая заявка
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[540px] rounded-2xl border border-hairline bg-surface p-3 sm:p-3.5"
    >
      <label
        htmlFor="hero-phone"
        className="mb-2 block px-1 text-xs font-semibold text-ink-muted"
      >
        Узнать свободные часы по номеру телефона
      </label>
      <div className="flex flex-col gap-2.5 sm:flex-row">
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
          placeholder="+7 (900) 000-00-00"
          className="h-12 flex-1 rounded-xl border border-hairline-strong bg-surface-elevated px-4 font-mono text-sm font-semibold text-ink tabular-nums placeholder:text-ink-subtle outline-none transition focus:border-accent-text focus:ring-2 focus:ring-accent/30"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-primary h-12 shrink-0 px-6 text-sm disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Отправка..." : "Забронировать"}
        </button>
      </div>
      {status === "error" && errorMsg && (
        <p
          role="alert"
          className="mt-2.5 rounded-xl border px-3 py-2 text-xs font-semibold"
          style={{
            backgroundColor: "var(--danger-bg)",
            borderColor: "var(--danger-border)",
            color: "var(--danger-text)",
          }}
        >
          {errorMsg}
        </p>
      )}
    </form>
  );
}
