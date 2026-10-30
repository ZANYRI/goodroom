"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { LOFT_PRODUCT } from "@/data/home";
import { SITE_CONFIG } from "@/data/site";
import { formatRuPhone, isValidRuPhone } from "@/lib/phone";
import {
  CheckCircleIcon,
  CloseIcon,
  MinusIcon,
  PlusIcon,
} from "@/components/Icons";

export type LeadModalMode = "callback" | "booking";

export interface OpenModalOptions {
  mode?: LeadModalMode;
  source?: string;
  tariffId?: "weekday" | "weekend";
  hours?: number;
}

interface ModalContextValue {
  openLeadModal: (opts?: OpenModalOptions) => void;
  closeLeadModal: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function useLeadModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error("useLeadModal must be used inside ModalProvider");
  }
  return ctx;
}

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<LeadModalMode>("callback");
  const [source, setSource] = useState("Оставить заявку");
  const [tariffId, setTariffId] = useState<"weekday" | "weekend">("weekday");
  const [hours, setHours] = useState(3);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [agreed, setAgreed] = useState(true);
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const firstInputRef = useRef<HTMLInputElement>(null);

  const selectedEdition =
    LOFT_PRODUCT.editions.find((e) => e.id === tariffId) ||
    LOFT_PRODUCT.editions[0];

  const openLeadModal = useCallback((opts?: OpenModalOptions) => {
    const nextMode = opts?.mode || "callback";
    const nextTariff = opts?.tariffId || "weekday";
    const edition =
      LOFT_PRODUCT.editions.find((e) => e.id === nextTariff) ||
      LOFT_PRODUCT.editions[0];

    setMode(nextMode);
    setSource(
      opts?.source ||
        (nextMode === "booking" ? "Бронирование лофта" : "Оставить заявку")
    );
    setTariffId(nextTariff);
    setHours(
      opts?.hours && opts.hours >= edition.minHours
        ? opts.hours
        : edition.minHours
    );
    setStatus("idle");
    setErrorMessage("");
    setIsOpen(true);
  }, []);

  const closeLeadModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      firstInputRef.current?.focus();
    }, 60);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLeadModal();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, closeLeadModal]);

  const handleTariffSwitch = (id: "weekday" | "weekend") => {
    setTariffId(id);
    const ed = LOFT_PRODUCT.editions.find((e) => e.id === id);
    if (ed && hours < ed.minHours) {
      setHours(ed.minHours);
    }
  };

  const clearFeedback = () => {
    if (status === "error" || status === "success") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidRuPhone(phone)) {
      setStatus("error");
      setErrorMessage("Введите полный номер телефона (+7 ...)");
      return;
    }
    if (!agreed) {
      setStatus("error");
      setErrorMessage("Необходимо согласие с условиями публичной оферты");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const payload =
        mode === "booking"
          ? {
              name: name.trim() || "Гость",
              phone,
              date,
              tariff: `${selectedEdition.label} (${selectedEdition.priceFormatted}/ч)`,
              hours,
              estimatedTotal: selectedEdition.price * hours,
              source,
            }
          : {
              name: name.trim() || "Гость",
              phone,
              date,
              source,
            };

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Не удалось отправить заявку");
        return;
      }

      setStatus("success");
      setName("");
      setPhone("");
      setDate("");
    } catch {
      setStatus("error");
      setErrorMessage(
        "Ошибка соединения. Позвоните нам или напишите в WhatsApp."
      );
    }
  };

  return (
    <ModalContext.Provider value={{ openLeadModal, closeLeadModal }}>
      {children}

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lead-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLeadModal();
          }}
        >
          <div className="relative max-h-[92vh] w-full max-w-[520px] overflow-y-auto rounded-2xl border border-hairline-strong bg-surface p-6 text-ink shadow-2xl sm:p-8">
            <button
              type="button"
              onClick={closeLeadModal}
              aria-label="Закрыть окно"
              className="absolute top-4 right-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-hairline bg-surface-elevated text-ink-muted transition hover:border-hairline-strong hover:text-ink focus-visible:outline-2 focus-visible:outline-accent"
            >
              <CloseIcon className="h-5 w-5" />
            </button>

            {status === "success" ? (
              <div className="py-6 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-soft text-accent-text">
                  <CheckCircleIcon className="h-9 w-9" />
                </div>
                <h3
                  id="lead-modal-title"
                  className="mt-4 font-display text-xl font-semibold text-ink sm:text-2xl"
                >
                  Заявка отправлена
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                  Менеджер пространства «ШУМНО» свяжется с вами в ближайшее
                  время, подтвердит свободные часы и ответит на все вопросы.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <a
                    href={SITE_CONFIG.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary h-11 px-5 text-sm"
                  >
                    Написать в WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={closeLeadModal}
                    className="btn-primary h-11 px-6 text-sm"
                  >
                    Готово
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="pr-10">
                  <p className="text-xs font-semibold text-accent-text">
                    {mode === "booking"
                      ? "Проверка доступности и расчет"
                      : "Связь с менеджером площадки"}
                  </p>
                  <h3
                    id="lead-modal-title"
                    className="mt-2 font-display text-lg leading-snug font-semibold text-ink sm:text-xl"
                  >
                    {mode === "booking"
                      ? "Свободна ли ваша дата в «ШУМНО»?"
                      : "Запись на просмотр и консультация"}
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                  {mode === "booking" && (
                    <div className="rounded-2xl border border-hairline bg-surface-elevated p-4">
                      <p className="text-xs font-semibold text-ink-muted">
                        Тарифный день
                      </p>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        {LOFT_PRODUCT.editions.map((ed) => {
                          const active = ed.id === tariffId;
                          return (
                            <button
                              key={ed.id}
                              type="button"
                              onClick={() => handleTariffSwitch(ed.id)}
                              className={`cursor-pointer rounded-xl border px-3 py-2.5 text-left transition ${
                                active
                                  ? "border-accent-text bg-accent-soft text-ink"
                                  : "border-hairline bg-surface text-ink-muted hover:border-hairline-strong hover:text-ink"
                              }`}
                            >
                              <span className="block text-xs font-semibold">
                                {ed.label}
                              </span>
                              <span className="mt-0.5 block font-mono text-sm font-bold text-accent-text tabular-nums">
                                {ed.priceFormatted}/ч
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-3">
                        <div>
                          <span className="block text-xs font-semibold text-ink">
                            Продолжительность
                          </span>
                          <span className="text-xs text-ink-muted">
                            {selectedEdition.minHoursHint}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              setHours((h) =>
                                Math.max(selectedEdition.minHours, h - 1)
                              )
                            }
                            aria-label="Уменьшить часы"
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
                            aria-label="Увеличить часы"
                            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-hairline-strong bg-surface text-ink transition hover:border-accent-text hover:text-accent-text"
                          >
                            <PlusIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-3.5 flex items-center justify-between border-t border-hairline pt-3 text-sm">
                        <span className="text-ink-muted">
                          Предварительный расчет:
                        </span>
                        <span className="font-mono text-lg font-bold text-accent-text tabular-nums">
                          {(selectedEdition.price * hours).toLocaleString(
                            "ru-RU"
                          )}{" "}
                          ₽
                        </span>
                      </div>
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="lead-name"
                      className="mb-1.5 block text-xs font-semibold text-ink-muted"
                    >
                      Ваше имя
                    </label>
                    <input
                      ref={firstInputRef}
                      id="lead-name"
                      type="text"
                      autoComplete="name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        clearFeedback();
                      }}
                      placeholder="Как к вам обращаться"
                      className="h-12 w-full rounded-xl border border-hairline-strong bg-surface-elevated px-4 text-sm text-ink placeholder:text-ink-subtle outline-none transition focus:border-accent-text focus:ring-2 focus:ring-accent/30"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lead-phone"
                      className="mb-1.5 block text-xs font-semibold text-ink-muted"
                    >
                      Номер телефона *
                    </label>
                    <input
                      id="lead-phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(formatRuPhone(e.target.value));
                        clearFeedback();
                      }}
                      placeholder="+7 (900) 000-00-00"
                      className="h-12 w-full rounded-xl border border-hairline-strong bg-surface-elevated px-4 font-mono text-sm font-semibold text-ink tabular-nums placeholder:text-ink-subtle outline-none transition focus:border-accent-text focus:ring-2 focus:ring-accent/30"
                    />
                  </div>

                  {mode === "booking" && (
                    <div>
                      <label
                        htmlFor="lead-date"
                        className="mb-1.5 block text-xs font-semibold text-ink-muted"
                      >
                        Желаемая дата события
                      </label>
                      <input
                        id="lead-date"
                        type="date"
                        value={date}
                        onChange={(e) => {
                          setDate(e.target.value);
                          clearFeedback();
                        }}
                        className="h-12 w-full rounded-xl border border-hairline-strong bg-surface-elevated px-4 font-mono text-sm text-ink outline-none transition focus:border-accent-text focus:ring-2 focus:ring-accent/30"
                      />
                    </div>
                  )}

                  <label className="flex cursor-pointer items-start gap-2.5 pt-1 text-xs leading-relaxed text-ink-muted">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => {
                        setAgreed(e.target.checked);
                        clearFeedback();
                      }}
                      className="mt-0.5 h-4 w-4 rounded accent-[#3be85e]"
                    />
                    <span>
                      Я ознакомлен и согласен с{" "}
                      <Link
                        href="/offer"
                        onClick={closeLeadModal}
                        className="font-semibold text-accent-text underline underline-offset-4 hover:text-ink"
                      >
                        условиями публичной оферты
                      </Link>
                    </span>
                  </label>

                  {status === "error" && errorMessage && (
                    <p
                      role="alert"
                      className="rounded-xl border px-3.5 py-2.5 text-xs font-semibold"
                      style={{
                        backgroundColor: "var(--danger-bg)",
                        borderColor: "var(--danger-border)",
                        color: "var(--danger-text)",
                      }}
                    >
                      {errorMessage}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="btn-primary h-12 w-full px-6 text-sm disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "submitting"
                      ? "Отправляем..."
                      : mode === "booking"
                        ? "Подтвердить запрос даты"
                        : "Отправить запрос"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
}
