import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { meApi, type HistoryRow } from "@/lib/portalApi";
import {
  Card,
  SectionHeader,
  Skeleton,
  EmptyState,
  StatusPill,
} from "@/components/portal/ui";
import { Search, ArrowUpDown, ChevronRight } from "lucide-react";

type SortKey = "date" | "percentage" | "percentile" | "title";

export default function AssessmentHistoryPage() {
  const navigate = useNavigate();
  const q = useQuery({ queryKey: ["me", "history"], queryFn: meApi.history });
  const [search, setSearch] = useState("");
  const [result, setResult] = useState<
    "all" | "passed" | "attempted" | "missed"
  >("all");
  const [sort, setSort] = useState<SortKey>("date");
  const [asc, setAsc] = useState(false);

  const rows = useMemo(() => {
    let r = [...(q.data || [])];
    if (search)
      r = r.filter(
        (x) =>
          x.title.toLowerCase().includes(search.toLowerCase()) ||
          x.faculty.toLowerCase().includes(search.toLowerCase()),
      );
    if (result !== "all") r = r.filter((x) => x.result === result);
    r.sort((a, b) => {
      let d = 0;
      if (sort === "date")
        d = new Date(a.date).getTime() - new Date(b.date).getTime();
      else if (sort === "title") d = a.title.localeCompare(b.title);
      else d = (a[sort] as number) - (b[sort] as number);
      return asc ? d : -d;
    });
    return r;
  }, [q.data, search, result, sort, asc]);

  const toggleSort = (k: SortKey) => {
    if (sort === k) setAsc(!asc);
    else {
      setSort(k);
      setAsc(false);
    }
  };

  const Th = ({
    k,
    label,
    className = "",
  }: {
    k: SortKey;
    label: string;
    className?: string;
  }) => (
    <th className={`px-4 py-3 font-medium ${className}`}>
      <button
        onClick={() => toggleSort(k)}
        className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
      >
        {label} <ArrowUpDown className="w-3 h-3 opacity-50" />
      </button>
    </th>
  );

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Assessment History"
        subtitle="Every assessment you've taken"
      />

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or faculty…"
            className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-card/40 border border-border/60 text-sm text-foreground focus:outline-none focus:border-border placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "passed", "attempted", "missed"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setResult(r)}
              className={`px-3 py-2 rounded-lg text-xs capitalize transition-colors border ${result === r ? "bg-muted/70 text-foreground border-border/50" : "text-muted-foreground border-transparent hover:text-foreground"}`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {q.isLoading ? (
        <Skeleton className="h-64" />
      ) : rows.length === 0 ? (
        <EmptyState
          title="No assessments found"
          hint={
            search || result !== "all"
              ? "Try clearing your filters."
              : "Completed assessments will appear here."
          }
        />
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-[10px] uppercase tracking-wider text-muted-foreground border-b border-border/60">
                <tr>
                  <Th k="title" label="Assessment" />
                  <th className="px-4 py-3 font-medium hidden md:table-cell">
                    Faculty
                  </th>
                  <Th k="date" label="Date" className="hidden sm:table-cell" />
                  <Th k="percentage" label="Score" />
                  <Th
                    k="percentile"
                    label="Percentile"
                    className="hidden sm:table-cell"
                  />
                  <th className="px-4 py-3 font-medium">Result</th>
                  <th className="px-2 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {rows.map((r: HistoryRow) => (
                  <tr
                    key={r.session_id}
                    onClick={() => navigate(`/app/assessments/${r.session_id}`)}
                    className="hover:bg-muted/20 cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-3">
                      <p className="text-foreground font-medium">{r.title}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                        {r.mode}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                      {r.faculty}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">
                      {new Date(r.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-foreground tabular-nums font-medium">
                        {r.percentage}%
                      </span>
                      <span className="text-[10px] text-muted-foreground ml-1">
                        ({r.score}/{r.max})
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground tabular-nums hidden sm:table-cell">
                      {r.result === "missed" ? "—" : `${r.percentile}th`}
                    </td>
                    <td className="px-4 py-3">
                      <StatusPill status={r.result} />
                    </td>
                    <td className="px-2 py-3 text-muted-foreground">
                      <ChevronRight className="w-4 h-4" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
