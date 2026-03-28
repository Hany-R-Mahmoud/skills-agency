import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import styles from "./MainArea.module.scss";

interface MainAreaProps {
  children: ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
  hideHeader?: boolean;
  summary?: ReactNode;
}

export default function MainArea({
  children,
  eyebrow,
  title,
  description,
  className,
  hideHeader = false,
  summary,
}: MainAreaProps) {
  return (
    <main className={cn(styles.main, className)}>
      <div className={styles.inner}>
        {!hideHeader ? (
          <header className={styles.header}>
            <div className={styles.copy}>
              <p className={styles.eyebrow}>{eyebrow}</p>
              <h1>{title}</h1>
              <p className={styles.description}>{description}</p>
            </div>
            {summary ? <div className={styles.summary}>{summary}</div> : null}
          </header>
        ) : null}
        <div className={styles.content}>{children}</div>
      </div>
    </main>
  );
}
