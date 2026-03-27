import type { AgentStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import styles from "./StatusPip.module.scss";

interface StatusPipProps {
  status: AgentStatus;
}

export default function StatusPip({ status }: StatusPipProps) {
  return (
    <span
      className={cn(styles.pip, "pip", `pip--${status}`)}
      aria-label={`Status: ${status}`}
    />
  );
}
