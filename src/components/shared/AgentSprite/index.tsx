import type { AgentStatus, CharacterStyle } from "@/lib/types";
import { cn } from "@/lib/utils";
import styles from "./AgentSprite.module.scss";

interface AgentSpriteProps {
  color: string;
  variant: 1 | 2 | 3 | 4;
  style: CharacterStyle;
  status: AgentStatus;
  size?: number;
  className?: string;
  label?: string;
}

export default function AgentSprite({
  color,
  variant,
  style,
  status,
  size = 32,
  className,
  label = "Agent sprite",
}: AgentSpriteProps) {
  const resolvedStyle = style === "pixel" || style === "geometric"
    ? style
    : "geometric";
  const resolvedColor = color.trim() || "var(--accent-cyan)";
  const resolvedVariant = variant >= 1 && variant <= 4 ? variant : 1;

  return (
    <span
      className={cn(styles.sprite, className)}
      data-style={resolvedStyle}
      data-status={status}
      data-variant={resolvedVariant}
      aria-label={label}
      role="img"
    >
      <svg
        className={styles.art}
        width={size}
        height={size}
        viewBox="0 0 32 32"
        aria-hidden="true"
        focusable="false"
      >
        {resolvedStyle === "pixel"
          ? renderPixelSprite(resolvedColor, resolvedVariant)
          : renderGeometricSprite(resolvedColor, resolvedVariant)}
      </svg>
      <span className={cn(styles.statusPip, "pip", `pip--${status}`)} />
    </span>
  );
}

function renderPixelSprite(color: string, variant: 1 | 2 | 3 | 4) {
  const antennaByVariant: Record<number, React.ReactNode> = {
    1: <rect x="13" y="2" width="6" height="2" fill={color} />,
    2: (
      <>
        <rect x="10" y="2" width="4" height="2" fill={color} />
        <rect x="18" y="2" width="4" height="2" fill={color} />
      </>
    ),
    3: <rect x="14" y="0" width="4" height="4" fill={color} />,
    4: <rect x="12" y="3" width="8" height="2" fill={color} />,
  };

  const headByVariant: Record<number, React.ReactNode> = {
    1: <rect x="12" y="6" width="8" height="8" rx="1" ry="1" fill="var(--surface-high)" />,
    2: <rect x="11" y="6" width="10" height="8" rx="1" ry="1" fill="var(--surface-high)" />,
    3: <rect x="12" y="5" width="8" height="9" rx="1" ry="1" fill="var(--surface-high)" />,
    4: <rect x="11" y="5" width="10" height="9" rx="1" ry="1" fill="var(--surface-high)" />,
  };

  return (
    <>
      {antennaByVariant[variant]}
      {headByVariant[variant]}
      <rect x="11" y="15" width="10" height="12" rx="1" ry="1" fill={color} />
      <rect x="12" y="27" width="2" height="3" fill={color} />
      <rect x="18" y="27" width="2" height="3" fill={color} />
      <rect x="14" y="9" width="1.8" height="1.8" fill={color} />
      <rect x="17" y="9" width="1.8" height="1.8" fill={color} />
    </>
  );
}

function renderGeometricSprite(color: string, variant: 1 | 2 | 3 | 4) {
  const diamondByVariant: Record<number, string> = {
    1: "16,7 25,16 16,25 7,16",
    2: "16,6 26,16 16,26 6,16",
    3: "16,8 24,16 16,24 8,16",
    4: "16,6 24,13 21,24 11,24 8,13",
  };

  const accentByVariant: Record<number, React.ReactNode> = {
    1: <circle cx="16" cy="16" r="3" fill="var(--surface-high)" />,
    2: <rect x="13.5" y="13.5" width="5" height="5" rx="1" ry="1" fill="var(--surface-high)" />,
    3: <polygon points="16,12 20,16 16,20 12,16" fill="var(--surface-high)" />,
    4: <rect x="15" y="11" width="2" height="10" fill="var(--surface-high)" />,
  };

  return (
    <>
      <circle cx="16" cy="6" r="4" fill="var(--surface-high)" />
      <polygon points={diamondByVariant[variant]} fill={color} />
      {accentByVariant[variant]}
    </>
  );
}
