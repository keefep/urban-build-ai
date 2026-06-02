import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Panel({
  title,
  subtitle,
  right,
  children,
  className,
}: {
  title?: string;
  subtitle?: string;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-md border border-border bg-card relative overflow-hidden",
        className,
      )}
    >
      {(title || right) && (
        <header className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-muted/30">
          <div>
            {title && (
              <h2 className="text-[11px] font-mono-display uppercase tracking-[0.18em] text-muted-foreground">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-sm font-medium text-foreground mt-0.5">{subtitle}</p>
            )}
          </div>
          {right}
        </header>
      )}
      <div className="relative">{children}</div>
    </section>
  );
}

export function StatusDot({ tone }: { tone: "good" | "warn" | "danger" | "neutral" }) {
  const map = {
    good: "bg-success",
    warn: "bg-warning",
    danger: "bg-destructive",
    neutral: "bg-muted-foreground",
  };
  return (
    <span className="relative inline-flex h-2 w-2">
      <span className={cn("absolute inset-0 rounded-full animate-ping opacity-60", map[tone])} />
      <span className={cn("relative rounded-full h-2 w-2", map[tone])} />
    </span>
  );
}

export function Pill({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "good" | "warn" | "danger" | "neutral" | "info";
}) {
  const map = {
    good: "bg-success/15 text-success border-success/30",
    warn: "bg-warning/15 text-warning border-warning/30",
    danger: "bg-destructive/15 text-destructive border-destructive/40",
    neutral: "bg-muted text-muted-foreground border-border",
    info: "bg-accent/15 text-accent border-accent/30",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-mono-display uppercase tracking-wider border",
        map[tone],
      )}
    >
      {children}
    </span>
  );
}
