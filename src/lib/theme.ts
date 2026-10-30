"use client";

import { useSyncExternalStore } from "react";

export type ThemeMode = "dark" | "light";

const listeners = new Set<() => void>();
let observerInitialized = false;

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

function ensureObserver() {
  if (observerInitialized || typeof document === "undefined") return;
  observerInitialized = true;

  const observer = new MutationObserver(() => {
    notifyListeners();
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  window.addEventListener("storage", (e) => {
    if (e.key === "goodroom-theme" && (e.newValue === "dark" || e.newValue === "light")) {
      document.documentElement.setAttribute("data-theme", e.newValue);
      notifyListeners();
    }
  });
}

function subscribeTheme(listener: () => void) {
  ensureObserver();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getClientTheme(): ThemeMode {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

function getServerTheme(): ThemeMode {
  return "dark";
}

export function setAppTheme(next: ThemeMode) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", next);
  try {
    window.localStorage.setItem("goodroom-theme", next);
  } catch {
    // Ignore storage restrictions
  }
  notifyListeners();
}

export function useTheme() {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getClientTheme,
    getServerTheme
  );

  return {
    theme,
    setTheme: setAppTheme,
    toggleTheme: () => setAppTheme(theme === "dark" ? "light" : "dark"),
  };
}
