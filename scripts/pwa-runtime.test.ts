import assert from "node:assert/strict";
import test from "node:test";
import {
  buildAndroidBrowserIntent,
  buildHashTransportUrl,
  getPwaSurface,
  hasRecentDismissal,
  isRecentTimestamp,
} from "../src/lib/pwa";

const now = 1_700_000_000_000;

test("dismissal timestamps expire after the configured cooldown", () => {
  assert.equal(isRecentTimestamp(String(now - 1_000), now), true);
  assert.equal(isRecentTimestamp(String(now - 7 * 24 * 60 * 60 * 1000), now), false);
  assert.equal(isRecentTimestamp(String(now + 1_000), now), false);
});
test("dismissal checks tolerate unavailable storage", () => {
  assert.equal(hasRecentDismissal(null, now), false);
  assert.equal(hasRecentDismissal({ getItem: () => String(now - 1_000) }, now), true);
  assert.equal(hasRecentDismissal({ getItem: () => { throw new Error("blocked"); } }, now), false);
});

test("surface detection distinguishes standalone, iOS, Android, and embedded browsers", () => {
  const androidWebView = getPwaSurface({
    userAgent: "Mozilla/5.0 (Linux; Android 14; Pixel) AppleWebKit/537.36 Version/4.0 Chrome/120.0 Mobile Safari/537.36 wv",
    platform: "Linux armv8l",
    maxTouchPoints: 5,
    standalone: false,
    mediaStandalone: false,
  });
  const iosStandalone = getPwaSurface({
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)",
    platform: "iPhone",
    maxTouchPoints: 5,
    standalone: true,
    mediaStandalone: false,
  });

  assert.equal(androidWebView.isAndroid, true);
  assert.equal(androidWebView.isWebView, true);
  assert.equal(androidWebView.isInstallableBrowser, false);
  assert.equal(iosStandalone.isIos, true);
  assert.equal(iosStandalone.isStandalone, true);
});

test("browser intents preserve the full URL as a fallback", () => {
  const url = "https://skills-agency.vercel.app/departments/design?view=agents#roster";
  const intent = buildAndroidBrowserIntent(url);
  assert.match(intent, /^intent:\/\/skills-agency\.vercel\.app\/departments\/design\?view=agents/);
  assert.match(intent, /S\.browser_fallback_url=https%3A%2F%2Fskills-agency\.vercel\.app%2Fdepartments%2Fdesign/);
});

test("hash transport moves a deep-link hash into a query parameter", () => {
  const transported = new URL(buildHashTransportUrl("https://skills-agency.vercel.app/#roster"));
  assert.equal(transported.hash, "");
  assert.equal(transported.searchParams.get("__pwa_hash"), "roster");
});
