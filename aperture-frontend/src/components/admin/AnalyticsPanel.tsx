import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { BarChart3, Users, Target, RefreshCw, TrendingUp, Clock, Shield, AlertTriangle, Activity, Award, Zap, Code, Timer, CheckCircle2, XCircle, Hash } from "lucide-react";

const AnalyticsPanel = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);
  const [violations, setViolations] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [st, sub, q, v, sess] = await Promise.all([
        api.teams.list(), api.codeSubmissions.list(), api.questions.list(),
        api.violations.list(), api.sessions.list(),
      ]);
      setStudents(st); setSubmissions(sub); setQuestions(q); setViolations(v); setSessions(sess);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  // ── Computed stats ──
  const totalStudents = students.length;
  const totalSubmissions = submissions.length;
  const passedCount = submissions.filter(s => s.status === "passed").length;
  const failedCount = submissions.filter(s => s.status === "failed" || s.status === "runtime_error").length;
  const runningCount = submissions.filter(s => s.status === "running").length;
  const passRate = totalSubmissions > 0 ? Math.round((passedCount / totalSubmissions) * 100) : 0;
  const avgScore = totalStudents > 0 ? Math.round(students.reduce((sum, s) => sum + (s.balance || 0), 0) / totalStudents) : 0;
  const topScore = totalStudents > 0 ? Math.max(...students.map(s => s.balance || 0)) : 0;
  const totalViolations = violations.length;
  const totalSessions = sessions.length;
  const activeSessions = sessions.filter(s => s.status === "running").length;

  // Question stats
  const rapidQs = questions.filter(q => q.mode === "RAPID").length;
  const codingQs = questions.filter(q => q.mode === "CODING").length;
  const realtimeQs = questions.filter(q => q.mode === "REALTIME").length;

  // Violation breakdown
  const tabSwitches = violations.filter(v => v.type === "tab_switch").length;
  const copyPastes = violations.filter(v => v.type === "copy_paste").length;
  const contextMenus = violations.filter(v => v.type === "context_menu").length;
  const tabCloses = violations.filter(v => v.type === "tab_close").length;

  // Per-student leaderboard
  const studentStats = students.map(st => {
    const subs = submissions.filter(s => s.team_id === st.id);
    const passed = subs.filter(s => s.status === "passed").length;
    const myViolations = violations.filter(v => v.team_id === st.id).length;
    return { id: st.id, name: st.team_name, roll: st.member_1, score: st.balance || 0, submissions: subs.length, passed, violations: myViolations };
  }).sort((a, b) => b.score - a.score);

  // Difficulty distribution
  const easyQs = questions.filter(q => q.difficulty_label === "Easy").length;
  const mediumQs = questions.filter(q => q.difficulty_label === "Medium").length;
  const hardQs = questions.filter(q => q.difficulty_label === "Hard").length;

  // Session history
  const endedSessions = sessions.filter(s => s.status === "ended").length;

  const StatCard = ({ label, value, sub, icon: Icon, color }: { label: string; value: any; sub?: string; icon: any; color: string }) => (
    <div className="rounded-xl border border-border/60 bg-card/30 p-4 group hover:bg-muted/20 transition-colors">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">{label}</p>
          <p className="text-2xl font-bold text-foreground mt-1 tabular-nums">{value}</p>
          {sub && <p className="text-[10px] text-muted-foreground mt-1">{sub}</p>}
        </div>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
    </div>
  );

  const BarGraph = ({ label, value, total, color }: { label: string; value: number; total: number; color: string }) => (
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted-foreground w-20 shrink-0 text-right">{label}</span>
      <div className="flex-1 h-3 rounded-full bg-muted/60 overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: total > 0 ? `${Math.max(2, (value / total) * 100)}%` : "0%" }} />
      </div>
      <span className="text-xs text-muted-foreground tabular-nums w-8 text-right">{value}</span>
    </div>
  );

  if (loading) return <div className="p-12 text-center text-muted-foreground animate-pulse">Loading telemetry…</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Analytics Command</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Full-spectrum operational telemetry — live data</p>
        </div>
        <button onClick={fetchData} className="p-2 rounded-lg border border-border/60 text-muted-foreground hover:text-foreground transition-colors"><RefreshCw className="w-3.5 h-3.5" /></button>
      </div>

      {/* ── Primary KPIs ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        <StatCard label="Personnel" value={totalStudents} sub="Registered students" icon={Users} color="text-blue-600 dark:text-blue-400 bg-blue-400/10" />
        <StatCard label="Submissions" value={totalSubmissions} sub={`${passedCount} AC / ${failedCount} WA`} icon={Activity} color="text-neutral-600 dark:text-neutral-400 bg-neutral-400/10" />
        <StatCard label="Pass Rate" value={`${passRate}%`} sub={passRate >= 70 ? "Healthy" : "Below threshold"} icon={Target} color={passRate >= 70 ? "text-neutral-600 dark:text-neutral-400 bg-neutral-400/10" : "text-amber-600 dark:text-amber-400 bg-amber-400/10"} />
        <StatCard label="Avg Score" value={avgScore} sub={`Top: ${topScore}`} icon={TrendingUp} color="text-purple-600 dark:text-purple-400 bg-purple-400/10" />
        <StatCard label="Violations" value={totalViolations} sub={totalViolations === 0 ? "Clean" : "Infractions detected"} icon={Shield} color={totalViolations === 0 ? "text-neutral-600 dark:text-neutral-400 bg-neutral-400/10" : "text-red-600 dark:text-red-400 bg-red-400/10"} />
        <StatCard label="Sessions" value={totalSessions} sub={`${activeSessions} active · ${endedSessions} ended`} icon={Clock} color="text-cyan-600 dark:text-cyan-400 bg-cyan-400/10" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* ── Submission Status ── */}
        <div className="rounded-xl border border-border/60 bg-card/30">
          <div className="px-4 py-3 border-b border-border/60">
            <h3 className="text-sm font-medium text-foreground flex items-center gap-2"><Target className="w-3.5 h-3.5 text-muted-foreground" /> Submission Status</h3>
          </div>
          <div className="p-4 space-y-3">
            <BarGraph label="Passed" value={passedCount} total={totalSubmissions} color="bg-neutral-500/70" />
            <BarGraph label="Failed" value={failedCount} total={totalSubmissions} color="bg-red-500/70" />
            <BarGraph label="Running" value={runningCount} total={totalSubmissions} color="bg-blue-500/70" />
          </div>
        </div>

        {/* ── Arsenal Distribution ── */}
        <div className="rounded-xl border border-border/60 bg-card/30">
          <div className="px-4 py-3 border-b border-border/60">
            <h3 className="text-sm font-medium text-foreground flex items-center gap-2"><Hash className="w-3.5 h-3.5 text-muted-foreground" /> Arsenal Distribution</h3>
          </div>
          <div className="p-4 space-y-3">
            <BarGraph label="RAPID" value={rapidQs} total={questions.length} color="bg-amber-500/70" />
            <BarGraph label="CODING" value={codingQs} total={questions.length} color="bg-blue-500/70" />
            <BarGraph label="REALTIME" value={realtimeQs} total={questions.length} color="bg-rose-500/70" />
            <div className="border-t border-border/40 pt-3 mt-3">
              <BarGraph label="Easy" value={easyQs} total={questions.length} color="bg-neutral-500/60" />
              <div className="h-2" />
              <BarGraph label="Medium" value={mediumQs} total={questions.length} color="bg-amber-500/60" />
              <div className="h-2" />
              <BarGraph label="Hard" value={hardQs} total={questions.length} color="bg-red-500/60" />
            </div>
          </div>
        </div>

        {/* ── Violation Heatmap ── */}
        <div className="rounded-xl border border-border/60 bg-card/30">
          <div className="px-4 py-3 border-b border-border/60">
            <h3 className="text-sm font-medium text-foreground flex items-center gap-2"><AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> Threat Analysis</h3>
          </div>
          <div className="p-4 space-y-3">
            <BarGraph label="Tab Switch" value={tabSwitches} total={totalViolations || 1} color="bg-amber-500/70" />
            <BarGraph label="Copy/Paste" value={copyPastes} total={totalViolations || 1} color="bg-red-500/70" />
            <BarGraph label="Right-Click" value={contextMenus} total={totalViolations || 1} color="bg-orange-500/70" />
            <BarGraph label="Tab Close" value={tabCloses} total={totalViolations || 1} color="bg-red-500/70" />
          </div>
          {totalViolations === 0 && <p className="px-4 pb-4 text-[11px] text-neutral-600 dark:text-neutral-400/60">✓ Zero infractions — perimeter secure</p>}
        </div>
      </div>

      {/* ── Leaderboard ── */}
      <div className="rounded-xl border border-border/60 bg-card/30">
        <div className="px-4 py-3 border-b border-border/60 flex items-center justify-between">
          <h3 className="text-sm font-medium text-foreground flex items-center gap-2"><Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> Personnel Ranking</h3>
          <span className="text-[10px] text-muted-foreground font-mono">{studentStats.length} OPERATIVES</span>
        </div>
        {studentStats.length === 0 ? (
          <p className="px-4 py-6 text-xs text-muted-foreground text-center">No personnel data</p>
        ) : (
          <div className="divide-y divide-border max-h-80 overflow-y-auto">
            {studentStats.map((s, i) => (
              <div key={s.id} className="px-4 py-3 flex items-center justify-between hover:bg-muted/20 transition-colors">
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-bold w-7 text-center tabular-nums ${
                    i === 0 ? "text-amber-600 dark:text-amber-400" : i === 1 ? "text-muted-foreground" : i === 2 ? "text-orange-600 dark:text-orange-400" : "text-muted-foreground"
                  }`}>
                    #{i + 1}
                  </span>
                  <div>
                    <p className="text-sm text-foreground font-medium">{s.name}</p>
                    <p className="text-[10px] text-muted-foreground font-mono">
                      {s.roll} · {s.submissions} subs · {s.passed} AC
                      {s.violations > 0 && <span className="text-red-600 dark:text-red-400 ml-2">⚠ {s.violations} violations</span>}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {s.violations > 0 && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-500/10 text-red-600 dark:text-red-400 font-medium">FLAGGED</span>
                  )}
                  <span className="text-lg font-bold text-foreground tabular-nums w-16 text-right">{s.score}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Session History ── */}
      <div className="rounded-xl border border-border/60 bg-card/30">
        <div className="px-4 py-3 border-b border-border/60">
          <h3 className="text-sm font-medium text-foreground flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-muted-foreground" /> Session Audit Log</h3>
        </div>
        {sessions.length === 0 ? (
          <p className="px-4 py-6 text-xs text-muted-foreground text-center">No sessions recorded</p>
        ) : (
          <div className="divide-y divide-border max-h-48 overflow-y-auto">
            {sessions.map((s) => (
              <div key={s.id} className="px-4 py-2.5 flex items-center gap-3">
                <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${
                  s.status === "running" ? "text-neutral-600 dark:text-neutral-400 bg-neutral-400/10 border-neutral-400/20" :
                  s.status === "paused" ? "text-amber-600 dark:text-amber-400 bg-amber-400/10 border-amber-400/20" :
                  s.status === "ended" ? "text-muted-foreground bg-muted/10 border-border/20" :
                  "text-blue-600 dark:text-blue-400 bg-blue-400/10 border-blue-400/20"
                }`}>
                  {s.status?.toUpperCase()}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-foreground truncate">{s.title}</p>
                  <p className="text-[10px] text-muted-foreground">{s.mode} · {s.duration}min · {s.student_ids?.length || 0} students</p>
                </div>
                <span className="text-[10px] text-muted-foreground font-mono shrink-0">{new Date(s.created_at).toLocaleString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsPanel;
