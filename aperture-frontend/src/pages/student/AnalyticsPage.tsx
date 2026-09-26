import { useQuery } from "@tanstack/react-query";
import { meApi } from "@/lib/portalApi";
import {
  Card,
  SectionHeader,
  Skeleton,
  EmptyState,
  bandColor,
  Meter,
} from "@/components/portal/ui";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function heat(mastery: number) {
  if (mastery >= 80)
    return "bg-neutral-500/80 text-neutral-950 dark:text-neutral-50";
  if (mastery >= 60)
    return "bg-neutral-500/40 text-neutral-900 dark:text-neutral-100";
  if (mastery >= 40)
    return "bg-amber-500/40 text-amber-900 dark:text-amber-100";
  if (mastery > 0) return "bg-rose-500/40 text-rose-900 dark:text-rose-100";
  return "bg-muted/60 text-muted-foreground";
}

export default function AnalyticsPage() {
  const q = useQuery({
    queryKey: ["me", "analytics"],
    queryFn: meApi.analytics,
  });

  if (q.isLoading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-64" />
        ))}
      </div>
    );
  }
  const a = q.data!;
  const band = bandColor(a.readiness.band);
  const compRows = [
    { label: "Coding Skills", value: a.readiness.components.coding },
    { label: "Aptitude", value: a.readiness.components.aptitude },
    { label: "Consistency", value: a.readiness.components.consistency },
    { label: "Participation", value: a.readiness.components.participation },
    { label: "Growth Trend", value: a.readiness.components.trend },
  ];

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Analytics"
        subtitle="Your skills, growth, and career readiness"
      />

      {/* Readiness engine */}
      <Card className="p-6">
        <div className="grid md:grid-cols-3 gap-6 items-center">
          <div className="text-center md:border-r md:border-border/60">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Career Readiness
            </p>
            <div className="flex items-end justify-center gap-1.5 mt-2">
              <span className={`text-5xl font-bold tabular-nums ${band.text}`}>
                {a.readiness.score}
              </span>
              <span className="text-muted-foreground mb-2">/100</span>
            </div>
            <p className={`text-sm font-medium mt-1 ${band.text}`}>
              {a.readiness.band}
            </p>
          </div>
          <div className="md:col-span-2 space-y-3">
            {compRows.map((c) => (
              <div key={c.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{c.label}</span>
                  <span className="text-foreground tabular-nums">
                    {c.value}
                  </span>
                </div>
                <Meter value={c.value} barClass={band.bar} />
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Skill radar */}
        <Card className="p-5">
          <SectionHeader title="Skill Radar" subtitle="Six core competencies" />
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={a.radar} outerRadius="72%">
              <PolarGrid stroke="#2a2a2a" />
              <PolarAngleAxis
                dataKey="axis"
                tick={{ fill: "#9ca3af", fontSize: 10 }}
              />
              <PolarRadiusAxis
                domain={[0, 100]}
                tick={{ fill: "#525252", fontSize: 9 }}
                axisLine={false}
              />
              <Radar
                dataKey="value"
                stroke="#adadad"
                fill="#adadad"
                fillOpacity={0.25}
              />
              <Tooltip
                contentStyle={{
                  background: "#171717",
                  border: "1px solid #333",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </Card>

        {/* Performance trends */}
        <Card className="p-5">
          <SectionHeader
            title="Performance Trends"
            subtitle="Score & coding accuracy over time"
          />
          {a.trends.length < 2 ? (
            <EmptyState
              title="Not enough data yet"
              hint="Complete a few assessments to see your growth curve."
            />
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <LineChart
                data={a.trends}
                margin={{ top: 8, right: 8, left: -18, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#232323" />
                <XAxis
                  dataKey="label"
                  tick={{ fill: "#737373", fontSize: 10 }}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fill: "#737373", fontSize: 10 }}
                />
                <Tooltip
                  contentStyle={{
                    background: "#171717",
                    border: "1px solid #333",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  labelFormatter={(l, p) => p?.[0]?.payload?.session || l}
                />
                <Line
                  type="monotone"
                  dataKey="avg_score"
                  name="Avg Score"
                  stroke="#adadad"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="coding_accuracy"
                  name="Coding Accuracy"
                  stroke="#22d3ee"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Card>
      </div>

      {/* Topic heatmap */}
      <Card className="p-5">
        <SectionHeader
          title="Topic Heatmap"
          subtitle="Mastery by topic — darker green is stronger"
        />
        {a.heatmap.length === 0 ? (
          <EmptyState
            title="No topic data yet"
            hint="Solve questions across topics to build your heatmap."
          />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
            {a.heatmap.map((t) => (
              <div
                key={t.topic}
                className={`rounded-lg p-3 ${heat(t.mastery)}`}
              >
                <p className="text-xs font-medium truncate">{t.topic}</p>
                <p className="text-lg font-bold tabular-nums mt-1">
                  {t.mastery}%
                </p>
                <p className="text-[10px] opacity-80">
                  {t.correct}/{t.attempted} solved
                </p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
