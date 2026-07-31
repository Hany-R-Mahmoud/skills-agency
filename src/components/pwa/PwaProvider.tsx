"use client";

import {
  buildAndroidBrowserIntent,
  buildHashTransportUrl,
  getPwaEnvironment,
  getPwaSurface,
  hasRecentDismissal,
  hasRecentInstalledHint,
  PWA_STORAGE_KEYS,
  restoreHashFromTransport,
  writeTimestamp,
  type PwaSurface,
} from "@/lib/pwa";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import PwaInstallPrompt from "./PwaInstallPrompt";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export type PwaHelpMode = "android-webview" | "ios-webview" | "ios-browser" | "browser";

interface PwaContextValue {
  ready: boolean;
  surface: PwaSurface;
  canPrompt: boolean;
  shouldOfferInstall: boolean;
  isPromotionVisible: boolean;
  openInstallHelp: () => void;
  dismissPromotion: () => void;
  install: () => Promise<void>;
  openInBrowser: () => void;
  closeInstallHelp: () => void;
  helpMode: PwaHelpMode;
  isHelpVisible: boolean;
}

const PwaContext = createContext<PwaContextValue | null>(null);

function getStorage(): Storage | null {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function usePwa(): PwaContextValue {
  const value = useContext(PwaContext);
  if (!value) {
    throw new Error("usePwa must be used inside PwaProvider");
  }

  return value;
}

export default function PwaProvider({ children }: { children: ReactNode }) {
  const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null);
  const [ready, setReady] = useState(false);
  const [surface, setSurface] = useState<PwaSurface>(() => getPwaSurface());
  const [canPrompt, setCanPrompt] = useState(false);
  const [installedHint, setInstalledHint] = useState(false);
  const [isPromotionVisible, setPromotionVisible] = useState(false);
  const [isHelpVisible, setHelpVisible] = useState(false);

  const refreshSurface = useCallback(() => {
    const nextSurface = getPwaSurface(getPwaEnvironment());
    setSurface(nextSurface);
    return nextSurface;
  }, []);

  useEffect(() => {
    restoreHashFromTransport();
    const hydrationTimer = window.setTimeout(() => {
      const storage = getStorage();
      const nextSurface = refreshSurface();
      const hasDismissed = hasRecentDismissal(storage);
      const hasInstalledHint = hasRecentInstalledHint(storage);

      setInstalledHint(hasInstalledHint);
      setReady(true);

      if (!nextSurface.isStandalone && !hasInstalledHint && !hasDismissed) {
        window.setTimeout(() => setPromotionVisible(true), 900);
      }
    }, 0);

    return () => window.clearTimeout(hydrationTimer);
  }, [refreshSurface]);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      deferredPrompt.current = event as BeforeInstallPromptEvent;
      setCanPrompt(true);
    };

    const handleAppInstalled = () => {
      deferredPrompt.current = null;
      setCanPrompt(false);
      setInstalledHint(true);
      setPromotionVisible(false);
      setHelpVisible(false);
      writeTimestamp(getStorage(), PWA_STORAGE_KEYS.installedAt);
      refreshSurface();
    };

    const syncSurface = () => {
      const nextSurface = refreshSurface();
      if (nextSurface.isStandalone) {
        setInstalledHint(true);
        setPromotionVisible(false);
        setHelpVisible(false);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);
    window.addEventListener("pageshow", syncSurface);
    document.addEventListener("visibilitychange", syncSurface);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
      window.removeEventListener("pageshow", syncSurface);
      document.removeEventListener("visibilitychange", syncSurface);
    };
  }, [refreshSurface]);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) {
      return undefined;
    }

    void navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch(() => undefined);
    return undefined;
  }, []);

  const dismissPromotion = useCallback(() => {
    writeTimestamp(getStorage(), PWA_STORAGE_KEYS.dismissedAt);
    setPromotionVisible(false);
  }, []);

  const openInstallHelp = useCallback(() => {
    setPromotionVisible(false);
    setHelpVisible(true);
  }, []);

  const install = useCallback(async () => {
    const prompt = deferredPrompt.current;
    if (!prompt) {
      openInstallHelp();
      return;
    }

    try {
      await prompt.prompt();
      const choice = await prompt.userChoice;
      if (choice.outcome === "accepted") {
        writeTimestamp(getStorage(), PWA_STORAGE_KEYS.installedAt);
        setInstalledHint(true);
        setHelpVisible(false);
        setPromotionVisible(false);
      }
    } catch {
      openInstallHelp();
    } finally {
      deferredPrompt.current = null;
      setCanPrompt(false);
    }
  }, [openInstallHelp]);

  const openInBrowser = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }

    const currentUrl = buildHashTransportUrl(window.location.href);
    if (surface.isAndroid) {
      window.location.href = buildAndroidBrowserIntent(currentUrl);
      window.setTimeout(() => {
        if (document.visibilityState === "visible") {
          setHelpVisible(true);
        }
      }, 900);
      return;
    }

    setHelpVisible(true);
  }, [surface.isAndroid]);

  const helpMode: PwaHelpMode = surface.isAndroid && surface.isWebView
    ? "android-webview"
    : surface.isIos && surface.isWebView
      ? "ios-webview"
      : surface.isIos
        ? "ios-browser"
        : "browser";

  const value = useMemo<PwaContextValue>(() => ({
    ready,
    surface,
    canPrompt,
    shouldOfferInstall: ready && !surface.isStandalone && !installedHint,
    isPromotionVisible,
    openInstallHelp,
    dismissPromotion,
    install,
    openInBrowser,
    closeInstallHelp: () => setHelpVisible(false),
    helpMode,
    isHelpVisible,
  }), [
    canPrompt,
    helpMode,
    install,
    isHelpVisible,
    isPromotionVisible,
    openInBrowser,
    openInstallHelp,
    ready,
    surface,
    installedHint,
    dismissPromotion,
  ]);

  return (
    <PwaContext.Provider value={value}>
      {children}
      {(isPromotionVisible || isHelpVisible) && !surface.isStandalone && !installedHint ? (
        <PwaInstallPrompt />
      ) : null}
    </PwaContext.Provider>
  );
}
