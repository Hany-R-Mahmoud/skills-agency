"use client";

import type { AgentSprite as AgentSpriteData, AgentStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import styles from "./AgentSprite.module.scss";

interface AgentSpriteProps {
  name: string;
  sprite: AgentSpriteData;
  status: AgentStatus;
  accentColor: string;
  size?: "sm" | "md";
}

export default function AgentSprite({
  name,
  sprite,
  status,
  accentColor,
  size = "md",
}: AgentSpriteProps) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <span
      className={cn(styles.sprite, styles[size])}
      data-style={sprite.style}
      data-accent={accentColor}
      data-status={status}
      data-variant={sprite.variant}
      aria-hidden="true"
    >
      <span className={styles.aura} />
      <span className={styles.frame}>
        <span className={styles.head} />
        <span className={styles.body} />
        <span className={styles.core}>{initials}</span>
      </span>
    </span>
  );
}
