// Fictional fixtures only. This showcase has no connection to the Beacon backend.
export const people = [
  "Aarav Sharma",
  "Meera Iyer",
  "Rohan Das",
  "Ananya Rao",
  "Kabir Shah",
  "Nisha Patel",
];
export const readiness = {
  score: 84,
  band: "Career Ready" as const,
  components: {
    coding: 89,
    aptitude: 82,
    consistency: 86,
    participation: 92,
    trend: 74,
  },
  computed_at: "2026-09-20T10:00:00Z",
};
export const students = people.map((name, i) => ({
  id: `student-${i}`,
  team_name: name,
  name,
  member_1: `CSE${2401 + i}`,
  balance: 94 - i * 5,
  score: 94 - i * 5,
  roll: `CSE${2401 + i}`,
}));
export const questions = Array.from({ length: 24 }, (_, i) => ({
  id: `q-${i}`,
  title: ["Two Sum", "Balanced Brackets", "Binary Search"][i % 3],
  mode: ["CODING", "RAPID", "REALTIME"][i % 3],
  difficulty_label: ["Easy", "Medium", "Hard"][i % 3],
}));
export const sessions = [
  {
    id: "session-1",
    title: "Data Structures · Week 04",
    mode: "CODING",
    type: "CODING",
    faculty: "Dr. Priya Menon",
    duration: 45,
    status: "running",
    student_ids: students.map((s) => s.id),
    date: "2026-09-20T09:00:00Z",
  },
  {
    id: "session-2",
    title: "Analytical Reasoning",
    mode: "RAPID",
    duration: 30,
    status: "ended",
    student_ids: students.map((s) => s.id),
  },
  {
    id: "session-3",
    title: "Hiring Assessment Practice",
    mode: "REALTIME",
    duration: 60,
    status: "ended",
    student_ids: students.map((s) => s.id),
  },
];
export const violations = [
  {
    id: "event-1",
    team_id: "student-2",
    team_name: "Rohan Das",
    type: "tab_switch",
    detail: "Window focus changed · requires review",
    timestamp: "2026-09-20T09:18:32Z",
  },
];
export const submissions = students.flatMap((student, i) =>
  [0, 1].map((j) => ({
    id: `submission-${i}-${j}`,
    team_id: student.id,
    team_name: student.team_name,
    question_title: j ? "Balanced Brackets" : "Two Sum",
    status: i === 2 && j === 1 ? "wrong_answer" : "passed",
    passed_count: i === 2 && j === 1 ? 3 : 4,
    total_count: 4,
    submitted_at: "2026-09-20T09:20:00Z",
    language_id: "Python",
    points_awarded: 25,
    review_status: "accepted",
    code: "def two_sum(nums, target):\n    seen = {}\n    for i, value in enumerate(nums):\n        if target - value in seen:\n            return [seen[target - value], i]\n        seen[value] = i",
    test_results: [
      {
        passed: true,
        input: "[2, 7, 11, 15], 9",
        expected: "[0, 1]",
        actual: "[0, 1]",
      },
    ],
  })),
);
export const history = [
  "Data Structures · Week 04",
  "Analytical Reasoning",
  "Hiring Assessment Practice",
  "Arrays & Strings",
  "Coding Foundations",
].map((title, i) => ({
  session_id: `history-${i}`,
  title,
  mode: i === 1 ? "RAPID" : "CODING",
  faculty: "Dr. Priya Menon",
  date: `2026-09-${20 - i * 3}T09:00:00Z`,
  duration: 45,
  score: 91 - i * 4,
  max: 100,
  percentage: 91 - i * 4,
  percentile: 94 - i * 3,
  result: "passed" as "passed" | "attempted" | "missed",
}));
export const analytics = {
  readiness,
  avgScore: 84,
  radar: [
    "Coding",
    "Aptitude",
    "Speed",
    "Accuracy",
    "Consistency",
    "Participation",
  ].map((axis, i) => ({ axis, value: [89, 82, 75, 91, 86, 92][i] })),
  trends: ["Aug 12", "Aug 19", "Aug 26", "Sep 02", "Sep 09", "Sep 20"].map(
    (label, i) => ({
      label,
      session: "Coding Practice",
      date: label,
      avg_score: 60 + i * 6,
      coding_accuracy: 63 + i * 5,
      participation: 100,
    }),
  ),
  heatmap: [
    "Arrays",
    "Strings",
    "Hash maps",
    "Recursion",
    "Sorting",
    "Trees",
    "Graphs",
    "Dynamic programming",
    "SQL",
    "Complexity",
  ].map((topic, i) => ({
    topic,
    attempted: 10,
    correct: 9 - (i % 4),
    mastery: 90 - (i % 4) * 10,
  })),
};
