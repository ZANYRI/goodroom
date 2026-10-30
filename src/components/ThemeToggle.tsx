"use client";

import React, { useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "@/components/Icons";

type ThemeMode = "dark" | "light";

const listeners = new Set<() => void>();

function subscribeTheme(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getClientTheme(): ThemeMode {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

function getServerTheme(): ThemeMode {
  return "dark";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getClientTheme,
    getServerTheme
  );

  const toggleTheme = () => {
    const next: ThemeMode = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      window.localStorage.setItem("goodroom-theme", next);
    } catch {
      // Ignore storage restrictions
    }
    listeners.forEach((listener) => listener());
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        theme === "dark" ? "Включить светлую тему" : "Включить темную тему"
      }
      title={theme === "dark" ? "Светлая тема" : "Темная тема"}
      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-hairline bg-surface text-ink-muted transition hover:border-hairline-strong hover:text-ink focus-visible:outline-2 focus-visible:outline-accent"
    >
      {theme === "dark" ? (
        <SunIcon className="h-4 w-4" />
      ) : (
        <MoonIcon className="h-4 w-4" />
      )}
    </button>
  );
}
