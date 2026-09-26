import { type ReactNode } from "react";

// ── Shared portal primitives ─────────────────────────────────────────────────

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-border/60 bg-card/40 ${className}`}
    >
      {children}
    </div>
  );
}

export function SectionHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-end justify-between mb-4">
      <div>
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}

export function StatTile({
  label,
  value,
  sub,
  accent = "text-foreground",
}: {
  label: string;
  value: ReactNode;
  sub?: string;
  accent?: string;
}) {
  return (
    <Card className="p-4">
      <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium mb-2">
        {label}
      </p>
      <p className={`text-2xl font-semibold tabular-nums ${accent}`}>{value}</p>
      {sub && <p className="text-[11px] text-muted-foreground mt-1">{sub}</p>}
    </Card>
  );
}

export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="rounded-xl border border-dashed border-border/60 py-12 text-center">
      <p className="text-sm text-muted-foreground">{title}</p>
      {hint && <p className="text-xs text-muted-foreground mt-1.5">{hint}</p>}
    </div>
  );
}

export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-lg bg-muted/50 ${className}`} />
  );
}

// Readiness band → colour system (colour + label, never colour alone).
export function bandColor(band: string) {
  switch (band) {
    case "Career Ready":
      return {
        text: "text-neutral-600 dark:text-neutral-400",
        bg: "bg-neutral-500/10",
        ring: "ring-neutral-500/30",
        bar: "bg-neutral-500",
      };
    case "High Potential":
      return {
        text: "text-cyan-600 dark:text-cyan-400",
        bg: "bg-cyan-500/10",
        ring: "ring-cyan-500/30",
        bar: "bg-cyan-500",
      };
    case "Ready":
      return {
        text: "text-amber-600 dark:text-amber-400",
        bg: "bg-amber-500/10",
        ring: "ring-amber-500/30",
        bar: "bg-amber-500",
      };
    default:
      return {
        text: "text-rose-600 dark:text-rose-400",
        bg: "bg-rose-500/10",
        ring: "ring-rose-500/30",
        bar: "bg-rose-500",
      };
  }
}

const STATUS_STYLE: Record<string, string> = {
  live: "bg-neutral-500/10 text-neutral-600 dark:text-neutral-400 border-neutral-500/30",
  waiting_room_open:
    "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
  upcoming: "bg-muted/20 text-muted-foreground border-border/40",
  completed: "bg-muted/20 text-muted-foreground border-border/40",
  missed: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30",
  passed:
    "bg-neutral-500/10 text-neutral-600 dark:text-neutral-400 border-neutral-500/30",
  attempted:
    "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
};
const STATUS_LABEL: Record<string, string> = {
  live: "● Live",
  waiting_room_open: "Waiting Room Open",
  upcoming: "Upcoming",
  completed: "Completed",
  missed: "Missed",
  passed: "Passed",
  attempted: "Attempted",
};

export function StatusPill({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider border ${STATUS_STYLE[status] || STATUS_STYLE.upcoming}`}
    >
      {STATUS_LABEL[status] || status}
    </span>
  );
}

export function Meter({
  value,
  className = "",
  barClass = "bg-secondary",
}: {
  value: number;
  className?: string;
  barClass?: string;
}) {
  return (
    <div className={`h-1.5 rounded-full bg-muted overflow-hidden ${className}`}>
      <div
        className={`h-full rounded-full transition-all ${barClass}`}
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}
