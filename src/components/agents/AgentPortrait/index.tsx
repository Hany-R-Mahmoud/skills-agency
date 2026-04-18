import Image from "next/image";
import { cn } from "@/lib/utils";
import type { AgentStatus, PortraitFit } from "@/lib/types";
import StatusPip from "@/components/shared/StatusPip";
import styles from "./AgentPortrait.module.scss";

interface AgentPortraitProps {
  src: string;
  alt: string;
  status: AgentStatus;
  departmentId: string;
  fit?: PortraitFit;
  badgePlacement?: "top-right" | "bottom-right";
  priority?: boolean;
  className?: string;
}

export default function AgentPortrait({
  src,
  alt,
  status,
  departmentId,
  fit = "cover",
  badgePlacement = "bottom-right",
  priority = false,
  className,
}: AgentPortraitProps) {
  return (
    <div
      className={cn(styles.frame, className)}
      data-department={departmentId}
      data-status={status}
      data-badge-placement={badgePlacement}
    >
      <div className={styles.imageWrap}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.image}
          data-fit={fit}
        />
      </div>
      <div className={styles.statusBadge}>
        <StatusPip status={status} />
        <span>{status}</span>
      </div>
    </div>
  );
}
