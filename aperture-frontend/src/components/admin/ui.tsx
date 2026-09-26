/**
 * Enterprise admin UI kit — flat, dense, accessible primitives.
 *
 * Design language (replaces the old glass/card look):
 *  · Solid surfaces (no translucency / backdrop-blur), crisp 1px borders.
 *  · Minimal rounding (rounded-md), clear hierarchy, tabular numerals for data.
 *  · Every interactive element ships a visible focus-visible ring.
 *  · Icon-only controls require a `label` → rendered as aria-label + title.
 *  · Tables use real <th scope>, captions, and a keyboard-scrollable region.
 */
import { forwardRef } from "react";
import type {
  ButtonHTMLAttributes, InputHTMLAttributes, SelectHTMLAttributes,
  ReactNode, TableHTMLAttributes, HTMLAttributes,
} from "react";
import { useId } from "react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

/** Shared focus ring — WCAG-visible on the dark surface. */
export const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/70 " +
  "focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/* ── Screen-reader-only text ── */
export function VisuallyHidden({ children }: { children: ReactNode }) {
  return <span className="sr-only">{children}</span>;
}

/* ── Page header ── */
export function PageHeader({
  title, description, actions,
}: { title: string; description?: string; actions?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-lg font-semibold tracking-tight text-foreground">{title}</h1>
        {description && <p className="mt-1 text-[13px] text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

/* ── Panel (flat bordered section) ── */
export function Panel({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <section className={cn("rounded-md border border-border bg-card", className)} {...rest}>
      {children}
    </section>
  );
}

export function PanelHeader({
  title, description, actions, icon: Icon,
}: { title: string; description?: string; actions?: ReactNode; icon?: LucideIcon }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
      <div className="flex items-center gap-2.5">
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" aria-hidden />}
        <div>
          <h2 className="text-sm font-medium text-foreground">{title}</h2>
          {description && <p className="text-[11px] text-muted-foreground">{description}</p>}
        </div>
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

/* ── Toolbar ── */
export function Toolbar({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("flex flex-wrap items-center gap-2", className)} role="toolbar" aria-orientation="horizontal">{children}</div>;
}

/* ── Button ── */
type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md";

const BTN_VARIANT: Record<ButtonVariant, string> = {
  primary: "bg-secondary text-foreground hover:bg-foreground hover:text-background border border-transparent",
  secondary: "bg-transparent text-foreground border border-border hover:border-border hover:bg-muted/40",
  ghost: "bg-transparent text-muted-foreground border border-transparent hover:text-foreground hover:bg-muted/50",
  danger: "bg-transparent text-red-300 border border-red-500/40 hover:bg-red-500/10 hover:border-red-500/60",
};
const BTN_SIZE: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-[12px] gap-1.5",
  md: "h-9 px-4 text-[13px] gap-2",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "secondary", size = "md", icon: Icon, loading, disabled, className, children, ...rest }, ref
) {
  return (
    <button
      ref={ref}
      type={rest.type ?? "button"}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium tracking-wide transition-colors",
        "disabled:pointer-events-none disabled:opacity-40", focusRing,
        BTN_VARIANT[variant], BTN_SIZE[size], className
      )}
      {...rest}
    >
      {Icon && <Icon className={cn(size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4", loading && "animate-spin")} aria-hidden />}
      {children}
    </button>
  );
});

/* ── Icon-only button (accessible: label required) ── */
interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon: LucideIcon;
  tone?: "default" | "danger";
}
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { label, icon: Icon, tone = "default", className, ...rest }, ref
) {
  return (
    <button
      ref={ref}
      type={rest.type ?? "button"}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-md border border-transparent transition-colors",
        tone === "danger"
          ? "text-muted-foreground hover:bg-red-500/10 hover:text-red-300"
          : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
        focusRing, className
      )}
      {...rest}
    >
      <Icon className="h-4 w-4" aria-hidden />
    </button>
  );
});

/* ── Form field (label ⇄ control association) ── */
export function Field({
  label, hint, error, required, children,
}: { label: string; hint?: string; error?: string; required?: boolean; children: (id: string, describedBy?: string) => ReactNode }) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errId = error ? `${id}-err` : undefined;
  const describedBy = [hintId, errId].filter(Boolean).join(" ") || undefined;
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}{required && <span className="ml-0.5 text-red-400" aria-hidden>*</span>}
      </label>
      {children(id, describedBy)}
      {hint && !error && <p id={hintId} className="text-[11px] text-muted-foreground">{hint}</p>}
      {error && <p id={errId} className="text-[11px] text-red-400" role="alert">{error}</p>}
    </div>
  );
}

