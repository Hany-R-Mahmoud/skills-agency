"use client";

import { useEffect, useRef, useState } from "react";
import { CopyOutlined, DownloadOutlined, ExportOutlined, CloseOutlined } from "@ant-design/icons";
import { copyText } from "@/lib/pwa";
import { usePwa } from "./PwaProvider";
import styles from "./PwaInstallPrompt.module.scss";

function getHelpCopy(mode: ReturnType<typeof usePwa>["helpMode"]): {
  title: string;
  body: string;
  action: string;
} {
  switch (mode) {
    case "android-webview":
      return {
        title: "Open this in Chrome",
        body: "Messenger and other in-app browsers cannot install PWAs. Open the page in Chrome, then use Chrome's menu and choose Install app.",
        action: "Open Chrome",
      };
    case "ios-webview":
      return {
        title: "Continue in Safari",
        body: "This in-app browser cannot install the app. Open the page in Safari, tap Share, then choose Add to Home Screen.",
        action: "Copy link",
      };
    case "ios-browser":
      return {
        title: "Add to your Home Screen",
        body: "In Safari, tap Share, choose Add to Home Screen, then confirm Add.",
        action: "Copy link",
      };
    default:
      return {
        title: "Install the Agency",
        body: "Use your browser's install option or the install icon in the address bar to add this app to your device.",
        action: "Copy link",
      };
  }
}
export default function PwaInstallPrompt() {
  const {
    canPrompt,
    dismissPromotion,
    install,
    openInBrowser,
    closeInstallHelp,
    helpMode,
    isHelpVisible,
    isPromotionVisible,
  } = usePwa();
  const [copied, setCopied] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const helpCopy = getHelpCopy(helpMode);
  const currentUrl = typeof window === "undefined" ? "" : window.location.href;

  useEffect(() => {
    if (!isHelpVisible) {
      return undefined;
    }

    dialogRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeInstallHelp();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeInstallHelp, isHelpVisible]);

  async function handleCopy(): Promise<void> {
    const didCopy = await copyText(currentUrl);
    setCopied(didCopy);
    window.setTimeout(() => setCopied(false), 2200);
  }

  return (
    <>
      {isPromotionVisible ? (
        <aside className={styles.promotion} aria-label="Install this app">
          <div className={styles.promotionCopy}>
            <span className={styles.eyebrow}>Device shortcut</span>
            <strong>Keep The Agency close</strong>
            <span>Install the roster for a faster, app-like launch.</span>
          </div>
          <div className={styles.promotionActions}>
            <button type="button" className={styles.primaryButton} onClick={canPrompt ? install : openInBrowser}>
              <DownloadOutlined aria-hidden />
              {canPrompt ? "Install" : "How to install"}
            </button>
            <button type="button" className={styles.dismissButton} onClick={dismissPromotion}>
              Later
            </button>
          </div>
        </aside>
      ) : null}

      {isHelpVisible ? (
        <div className={styles.backdrop} role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            closeInstallHelp();
          }
        }}>
          <div
            ref={dialogRef}
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="pwa-install-title"
            tabIndex={-1}
          >
            <button type="button" className={styles.closeButton} onClick={closeInstallHelp} aria-label="Close install instructions">
              <CloseOutlined aria-hidden />
            </button>
            <span className={styles.eyebrow}>Install support</span>
            <h2 id="pwa-install-title">{helpCopy.title}</h2>
            <p>{helpCopy.body}</p>

            {helpMode === "android-webview" ? (
              <button type="button" className={styles.primaryButton} onClick={openInBrowser}>
                <ExportOutlined aria-hidden />
                {helpCopy.action}
              </button>
            ) : (
              <button type="button" className={styles.primaryButton} onClick={handleCopy}>
                <CopyOutlined aria-hidden />
                {copied ? "Copied" : helpCopy.action}
              </button>
            )}

            <label className={styles.urlLabel} htmlFor="pwa-install-url">Page link</label>
            <input id="pwa-install-url" className={styles.urlInput} value={currentUrl} readOnly onFocus={(event) => event.currentTarget.select()} />
            <button type="button" className={styles.textButton} onClick={closeInstallHelp}>Close</button>
          </div>
        </div>
      ) : null}
    </>
  );
}
