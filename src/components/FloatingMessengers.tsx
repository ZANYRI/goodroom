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
    <div className="fixed right-5 bottom-5 z-30 flex flex-col items-end gap-2.5 sm:right-6 sm:bottom-6">
      {open && (
        <div className="flex flex-col items-end gap-2">
          <a
            href={SITE_CONFIG.messengerPhoneHref}
            className="inline-flex h-11 items-center gap-2.5 rounded-full bg-black px-4 text-xs font-bold text-white shadow-xl ring-1 ring-white/15 transition hover:bg-[#43ff57] hover:text-black"
          >
            <PhoneIcon className="h-4 w-4" />
            <span>Позвонить</span>
          </a>

          <a
            href={SITE_CONFIG.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2.5 rounded-full bg-[#24A1DE] px-4 text-xs font-bold text-white shadow-xl transition hover:brightness-110"
          >
            <TelegramIcon className="h-4 w-4" />
            <span>Telegram</span>
          </a>

          <a
            href={SITE_CONFIG.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2.5 rounded-full bg-[#25D366] px-4 text-xs font-bold text-white shadow-xl transition hover:brightness-110"
          >
            <WhatsAppIcon className="h-4 w-4" />
            <span>WhatsApp</span>
          </a>

          <a
            href={SITE_CONFIG.maxUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2.5 rounded-full bg-[#6C47FF] px-4 text-xs font-bold text-white shadow-xl transition hover:brightness-110"
          >
            <MaxMessengerIcon className="h-4 w-4" />
            <span>Max</span>
          </a>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Скрыть контакты" : "Связаться с нами"}
        className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-[#43ff57] text-black shadow-2xl ring-4 ring-black/15 transition hover:scale-105 hover:bg-[#33d744] hover:text-white"
      >
        {open ? (
          <CloseIcon className="h-6 w-6" />
        ) : (
          <ChatBubbleIcon className="h-6 w-6" />
        )}
      </button>
    </div>
  );
}
