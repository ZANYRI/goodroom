"use client";

import React, { useState } from "react";
import { SITE_CONFIG } from "@/data/site";
import {
  ChatBubbleIcon,
  CloseIcon,
  MaxMessengerIcon,
  PhoneIcon,
  TelegramIcon,
  WhatsAppIcon,
} from "@/components/Icons";

export function FloatingMessengers() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed right-5 bottom-5 z-30 flex flex-col items-end gap-2 sm:right-6 sm:bottom-6">
      {open && (
        <div className="surface-glass flex flex-col items-stretch gap-1.5 rounded-2xl border border-hairline-strong p-2 shadow-2xl">
          <a
            href={SITE_CONFIG.messengerPhoneHref}
            className="inline-flex h-10 items-center gap-2.5 rounded-xl px-3.5 text-xs font-bold text-ink transition hover:bg-surface-elevated hover:text-accent-text"
          >
            <PhoneIcon className="h-4 w-4 text-accent-text" />
            <span>Позвонить</span>
          </a>

          <a
            href={SITE_CONFIG.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center gap-2.5 rounded-xl px-3.5 text-xs font-bold text-ink transition hover:bg-surface-elevated hover:text-accent-text"
          >
            <TelegramIcon className="h-4 w-4 text-accent-text" />
            <span>Telegram</span>
          </a>

          <a
            href={SITE_CONFIG.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center gap-2.5 rounded-xl px-3.5 text-xs font-bold text-ink transition hover:bg-surface-elevated hover:text-accent-text"
          >
            <WhatsAppIcon className="h-4 w-4 text-accent-text" />
            <span>WhatsApp</span>
          </a>

          <a
            href={SITE_CONFIG.maxUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center gap-2.5 rounded-xl px-3.5 text-xs font-bold text-ink transition hover:bg-surface-elevated hover:text-accent-text"
          >
            <MaxMessengerIcon className="h-4 w-4 text-accent-text" />
            <span>Max</span>
          </a>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Скрыть контакты" : "Связаться в мессенджере"}
        className="btn-primary h-13 w-13 rounded-2xl shadow-xl"
      >
        {open ? (
          <CloseIcon className="h-5 w-5" />
        ) : (
          <ChatBubbleIcon className="h-6 w-6" />
        )}
      </button>
    </div>
  );
}
