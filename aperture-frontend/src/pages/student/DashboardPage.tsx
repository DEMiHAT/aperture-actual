import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { meApi, type SessionCard } from "@/lib/portalApi";
import { useAuth } from "@/contexts/AuthContext";
import {
  Card,
  StatTile,
  SectionHeader,
  EmptyState,
  Skeleton,
  StatusPill,
  bandColor,
  Meter,
} from "@/components/portal/ui";
import {
  CalendarClock,
  Clock,
  User2,
  ArrowRight,
  Activity,
} from "lucide-react";
import { toast } from "sonner";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { setTeam } = useAuth();
  const [joining, setJoining] = useState<string | null>(null);

  const overview = useQuery({
    queryKey: ["me", "overview"],
    queryFn: meApi.overview,
  });
  const sessions = useQuery({
    queryKey: ["me", "sessions"],
    queryFn: meApi.sessions,
  });
  const activity = useQuery({
    queryKey: ["me", "activity"],
    queryFn: meApi.activity,
  });

  // Codeless join: server re-validates eligibility, then we bridge into the
  // existing exam runtime by handing the returned team to the legacy context.
  const join = async (s: SessionCard) => {
    setJoining(s.id);
    try {
      const { team } = await meApi.join(s.id);
      setTeam(team);
      navigate("/portal");
    } catch (e: any) {
      toast.error(e.message || "Unable to join this assessment");
    } finally {
      setJoining(null);
    }
  };

  const o = overview.data;
  const band = bandColor(o?.readiness.band || "");
  const greeting = (() => {
    const h = new Date().getHours();
    return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
  })();

  const joinable = [
    ...(sessions.data?.live || []),
    ...(sessions.data?.waiting_room_open || []),
  ];
  const upcoming = sessions.data?.upcoming || [];

  return (
    <div className="space-y-8">
      {/* ── Welcome + readiness ── */}
      {overview.isLoading ? (
        <Skeleton className="h-32" />
      ) : (
        <Card className="p-6 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                {greeting}
              </p>
              <h1 className="text-2xl font-semibold text-foreground mt-1">
                {o?.name}
              </h1>
              <p className="text-sm text-muted-foreground mt-1.5">
                {[
                  o?.department,
                  o?.year && `${o.year}`,
                  o?.section && `Sec ${o.section}`,
                  o?.roll && `Roll ${o.roll}`,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
              {o?.last_login_at && (
                <p className="text-[11px] text-muted-foreground mt-1">
                  Last login {new Date(o.last_login_at).toLocaleString()}
                </p>
              )}
            </div>
            <div
              className={`shrink-0 rounded-xl px-5 py-4 ${band.bg} ring-1 ${band.ring} min-w-[200px]`}
            >
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Career Readiness
              </p>
              <div className="flex items-end gap-1.5 mt-1">
                <span
                  className={`text-3xl font-bold tabular-nums ${band.text}`}
                >
                  {o?.readiness.score}
                </span>
                <span className="text-sm text-muted-foreground mb-1">
                  / 100
                </span>
              </div>
              <Meter
                value={o?.readiness.score || 0}
                className="mt-2"
                barClass={band.bar}
              />
              <p className={`text-xs font-medium mt-2 ${band.text}`}>
                {o?.readiness.band}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* ── Quick stats ── */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {overview.isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))
        ) : (
          <>
            <StatTile
              label="Assessments"
              value={o?.stats.assessments_completed ?? 0}
              sub="completed"
            />
            <StatTile
              label="Problems Solved"
              value={o?.stats.problems_solved ?? 0}
              sub="all time"
              accent="text-neutral-600 dark:text-neutral-400"
            />
            <StatTile
              label="Avg Score"
              value={`${o?.stats.average_score ?? 0}%`}
              sub="across assessments"
            />
            <StatTile
              label="Rank"
              value={o?.stats.rank ? `#${o.stats.rank}` : "—"}
              sub="overall"
              accent="text-amber-600 dark:text-amber-400"
            />
            <StatTile
              label="Attendance"
              value={`${o?.stats.attendance ?? 0}%`}
              sub="participation"
              accent="text-cyan-600 dark:text-cyan-400"
            />
          </>
        )}
      </div>

      {/* ── Two-column: sessions + activity ── */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Sessions */}
        <div className="lg:col-span-2 space-y-4">
          <SectionHeader
            title="Your Sessions"
            subtitle="Assessments assigned to you — no code needed"
          />
          {sessions.isLoading ? (
            <Skeleton className="h-28" />
          ) : joinable.length === 0 && upcoming.length === 0 ? (
            <EmptyState
              title="No sessions right now"
              hint="Your faculty will assign assessments here. You'll be notified when one opens."
            />
          ) : (
            <div className="space-y-3">
              {joinable.map((s) => (
                <Card
                  key={s.id}
                  className="p-4 flex flex-col sm:flex-row sm:items-center gap-4 ring-1 ring-neutral-500/10"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-medium text-foreground truncate">
                        {s.title}
                      </h3>
                      <StatusPill status={s.status} />
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User2 className="w-3 h-3" /> {s.faculty}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {s.duration} min
                      </span>
                      <span className="uppercase tracking-wider">{s.type}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => join(s)}
                    disabled={joining === s.id}
                    className="shrink-0 flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-secondary text-foreground text-xs font-semibold uppercase tracking-wider hover:bg-foreground hover:text-background transition-colors disabled:opacity-40"
                  >
                    {joining === s.id ? (
                      "Joining…"
                    ) : (
                      <>
                        Join Session <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </Card>
              ))}
              {upcoming.map((s) => (
                <Card
                  key={s.id}
                  className="p-4 flex items-center gap-4 opacity-80"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-medium text-foreground truncate">
                        {s.title}
                      </h3>
                      <StatusPill status={s.status} />
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User2 className="w-3 h-3" /> {s.faculty}
                      </span>
                      <span className="flex items-center gap-1">
                        <CalendarClock className="w-3 h-3" /> {s.duration} min
                      </span>
                      <span className="uppercase tracking-wider">{s.type}</span>
                    </div>
                  </div>
                  <span className="text-[11px] text-muted-foreground">
                    Not open yet
                  </span>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Activity */}
        <div className="space-y-4">
          <SectionHeader title="Recent Activity" />
          <Card className="p-2">
            {activity.isLoading ? (
              <div className="p-3 space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-8" />
                ))}
              </div>
            ) : (activity.data?.length ?? 0) === 0 ? (
              <div className="p-6 text-center text-xs text-muted-foreground">
                No activity yet
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {activity.data!.slice(0, 12).map((a, i) => (
                  <li key={i} className="flex items-start gap-3 px-3 py-2.5">
                    <div className="mt-0.5 w-6 h-6 rounded-full bg-muted/70 flex items-center justify-center shrink-0">
                      <Activity className="w-3 h-3 text-muted-foreground" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-foreground truncate">
                        {a.title}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {new Date(a.at).toLocaleString()}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
