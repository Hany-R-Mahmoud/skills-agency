"use client";

export type ThemeMode = "dark" | "light";

export const THEME_STORAGE_KEY = "agency-theme";
const themeListeners = new Set<() => void>();

function isThemeMode(value: string | null | undefined): value is ThemeMode {
  return value === "dark" || value === "light";
}

export function getSystemTheme(): ThemeMode {
  if (typeof window === "undefined") {
    return "dark";
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

export function getStoredTheme(): ThemeMode | null {
  if (typeof window === "undefined") {
    return null;
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  return isThemeMode(storedTheme) ? storedTheme : null;
}

export function resolveTheme(): ThemeMode {
  return getStoredTheme() ?? getSystemTheme();
}

export function getDocumentTheme(): ThemeMode | null {
  if (typeof document === "undefined") {
    return null;
  }

  const theme = document.documentElement.dataset.theme;
  return isThemeMode(theme) ? theme : null;
}

export function applyTheme(theme: ThemeMode): void {
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

function emitThemeChange(): void {
  themeListeners.forEach((listener) => listener());
}

export function setTheme(theme: ThemeMode): void {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }

  applyTheme(theme);
  emitThemeChange();
}

export function initializeTheme(): ThemeMode {
  const theme = resolveTheme();
  applyTheme(theme);
  return theme;
}

export function subscribeToTheme(listener: () => void): () => void {
  themeListeners.add(listener);

  function handleStorage(event: StorageEvent): void {
    if (event.key === THEME_STORAGE_KEY) {
      listener();
    }
  }

  if (typeof window !== "undefined") {
    window.addEventListener("storage", handleStorage);
  }

  return () => {
    themeListeners.delete(listener);

    if (typeof window !== "undefined") {
      window.removeEventListener("storage", handleStorage);
    }
  };
}
