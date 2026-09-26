import { analytics, history, readiness } from "@/demo/fixtures";
export type HistoryRow = (typeof history)[number];
export interface SessionCard {
  id: string;
  title: string;
  faculty: string;
  mode: string;
  type: string;
  duration: number;
  date: string;
  status: string;
  can_join: boolean;
}
const sampleSession: SessionCard = {
  id: "session-1",
  title: "Data Structures · Week 04",
  faculty: "Dr. Priya Menon",
  mode: "CODING",
  type: "CODING",
  duration: 45,
  date: "2026-09-20T09:00:00Z",
  status: "waiting_room_open",
  can_join: true,
};
export const meApi = {
  overview: async () => ({
    name: "Aarav Sharma",
    department: "Computer Science",
    year: "III Year",
    section: "A",
    roll: "CSE2401",
    last_login_at: null,
    readiness,
    stats: {
      assessments_completed: 12,
      problems_solved: 48,
      average_score: 84,
      rank: 3,
      attendance: 100,
    },
  }),
  sessions: async () => ({
    live: [],
    waiting_room_open: [sampleSession],
    upcoming: [
      {
        ...sampleSession,
        id: "session-2",
        title: "Analytical Reasoning",
        status: "upcoming",
        duration: 30,
      },
    ],
    completed: [],
    missed: [],
  }),
  activity: async () => [
    {
      title: "Data structures assessment completed",
      at: "2026-09-20T09:45:00Z",
    },
    { title: "Coding readiness updated", at: "2026-09-20T09:46:00Z" },
    { title: "New assessment assigned", at: "2026-09-21T09:00:00Z" },
  ],
  history: async () => history,
  analytics: async () => analytics,
  join: async (_id: string) => ({ team: { id: "demo" } }),
};