const CONTROL =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-[13px] text-foreground " +
  "placeholder:text-muted-foreground transition-colors hover:border-border";

export const TextInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function TextInput({ className, ...rest }, ref) {
    return <input ref={ref} className={cn(CONTROL, focusRing, "focus-visible:border-sky-500/50", className)} {...rest} />;
  }
);

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  function Select({ className, children, ...rest }, ref) {
    return <select ref={ref} className={cn(CONTROL, focusRing, "focus-visible:border-sky-500/50", className)} {...rest}>{children}</select>;
  }
);

/* Accessible search input with a leading icon and a label. */
export function SearchInput({
  value, onChange, placeholder = "Search…", label = "Search",
}: { value: string; onChange: (v: string) => void; placeholder?: string; label?: string }) {
  const id = useId();
  return (
    <div className="relative">
      <label htmlFor={id} className="sr-only">{label}</label>
      <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
      </svg>
      <input
        id={id} type="search" role="searchbox" value={value}
        onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className={cn(CONTROL, focusRing, "focus-visible:border-sky-500/50", "pl-9")}
      />
    </div>
  );
}

/* ── Metric tile ── */
export function StatTile({
  label, value, sub, icon: Icon, tone = "neutral",
}: { label: string; value: ReactNode; sub?: string; icon?: LucideIcon; tone?: BadgeTone }) {
  return (
    <div className="rounded-md border border-border bg-card p-4">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
        {Icon && <Icon className={cn("h-4 w-4", TONE_TEXT[tone])} aria-hidden />}
      </div>
      <p className="text-2xl font-semibold tabular-nums text-foreground">{value}</p>
      {sub && <p className="mt-1 text-[11px] text-muted-foreground">{sub}</p>}
    </div>
  );
}

/* ── Badge / status ── */
export type BadgeTone = "neutral" | "success" | "warning" | "danger" | "info";
const TONE_BG: Record<BadgeTone, string> = {
  neutral: "bg-muted text-foreground border-border",
  success: "bg-neutral-500/10 text-neutral-700 dark:text-neutral-300 border-neutral-500/30",
  warning: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30",
  danger: "bg-red-500/10 text-red-700 dark:text-red-300 border-red-500/30",
  info: "bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/30",
};
const TONE_TEXT: Record<BadgeTone, string> = {
  neutral: "text-muted-foreground", success: "text-neutral-400", warning: "text-amber-400",
  danger: "text-red-400", info: "text-sky-400",
};
const TONE_DOT: Record<BadgeTone, string> = {
  neutral: "bg-muted", success: "bg-neutral-500", warning: "bg-amber-500",
  danger: "bg-red-500", info: "bg-sky-500",
};

export function Badge({ tone = "neutral", children }: { tone?: BadgeTone; children: ReactNode }) {
  return (
    <span className={cn("inline-flex items-center rounded border px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide", TONE_BG[tone])}>
      {children}
    </span>
  );
}

export function StatusPill({ tone = "neutral", children }: { tone?: BadgeTone; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
      <span className={cn("h-1.5 w-1.5 rounded-full", TONE_DOT[tone])} aria-hidden />
      {children}
    </span>
  );
}

/* ── Empty state ── */
export function EmptyState({ icon: Icon, title, hint }: { icon?: LucideIcon; title: string; hint?: string }) {
  return (
    <div className="px-4 py-10 text-center">
      {Icon && <Icon className="mx-auto mb-2 h-6 w-6 text-muted-foreground" aria-hidden />}
      <p className="text-[13px] text-muted-foreground">{title}</p>
      {hint && <p className="mt-1 text-[11px] text-muted-foreground">{hint}</p>}
    </div>
  );
}

/* ── Data table primitives ── */
/** Keyboard-scrollable region wrapper (horizontal overflow stays reachable). */
export function TableScroll({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div role="region" aria-label={label} tabIndex={0} className={cn("overflow-x-auto", focusRing)}>
      {children}
    </div>
  );
}
export function Table({ caption, className, children, ...rest }: TableHTMLAttributes<HTMLTableElement> & { caption: string }) {
  return (
    <table className={cn("w-full border-collapse text-[13px]", className)} {...rest}>
      <caption className="sr-only">{caption}</caption>
      {children}
    </table>
  );
}
export function Th({ className, children, ...rest }: HTMLAttributes<HTMLTableCellElement>) {
  return (
    <th scope="col" className={cn("border-b border-border px-3 py-2 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground", className)} {...rest}>
      {children}
    </th>
  );
}
export function Td({ className, children, ...rest }: HTMLAttributes<HTMLTableCellElement>) {
  return <td className={cn("border-b border-border/60 px-3 py-2.5 text-foreground", className)} {...rest}>{children}</td>;
}
