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
import { CheckCircleIcon, CloseIcon } from "@/components/Icons";

export type LeadModalMode = "callback" | "booking";

export interface OpenModalOptions {
  mode?: LeadModalMode;
  source?: string;
  tariffId?: "weekday" | "weekend";
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
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
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
    setHours(edition.minHours);
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
      setErrorMessage("Ошибка соединения. Позвоните нам или напишите в WhatsApp.");
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
          <div className="relative max-h-[92vh] w-full max-w-[520px] overflow-y-auto rounded-[18px] bg-white p-6 text-black shadow-2xl sm:p-8">
            <button
              type="button"
              onClick={closeLeadModal}
              aria-label="Закрыть окно"
              className="absolute top-4 right-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-black/60 transition hover:bg-black/5 hover:text-black focus-visible:outline-2 focus-visible:outline-black"
            >
              <CloseIcon className="h-6 w-6" />
            </button>

            {status === "success" ? (
              <div className="py-6 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#43ff57]/25 text-[#1f9d2f]">
                  <CheckCircleIcon className="h-9 w-9" />
                </div>
                <h3
                  id="lead-modal-title"
                  className="mt-4 text-2xl font-bold text-black"
                >
                  Заявка отправлена!
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-black/75">
                  Менеджер пространства «ШУМНО» свяжется с вами в ближайшее
                  время, подтвердит свободные часы и ответит на все вопросы.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <a
                    href={SITE_CONFIG.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center justify-center rounded-[10px] bg-black px-5 text-sm font-bold text-white transition hover:bg-black/85"
                  >
                    Написать в WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={closeLeadModal}
                    className="inline-flex h-11 cursor-pointer items-center justify-center rounded-[10px] bg-[#43ff57] px-6 text-sm font-bold text-black transition hover:bg-[#33d744]"
                  >
                    Отлично
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="pr-8">
                  <span className="inline-block rounded-full bg-black px-3 py-1 text-[11px] font-bold tracking-wider text-[#43ff57] uppercase">
                    {mode === "booking" ? "Лофт для бронирования" : "Пространство ШУМНО"}
                  </span>
                  <h3
                    id="lead-modal-title"
                    className="mt-3 text-[20px] leading-snug font-bold text-black sm:text-[22px]"
                  >
                    {mode === "booking"
                      ? "Забронировать дату и время в лофте"
                      : "Доверьте нам создание вашего идеального праздника — от уютного пространства до ярких эмоций! ✨"}
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                  {mode === "booking" && (
                    <div className="rounded-[14px] border border-black/10 bg-[#f6f6f6] p-4">
                      <p className="text-xs font-bold tracking-wide text-black/60 uppercase">
                        Выберите день недели
                      </p>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        {LOFT_PRODUCT.editions.map((ed) => {
                          const active = ed.id === tariffId;
                          return (
                            <button
                              key={ed.id}
                              type="button"
                              onClick={() => handleTariffSwitch(ed.id)}
                              className={`cursor-pointer rounded-[10px] border px-3 py-2.5 text-left transition ${
                                active
                                  ? "border-black bg-black text-white"
                                  : "border-black/15 bg-white text-black hover:border-black/40"
                              }`}
                            >
                              <span className="block text-xs font-semibold">
                                {ed.label}
                              </span>
                              <span
                                className={`mt-0.5 block text-base font-bold ${
                                  active ? "text-[#43ff57]" : "text-[#ff8562]"
                                }`}
                              >
                                {ed.priceFormatted}/ч
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      <div className="mt-3.5 flex items-center justify-between gap-3">
                        <div>
                          <span className="block text-xs font-semibold text-black/70">
                            Количество часов
                          </span>
                          <span className="text-[11px] text-black/55">
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
                            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-[8px] border border-black/20 bg-white text-lg font-bold text-black transition hover:bg-black hover:text-white"
                          >
                            −
                          </button>
                          <span className="min-w-[44px] text-center text-base font-bold">
                            {hours} ч
                          </span>
                          <button
                            type="button"
                            onClick={() => setHours((h) => Math.min(24, h + 1))}
                            aria-label="Увеличить часы"
                            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-[8px] border border-black/20 bg-white text-lg font-bold text-black transition hover:bg-black hover:text-white"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between border-t border-black/10 pt-3 text-sm">
                        <span className="text-black/70">Предварительно:</span>
                        <span className="text-lg font-bold text-black">
                          {(selectedEdition.price * hours).toLocaleString("ru-RU")}{" "}
                          ₽
                        </span>
                      </div>
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="lead-name"
                      className="mb-1.5 block text-xs font-bold text-black/75"
                    >
                      Имя
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
                      className="h-12 w-full rounded-[10px] border border-[#c9c9c9] bg-white px-4 text-[15px] text-black outline-none transition focus:border-black"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lead-phone"
                      className="mb-1.5 block text-xs font-bold text-black/75"
                    >
                      Телефон <span className="text-[#ff4a4a]">*</span>
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
                      placeholder="+7 (000) 000-00-00"
                      className="h-12 w-full rounded-[10px] border border-[#c9c9c9] bg-white px-4 text-[15px] text-black outline-none transition focus:border-black"
                    />
                  </div>

                  {mode === "booking" && (
                    <div>
                      <label
                        htmlFor="lead-date"
                        className="mb-1.5 block text-xs font-bold text-black/75"
                      >
                        Желаемая дата
                      </label>
                      <input
                        id="lead-date"
                        type="date"
                        value={date}
                        onChange={(e) => {
                          setDate(e.target.value);
                          clearFeedback();
                        }}
                        className="h-12 w-full rounded-[10px] border border-[#c9c9c9] bg-white px-4 text-[15px] text-black outline-none transition focus:border-black"
                      />
                    </div>
                  )}

                  <label className="flex cursor-pointer items-start gap-2.5 pt-1 text-xs leading-relaxed text-black/70">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => {
                        setAgreed(e.target.checked);
                        clearFeedback();
                      }}
                      className="mt-0.5 h-4 w-4 rounded accent-black"
                    />
                    <span>
                      Я ознакомлен и согласен с{" "}
                      <Link
                        href="/offer"
                        onClick={closeLeadModal}
                        className="font-semibold text-[#ff8562] underline hover:text-black"
                      >
                        условиями оферты
                      </Link>
                    </span>
                  </label>

                  {status === "error" && errorMessage && (
                    <p
                      role="alert"
                      className="rounded-[10px] bg-[#ff4a4a]/10 px-3.5 py-2.5 text-xs font-semibold text-[#d32f2f]"
                    >
                      {errorMessage}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="h-13 w-full cursor-pointer rounded-[10px] bg-[#43ff57] px-6 text-[15px] font-bold text-black transition hover:bg-[#33d744] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "submitting"
                      ? "Отправляем..."
                      : mode === "booking"
                        ? "Забронировать"
                        : "Отправить"}
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
