import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import {
  Users, FileText, Activity, AlertTriangle, RefreshCw, Shield,
  Zap, Code, Timer, CheckCircle2,
} from "lucide-react";
import {
  PageHeader, Panel, PanelHeader, StatTile, Badge, StatusPill, EmptyState,
  Button, Table, Th, Td, TableScroll, type BadgeTone,
} from "@/components/admin/ui";

const VIOLATION_META: Record<string, { label: string; tone: BadgeTone }> = {
  tab_switch: { label: "Tab", tone: "warning" },
  copy_paste: { label: "Copy", tone: "danger" },
  context_menu: { label: "R-click", tone: "warning" },
};

const DashboardHome = () => {
  const [stats, setStats] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [violations, setViolations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const [data, qs, vs] = await Promise.all([api.stats.get(), api.questions.list(), api.violations.list()]);
      setStats(data); setQuestions(qs); setViolations(vs);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div role="status" aria-live="polite" className="p-8 text-sm text-muted-foreground">Loading overview…</div>;

  const active = stats?.activeSession;
  const rapidQs = questions.filter((q) => q.mode === "RAPID").length;
  const codingQs = questions.filter((q) => q.mode === "CODING").length;
  const realtimeQs = questions.filter((q) => q.mode === "REALTIME").length;
  const leaderboard = stats?.leaderboard || [];
  const recentViolations = (violations || []).slice(0, 10);

  return (
    <div>
      <PageHeader
        title="Overview"
        description="Live operational summary."
        actions={
          <>
            <StatusPill tone="success">Live · refreshes every 5s</StatusPill>
            <Button size="sm" icon={RefreshCw} onClick={fetchStats}>Refresh</Button>
          </>
        }
      />

      {/* Active session */}
      {active ? (
        <Panel className="mb-5 border-neutral-500/30">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 animate-pulse rounded-full bg-neutral-500" aria-hidden />
              <div>
                <p className="text-sm font-medium text-foreground">{active.title}</p>
                <p className="text-[11px] text-muted-foreground">{active.mode} · {active.duration} min · {active.student_ids?.length || 0} students</p>
              </div>
            </div>
            <Badge tone="success">Live</Badge>
          </div>
          <dl className="grid grid-cols-2 divide-x divide-border sm:grid-cols-4">
            {[
              ["Mode", active.mode],
              ["Duration", `${active.duration}m`],
              ["Students", active.student_ids?.length || 0],
              ["Status", String(active.status).toUpperCase()],
            ].map(([k, v]) => (
              <div key={k} className="px-4 py-3">
                <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">{k}</dt>
                <dd className="mt-0.5 text-sm font-semibold tabular-nums text-foreground">{v}</dd>
              </div>
            ))}
          </dl>
        </Panel>
      ) : (
        <Panel className="mb-5">
          <EmptyState title="No active session" hint="Go to Sessions to create and start one." />
        </Panel>
      )}

      {/* Primary metrics */}
      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatTile icon={Users} tone="info" label="Students" value={stats?.totalStudents || 0} sub="Registered" />
        <StatTile icon={FileText} tone="neutral" label="Questions" value={questions.length} sub={`${rapidQs} rapid · ${codingQs} coding · ${realtimeQs} real-time`} />
        <StatTile icon={Activity} tone="success" label="Submissions" value={stats?.totalSubmissions || 0} sub="Total processed" />
        <StatTile icon={Shield} tone={violations.length === 0 ? "success" : "danger"} label="Violations" value={violations.length} sub={violations.length === 0 ? "None logged" : "Integrity events"} />
      </div>

      {/* Mode breakdown */}
      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          { icon: Zap, label: "Rapid", count: rapidQs, tone: "warning" as BadgeTone },
          { icon: Code, label: "Coding", count: codingQs, tone: "info" as BadgeTone },
          { icon: Timer, label: "Real-time", count: realtimeQs, tone: "danger" as BadgeTone },
        ].map((m) => (
          <Panel key={m.label} className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-muted">
              <m.icon className="h-5 w-5 text-foreground" aria-hidden />
            </div>
            <div>
              <p className="text-2xl font-semibold tabular-nums text-foreground">{m.count}</p>
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{m.label} questions</p>
            </div>
          </Panel>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Leaderboard */}
        <Panel>
          <PanelHeader title="Leaderboard" actions={<span className="text-[11px] tabular-nums text-muted-foreground">{leaderboard.length} ranked</span>} />
          {leaderboard.length === 0 ? (
            <EmptyState title="No results yet" />
          ) : (
            <TableScroll label="Leaderboard">
              <div className="max-h-64 overflow-y-auto">
                <Table caption="Student leaderboard by score">
                  <thead className="sticky top-0 bg-muted">
                    <tr>
                      <Th className="w-14">Rank</Th>
                      <Th>Student</Th>
                      <Th>Roll</Th>
                      <Th className="text-right">Score</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((s: any, i: number) => (
                      <tr key={s.id} className="hover:bg-muted/20">
                        <Td className={`font-semibold tabular-nums ${i === 0 ? "text-amber-600 dark:text-amber-400" : i === 1 ? "text-foreground" : i === 2 ? "text-orange-600 dark:text-orange-400" : "text-muted-foreground"}`}>#{i + 1}</Td>
                        <Td className="text-foreground">{s.name}</Td>
                        <Td className="font-mono text-[12px] text-muted-foreground">{s.roll}</Td>
                        <Td className="text-right font-semibold tabular-nums text-foreground">{s.score}</Td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </TableScroll>
          )}
        </Panel>

        {/* Integrity alerts */}
        <Panel>
          <PanelHeader
            title="Integrity Alerts"
            icon={AlertTriangle}
            actions={<Badge tone={violations.length === 0 ? "success" : "danger"}>{violations.length === 0 ? "Clear" : `${violations.length} events`}</Badge>}
          />
          {recentViolations.length === 0 ? (
            <EmptyState icon={CheckCircle2} title="No integrity events" hint="No violations have been recorded." />
          ) : (
            <ul className="max-h-64 divide-y divide-border overflow-y-auto">
              {recentViolations.map((v: any) => {
                const meta = VIOLATION_META[v.type] || { label: String(v.type || "").toUpperCase(), tone: "danger" as BadgeTone };
                return (
                  <li key={v.id} className="flex items-center gap-3 px-4 py-2.5">
                    <Badge tone={meta.tone}>{meta.label}</Badge>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] text-foreground">{v.team_name}</p>
                      {v.detail && <p className="truncate text-[11px] text-muted-foreground">{v.detail}</p>}
                    </div>
                    <time className="shrink-0 font-mono text-[10px] text-muted-foreground" dateTime={new Date(v.timestamp).toISOString()}>
                      {new Date(v.timestamp).toLocaleTimeString()}
                    </time>
                  </li>
                );
              })}
            </ul>
          )}
        </Panel>
      </div>
    </div>
  );
};

export default DashboardHome;
