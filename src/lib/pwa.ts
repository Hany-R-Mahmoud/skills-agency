export const PWA_STORAGE_KEYS = {
  dismissedAt: "skills-agency-pwa-dismissed-at",
  installedAt: "skills-agency-pwa-installed-at",
} as const;

export const PWA_TIMING = {
  dismissalCooldownMs: 7 * 24 * 60 * 60 * 1000,
  installedHintTtlMs: 30 * 24 * 60 * 60 * 1000,
} as const;

export interface PwaEnvironment {
  userAgent: string;
  platform: string;
  maxTouchPoints: number;
  standalone: boolean;
  mediaStandalone: boolean;
}

export interface PwaSurface {
  isAndroid: boolean;
  isIos: boolean;
  isStandalone: boolean;
  isWebView: boolean;
  isInstallableBrowser: boolean;
}

export function getPwaEnvironment(): PwaEnvironment {
  if (typeof window === "undefined") {
    return {
      userAgent: "",
      platform: "",
      maxTouchPoints: 0,
      standalone: false,
      mediaStandalone: false,
    };
  }

  return {
    userAgent: navigator.userAgent ?? "",
    platform: navigator.platform ?? "",
    maxTouchPoints: navigator.maxTouchPoints ?? 0,
    standalone: (navigator as Navigator & { standalone?: boolean }).standalone === true,
    mediaStandalone: window.matchMedia?.("(display-mode: standalone)").matches === true,
  };
}

export function getPwaSurface(environment: PwaEnvironment = getPwaEnvironment()): PwaSurface {
  const userAgent = environment.userAgent.toLowerCase();
  const platform = environment.platform.toLowerCase();
  const isIos = /iphone|ipad|ipod/.test(userAgent) ||
    (platform.includes("mac") && environment.maxTouchPoints > 1);
  const isAndroid = userAgent.includes("android");
  const isStandalone = environment.standalone || environment.mediaStandalone;

  return {
    isAndroid,
    isIos,
    isStandalone,
    isWebView: isEmbeddedWebView(userAgent, isAndroid),
    isInstallableBrowser: !isStandalone && !isEmbeddedWebView(userAgent, isAndroid),
  };
}

export function isEmbeddedWebView(userAgent: string, isAndroid = /android/i.test(userAgent)): boolean {
  const normalized = userAgent.toLowerCase();

  if (/fbav|fban|instagram|messenger|line\//.test(normalized)) {
    return true;
  }

  if (/linkedinapp|micromessenger|twitter for iphone|twitterandroid|pinterest|snapchat|tiktok/.test(normalized)) {
    return true;
  }

  return isAndroid && (/(?:;\s*wv\)|\bwv\b)/.test(normalized) || /version\/\d+(?:\.\d+)* chrome\/\d+/.test(normalized) && !normalized.includes("safari"));
}

export function isRecentTimestamp(
  value: string | null | undefined,
  now = Date.now(),
  ttl = PWA_TIMING.dismissalCooldownMs,
): boolean {
  if (!value) {
    return false;
  }

  const timestamp = Number(value);
  if (!Number.isFinite(timestamp) || timestamp > now) {
    return false;
  }

  return now - timestamp < ttl;
}

export function hasRecentDismissal(
  storage: Pick<Storage, "getItem"> | null | undefined,
  now = Date.now(),
): boolean {
  try {
    return isRecentTimestamp(storage?.getItem(PWA_STORAGE_KEYS.dismissedAt), now);
  } catch {
    return false;
  }
}

export function hasRecentInstalledHint(
  storage: Pick<Storage, "getItem"> | null | undefined,
  now = Date.now(),
): boolean {
  try {
    return isRecentTimestamp(storage?.getItem(PWA_STORAGE_KEYS.installedAt), now, PWA_TIMING.installedHintTtlMs);
  } catch {
    return false;
  }
}

export function writeTimestamp(
  storage: Pick<Storage, "setItem"> | null | undefined,
  key: string,
  now = Date.now(),
): boolean {
  try {
    storage?.setItem(key, String(now));
    return true;
  } catch {
    return false;
  }
}

export function buildAndroidBrowserIntent(url: string): string {
  const target = new URL(url);
  const fallback = encodeURIComponent(target.toString());
  const path = `${target.host}${target.pathname}${target.search}`;

  return `intent://${path}#Intent;scheme=${target.protocol.replace(":", "")};S.browser_fallback_url=${fallback};end`;
}

export function buildHashTransportUrl(url: string): string {
  const target = new URL(url);
  if (!target.hash) {
    return target.toString();
  }

  const hash = target.hash.slice(1);
  target.hash = "";
  target.searchParams.set("__pwa_hash", hash);
  return target.toString();
}

export function restoreHashFromTransport(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  const url = new URL(window.location.href);
  const hash = url.searchParams.get("__pwa_hash");
  if (!hash) {
    return false;
  }

  url.searchParams.delete("__pwa_hash");
  url.hash = hash;
  window.history.replaceState(window.history.state, "", url.toString());
  return true;
}

export async function copyText(value: string): Promise<boolean> {
  if (!value) {
    return false;
  }

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    // Continue with the legacy selection fallback.
  }

  try {
    const input = document.createElement("textarea");
    input.value = value;
    input.setAttribute("readonly", "true");
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.appendChild(input);
    input.select();
    const copied = document.execCommand("copy");
    input.remove();
    return copied;
  } catch {
    return false;
  }
}
