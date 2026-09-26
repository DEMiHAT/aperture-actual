import {
  students,
  questions,
  sessions,
  submissions,
  violations,
} from "@/demo/fixtures";
export const api = {
  stats: {
    get: async () => ({
      activeSession: sessions[0],
      totalStudents: students.length,
      totalSubmissions: submissions.length,
      leaderboard: students,
    }),
  },
  teams: { list: async () => students },
  questions: { list: async () => questions },
  violations: { list: async () => violations },
  sessions: { list: async () => sessions },
  codeSubmissions: {
    list: async () => submissions,
    get: async (id: string) =>
      submissions.find((s) => s.id === id) ?? submissions[0],
    review: async (_id: string, _decision: string) => ({ ok: true }),
  },
};
export const subscribeToUpdates = (_callback: () => void) => () => {};
