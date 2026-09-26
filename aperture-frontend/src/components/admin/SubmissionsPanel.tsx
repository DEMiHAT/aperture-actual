import React, { useState, useEffect, useRef, useCallback } from "react";
import { api, subscribeToUpdates } from "@/lib/api";
import { Code, RefreshCw, X, Volume2, VolumeX, Radio, ChevronDown, ChevronUp, AlertCircle, CheckCircle, CheckCircle2, XCircle, Loader2 } from "lucide-react";

const V_COLORS: Record<string, string> = {
  passed: "text-neutral-600 dark:text-neutral-400 bg-neutral-400/10 border-neutral-500/20",
  failed: "text-red-600 dark:text-red-400 bg-red-400/10 border-red-500/20",
  wrong_answer: "text-red-600 dark:text-red-400 bg-red-400/10 border-red-500/20",
  runtime_error: "text-orange-600 dark:text-orange-400 bg-orange-400/10 border-orange-500/20",
  time_limit: "text-orange-600 dark:text-orange-400 bg-orange-400/10 border-orange-500/20",
  memory_limit: "text-orange-600 dark:text-orange-400 bg-orange-400/10 border-orange-500/20",
  running: "text-blue-600 dark:text-blue-400 bg-blue-400/10 border-blue-500/20",
  compile_error: "text-muted-foreground bg-muted/10 border-border/20",
};

const V_ICONS: Record<string, any> = {
  passed: CheckCircle2,
  failed: XCircle,
  wrong_answer: XCircle,
  runtime_error: AlertCircle,
  time_limit: AlertCircle,
  memory_limit: AlertCircle,
  running: Loader2,
  compile_error: AlertCircle,
};

const V_LABELS: Record<string, string> = {
  passed: "PASSED",
  failed: "FAILED",
  wrong_answer: "WRONG ANSWER",
  runtime_error: "RUNTIME ERROR",
  time_limit: "TIME LIMIT",
  memory_limit: "MEMORY LIMIT",
  running: "RUNNING",
  compile_error: "COMPILE ERROR",
};

