"use client";

import { DownloadOutlined } from "@ant-design/icons";
import { usePwa } from "./PwaProvider";
import styles from "./PwaInstallAction.module.scss";

interface PwaInstallActionProps {
  compact?: boolean;
  className?: string;
}
export default function PwaInstallAction({ compact = false, className }: PwaInstallActionProps) {
  const { shouldOfferInstall, canPrompt, install, openInstallHelp } = usePwa();
  if (!shouldOfferInstall) {
    return null;
  }

  const actionClassName = [styles.action, compact ? styles.compact : "", className ?? ""]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={actionClassName}
      onClick={canPrompt ? install : openInstallHelp}
      aria-label={canPrompt ? "Install The Agency" : "Open install instructions"}
      title={canPrompt ? "Install The Agency" : "Install The Agency"}
    >
      <DownloadOutlined aria-hidden />
      <span>{compact ? "Install" : "Add to device"}</span>
    </button>
  );
}
