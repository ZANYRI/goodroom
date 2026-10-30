"use client";

import React from "react";
import { useTheme } from "@/lib/theme";
import { MoonIcon, SunIcon } from "@/components/Icons";

interface ThemeToggleProps {
  compact?: boolean;
}

export function ThemeToggle({ compact = false }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  return (
    <div
      role="group"
      aria-label="Переключение темы оформления"
      className="inline-flex items-center rounded-xl border border-hairline-strong bg-surface p-1"
    >
      <button
        type="button"
        aria-pressed={theme === "dark"}
        aria-label="Темная тема"
        title="Темная тема"
        onClick={() => setTheme("dark")}
        className={`inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-lg font-semibold transition focus-visible:outline-2 focus-visible:outline-accent ${
          compact ? "h-7 w-8 text-xs" : "h-8 px-2.5 text-xs"
        } ${
          theme === "dark"
            ? "bg-accent text-accent-ink shadow-xs"
            : "text-ink-muted hover:text-ink"
        }`}
      >
        <MoonIcon className="h-3.5 w-3.5 shrink-0" />
        {!compact && <span>Темная</span>}
      </button>

      <button
        type="button"
        aria-pressed={theme === "light"}
        aria-label="Светлая тема"
        title="Светлая тема"
        onClick={() => setTheme("light")}
        className={`inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-lg font-semibold transition focus-visible:outline-2 focus-visible:outline-accent ${
          compact ? "h-7 w-8 text-xs" : "h-8 px-2.5 text-xs"
        } ${
          theme === "light"
            ? "bg-accent text-accent-ink shadow-xs"
            : "text-ink-muted hover:text-ink"
        }`}
      >
        <SunIcon className="h-3.5 w-3.5 shrink-0" />
        {!compact && <span>Светлая</span>}
      </button>
    </div>
  );
}