const SubmissionsPanel = () => {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [verdictFilter, setVerdictFilter] = useState<string | null>(null);
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const [selectedSub, setSelectedSub] = useState<any | null>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [newCount, setNewCount] = useState(0);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const lastCountRef = useRef(0);
  const feedRef = useRef<HTMLDivElement>(null);

  const fetchSubmissions = useCallback(async () => {
    try {
      const list = await api.codeSubmissions.list();
      setSubmissions(list);

      // Track new submissions for pulse indicator
      if (list.length > lastCountRef.current && lastCountRef.current > 0) {
        const diff = list.length - lastCountRef.current;
        setNewCount(prev => prev + diff);

        // Play notification sound for new submissions
        if (soundEnabled) {
          try {
            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.value = 800;
            gain.gain.value = 0.1;
            osc.start();
            osc.stop(ctx.currentTime + 0.1);
          } catch {}
        }
      }
      lastCountRef.current = list.length;
    } catch (e) {
      console.error(e);
    }
  }, [soundEnabled]);

  // SSE-driven real-time updates
  useEffect(() => {
    fetchSubmissions();

    const unsub = subscribeToUpdates(() => {
      fetchSubmissions();
    });

    return () => unsub();
  }, [fetchSubmissions]);

  // Auto-scroll to top when new submissions come in
  useEffect(() => {
    if (autoScroll && feedRef.current) {
      feedRef.current.scrollTop = 0;
    }
  }, [submissions, autoScroll]);

  // Reset new count after 5 seconds
  useEffect(() => {
    if (newCount > 0) {
      const t = setTimeout(() => setNewCount(0), 5000);
      return () => clearTimeout(t);
    }
  }, [newCount]);

  const filtered = verdictFilter
    ? submissions.filter((s) => s.status === verdictFilter)
    : submissions;

  const viewCode = async (id: string) => {
    try {
      const sub = await api.codeSubmissions.get(id);
      setSelectedCode(sub.code || "No code available");
      setSelectedSub(sub);
    } catch {
      setSelectedCode("Failed to load code");
    }
  };

  const timeAgo = (ts: string) => {
    const diff = (Date.now() - new Date(ts).getTime()) / 1000;
    if (diff < 5) return "just now";
    if (diff < 60) return `${Math.floor(diff)}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  // Counts per status
  const statusCounts = submissions.reduce((acc, s) => {
    acc[s.status] = (acc[s.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-5">
      {/* Header with live indicator */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2.5">
            Live Submissions
            <span className="flex items-center gap-1.5 text-[10px] font-medium text-neutral-600 dark:text-neutral-400 bg-neutral-400/10 border border-neutral-500/20 px-2 py-0.5 rounded-full">
              <Radio className="w-3 h-3 animate-pulse" />
              REAL-TIME
            </span>
            {newCount > 0 && (
              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-400/10 border border-blue-500/20 px-2 py-0.5 rounded-full animate-bounce">
                +{newCount} NEW
              </span>
            )}
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            All code submissions — auto-refreshes via SSE · {submissions.length} total
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-lg border transition-colors ${
              soundEnabled
                ? "border-neutral-500/30 text-neutral-600 dark:text-neutral-400 bg-neutral-400/5"
                : "border-border/60 text-muted-foreground hover:text-muted-foreground"
            }`}
            title={soundEnabled ? "Mute notifications" : "Enable sound notifications"}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => setAutoScroll(!autoScroll)}
            className={`p-2 rounded-lg border text-xs transition-colors ${
              autoScroll
                ? "border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-400/5"
                : "border-border/60 text-muted-foreground hover:text-muted-foreground"
            }`}
            title={autoScroll ? "Disable auto-scroll" : "Enable auto-scroll"}
          >
            {autoScroll ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={fetchSubmissions}
            className="p-2 rounded-lg border border-border/60 text-muted-foreground hover:text-foreground transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Status filter chips with counts */}
      <div className="flex gap-1.5 flex-wrap">
        {[
          { value: null, label: "All", count: submissions.length },
          { value: "passed", label: "Passed", count: statusCounts["passed"] || 0 },
          { value: "failed", label: "Failed", count: statusCounts["failed"] || 0 },
          { value: "runtime_error", label: "Runtime Error", count: statusCounts["runtime_error"] || 0 },
          { value: "time_limit", label: "Time Limit", count: statusCounts["time_limit"] || 0 },
          { value: "memory_limit", label: "Memory Limit", count: statusCounts["memory_limit"] || 0 },
          { value: "running", label: "Running", count: statusCounts["running"] || 0 },
          { value: "compile_error", label: "Compile Error", count: statusCounts["compile_error"] || 0 },
        ].map((v) => (
          <button
            key={v.value ?? "all"}
            onClick={() => setVerdictFilter(v.value)}
            className={`px-3 py-1.5 rounded-lg text-xs transition-all flex items-center gap-1.5 ${
              verdictFilter === v.value
                ? "bg-muted text-foreground border border-border/50"
                : "text-muted-foreground hover:text-foreground border border-transparent"
            }`}
          >
            {v.label}
            {v.count > 0 && (
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                verdictFilter === v.value ? "bg-muted text-foreground" : "bg-muted/60 text-muted-foreground"
              }`}>
                {v.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Submissions feed */}
      <div
        ref={feedRef}
        className="rounded-xl border border-border/60 bg-card/30 overflow-hidden max-h-[calc(100vh-320px)] overflow-y-auto"
      >
        {submissions.length === 0 ? (
          <div className="p-12 text-center">
            <Loader2 className="w-8 h-8 text-muted-foreground mx-auto mb-3 animate-spin" />
            <p className="text-sm text-muted-foreground">Waiting for submissions…</p>
            <p className="text-[11px] text-muted-foreground mt-1">Submissions will appear here in real-time as students submit code</p>
          </div>
        ) : filtered.length === 0 ? (
          <p className="p-8 text-sm text-muted-foreground text-center">No submissions match this filter</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="sticky top-0 z-10 bg-card/95 backdrop-blur-md">
              <tr className="text-[10px] text-muted-foreground uppercase tracking-wider border-b border-border/60">
                <th className="text-left px-4 py-3 font-medium w-8"></th>
                <th className="text-left px-4 py-3 font-medium">Student</th>
                <th className="text-left px-4 py-3 font-medium">Problem</th>
                <th className="text-center px-4 py-3 font-medium">Verdict</th>
                <th className="text-center px-4 py-3 font-medium">Tests</th>
                <th className="text-left px-4 py-3 font-medium">Time</th>
                <th className="text-center px-4 py-3 font-medium">Review</th>
                <th className="text-right px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, idx) => {
                const StatusIcon = V_ICONS[s.status] || AlertCircle;
                const isNew = idx < newCount && newCount > 0;
                const isExpanded = expandedRow === s.id;

                return (
                  <React.Fragment key={s.id}>
                    <tr
                      className={`border-t border-border/40 transition-all cursor-pointer ${
                        isNew ? "bg-blue-500/5 animate-pulse" : "hover:bg-muted/20"
                      } ${isExpanded ? "bg-muted/30" : ""}`}
                      onClick={() => setExpandedRow(isExpanded ? null : s.id)}
                    >
                      <td className="px-4 py-3">
                        <StatusIcon
                          className={`w-4 h-4 ${
                            s.status === "running" ? "animate-spin text-blue-600 dark:text-blue-400" : V_COLORS[s.status]?.split(" ")[0] || "text-muted-foreground"
                          }`}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-foreground font-medium">{s.team_name}</p>
                      </td>
                      <td className="px-4 py-3 text-foreground max-w-[200px] truncate">{s.question_title}</td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg border ${
                            V_COLORS[s.status] || "text-muted-foreground bg-muted/10 border-border/20"
                          }`}
                        >
                          {V_LABELS[s.status] || s.status?.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-xs text-muted-foreground tabular-nums font-mono">
                          <span className={s.passed_count === s.total_count && s.total_count > 0 ? "text-neutral-600 dark:text-neutral-400 font-bold" : ""}>
                            {s.passed_count}
                          </span>
                          /{s.total_count}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs ${isNew ? "text-blue-600 dark:text-blue-400 font-medium" : "text-muted-foreground"}`}>
                          {s.submitted_at ? timeAgo(s.submitted_at) : "—"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {s.review_status ? (
                          <span
                            className={`text-[10px] font-medium px-2 py-0.5 rounded ${
                              s.review_status === "accepted"
                                ? "text-neutral-600 dark:text-neutral-400 bg-neutral-400/10"
                                : s.review_status === "rejected"
                                ? "text-red-600 dark:text-red-400 bg-red-400/10"
                                : s.review_status === "pending_review"
                                ? "text-amber-600 dark:text-amber-400 bg-amber-400/10"
                                : "text-muted-foreground bg-muted/10"
                            }`}
                          >
                            {s.review_status === "pending_review" ? "PENDING" : s.review_status?.toUpperCase()}
                          </span>
                        ) : (
                          <span className="text-[10px] text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            viewCode(s.id);
                          }}
                          className="p-1.5 rounded hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-colors"
                          title="View code"
                        >
                          <Code className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>

                    {/* Expanded row with error details */}
                    {isExpanded && (
                      <tr className="bg-card/60">
                        <td colSpan={8} className="px-6 py-4">
                          <div className="space-y-3">
                            {/* Error message */}
                            {s.error_message && (
                              <div className="rounded-lg bg-red-500/5 border border-red-500/10 p-3">
                                <p className="text-[10px] text-red-600 dark:text-red-400 uppercase tracking-wider font-medium mb-1">Error</p>
                                <pre className="text-xs text-red-700 dark:text-red-300/80 font-mono whitespace-pre-wrap">{s.error_message}</pre>
                              </div>
                            )}
                            {/* Test results summary */}
                            {s.test_results && s.test_results.length > 0 && (
                              <div className="space-y-1.5">
                                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Test Results</p>
                                <div className="flex gap-1.5 flex-wrap">
                                  {s.test_results.map((tr: any, i: number) => (
                                    <span
                                      key={i}
                                      className={`text-[10px] px-2 py-1 rounded font-mono ${
                                        tr.passed
                                          ? "text-neutral-600 dark:text-neutral-400 bg-neutral-400/10 border border-neutral-500/20"
                                          : "text-red-600 dark:text-red-400 bg-red-400/10 border border-red-500/20"
                                      }`}
                                    >
                                      TC#{i + 1} {tr.passed ? "✓" : "✗"}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                            {/* Meta info */}
                            <div className="flex gap-4 text-[10px] text-muted-foreground">
                              <span>ID: <span className="font-mono text-muted-foreground">{s.id?.slice(0, 8)}</span></span>
                              <span>Language: <span className="text-muted-foreground">{s.language_id}</span></span>
                              {s.points_awarded > 0 && (
                                <span>Points: <span className="text-neutral-600 dark:text-neutral-400 font-medium">+{s.points_awarded}</span></span>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Code viewer modal */}
      {selectedCode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => { setSelectedCode(null); setSelectedSub(null); }}>
          <div className="w-[700px] max-h-[80vh] rounded-xl border border-border/60 bg-card/95 backdrop-blur-xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="px-5 py-3 border-b border-border/60 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{selectedSub?.team_name || "Code"}</p>
                <p className="text-[11px] text-muted-foreground">{selectedSub?.question_title || "Submission"}</p>
              </div>
              <div className="flex items-center gap-2">
                {selectedSub && selectedSub.review_status !== "accepted" && selectedSub.status !== "running" && (
                  <button
                    onClick={async (e) => {
                      e.stopPropagation();
                      if (window.confirm("Approve this submission as correct and award points?")) {
                        try {
                          await api.codeSubmissions.review(selectedSub.id, "accepted");
                          fetchSubmissions();
                          setSelectedCode(null);
                          setSelectedSub(null);
                        } catch (err) {
                          console.error(err);
                        }
                      }
                    }}
                    className="px-2.5 py-1 bg-neutral-500/10 hover:bg-neutral-500/20 text-neutral-600 dark:text-neutral-400 border border-neutral-500/30 rounded text-xs font-medium transition-colors flex items-center gap-1.5"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    Approve as Correct
                  </button>
                )}
                {selectedSub?.status && (
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${V_COLORS[selectedSub.status] || ""}`}>
                    {V_LABELS[selectedSub.status] || selectedSub.status}
                  </span>
                )}
                <button onClick={() => { setSelectedCode(null); setSelectedSub(null); }} className="text-muted-foreground hover:text-muted-foreground transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <pre className="text-xs text-foreground font-mono leading-relaxed p-5 overflow-auto max-h-[60vh] whitespace-pre-wrap" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace" }}>
              {selectedCode}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmissionsPanel;
