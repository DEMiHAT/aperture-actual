import { memo, useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  GraduationCap,
  LayoutDashboard,
  Pause,
  Play,
  RotateCcw,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import { BeaconLogo } from "@/components/BeaconLogo";
import DashboardPage from "@/pages/student/DashboardPage";
import HistoryPage from "@/pages/student/AssessmentHistoryPage";
import AnalyticsPage from "@/pages/student/AnalyticsPage";
import DashboardHome from "@/components/admin/DashboardHome";
import SubmissionsPanel from "@/components/admin/SubmissionsPanel";
import AnalyticsPanel from "@/components/admin/AnalyticsPanel";
import { submissions } from "./fixtures";
import "./tour.css";

type Audience = "student" | "faculty";
type Scene =
  | "dashboard"
  | "coding"
  | "history"
  | "skills"
  | "setup"
  | "overview"
  | "submissions"
  | "analytics";
type Step = {
  scene: Scene;
  nav: string;
  label: string;
  title: string;
  body: string;
  detail: string;
  camera: [number, number, number];
  focus: [number, number, number, number];
};
const student: Step[] = [
  {
    scene: "dashboard",
    nav: "Dashboard",
    label: "YOUR WORKSPACE",
    title: "Know what’s next.",
    body: "Assigned sessions, recent activity and your career readiness are together in your student dashboard.",
    detail: "No hunting for links or assessment codes.",
    camera: [1, 0, 0],
    focus: [232, 144, 860, 150],
  },
  {
    scene: "dashboard",
    nav: "Dashboard",
    label: "ASSIGNED ASSESSMENTS",
    title: "Your session is ready.",
    body: "The assessment assigned by your faculty appears in Your Sessions. When the waiting room opens, you can join directly.",
    detail: "Coding · 45 minutes · Assigned by faculty",
    camera: [1.23, -205, -160],
    focus: [238, 423, 554, 147],
  },
  {
    scene: "coding",
    nav: "Assessment",
    label: "THE ASSESSMENT",
    title: "Read. Solve. Run.",
    body: "Work in the built-in editor and run your solution against test cases. Python, C++, Java and JavaScript are supported.",
    detail: "Watch a sample solution appear and its test results return.",
    camera: [1.12, -105, -37],
    focus: [560, 167, 518, 400],
  },
  {
    scene: "history",
    nav: "Assessments",
    label: "AFTER SUBMISSION",
    title: "A record you can return to.",
    body: "Assessment history keeps your score, percentile and outcome alongside the session and faculty details.",
    detail: "Results stay connected to the assessment that produced them.",
    camera: [1.12, -136, -44],
    focus: [239, 248, 848, 278],
  },
  {
    scene: "skills",
    nav: "Analytics",
    label: "CAREER READINESS",
    title: "See what goes into readiness.",
    body: "Coding, aptitude, consistency, participation and growth contribute to the readiness view. The score is shown with its component signals.",
    detail: "A sample score illustrates the interface, not a hiring guarantee.",
    camera: [1.18, -161, -62],
    focus: [238, 185, 850, 243],
  },
  {
    scene: "skills",
    nav: "Analytics",
    label: "SKILLS & GROWTH",
    title: "Find the next thing to improve.",
    body: "The skill radar and performance history make strengths and changes visible. Topic mastery helps you identify what to practise next.",
    detail: "From an individual result to a longer view of progress.",
    camera: [1.17, -152, -232],
    focus: [239, 454, 850, 323],
  },
];
const faculty: Step[] = [
  {
    scene: "overview",
    nav: "Dashboard",
    label: "FACULTY WORKSPACE",
    title: "Start with the live session.",
    body: "The overview brings the active session, students, submissions and integrity alerts into one operational view.",
    detail: "A fictional six-student cohort is loaded for this walkthrough.",
    camera: [1, 0, 0],
    focus: [239, 178, 850, 162],
  },
  {
    scene: "setup",
    nav: "Sessions",
    label: "SESSION SETUP",
    title: "Choose how to assess.",
    body: "Beacon supports Rapid aptitude questions, Coding problems and mixed Real-time assessments. Choose the mode, duration and target cohort.",
    detail: "This demonstration selects a 45-minute Coding session.",
    camera: [1.12, -121, -37],
    focus: [240, 185, 850, 247],
  },
  {
    scene: "setup",
    nav: "Sessions",
    label: "THE QUESTION SET",
    title: "Give the session a clear scope.",
    body: "Build the paper from the question repository and assign it to the relevant students. The sample session uses three data-structure problems.",
    detail: "Question set → cohort → waiting room → live assessment",
    camera: [1.18, -163, -202],
    focus: [242, 431, 846, 243],
  },
  {
    scene: "submissions",
    nav: "Submissions",
    label: "DURING THE ASSESSMENT",
    title: "Follow the work as it arrives.",
    body: "The submissions feed shows the student, problem, verdict and passed test cases. Faculty can review the code behind a result.",
    detail: "Passed and wrong-answer results remain visible together.",
    camera: [1.12, -128, -76],
    focus: [241, 282, 852, 365],
  },
  {
    scene: "overview",
    nav: "Dashboard",
    label: "INTEGRITY REVIEW",
    title: "Review events in context.",
    body: "Focus changes and other integrity events are recorded alongside the session. An event is a signal to review, not proof of misconduct.",
    detail: "The sample alert shows a window-focus change for review.",
    camera: [1.25, -278, -237],
    focus: [677, 495, 413, 197],
  },
  {
    scene: "analytics",
    nav: "Analytics",
    label: "AFTER THE SESSION",
    title: "Read the cohort’s results.",
    body: "Analytics brings submission outcomes, participation and student performance together so faculty can review the cohort after an assessment.",
    detail: "Use the results to plan the next assessment or follow-up.",
    camera: [1.08, -89, -38],
    focus: [240, 187, 848, 323],
  },
];
const client = new QueryClient({
  defaultOptions: {
    queries: { staleTime: Infinity, retry: false, refetchOnWindowFocus: false },
  },
});
const duration = 8500;
function CodingScene({ elapsed }: { elapsed: number }) {
  const code = submissions[0].code;
  const typed = code.slice(0, Math.min(code.length, Math.floor(elapsed / 19)));
  return (
    <div className="demo-coding">
      <div className="demo-title">
        <div>
          <small>CODING ASSESSMENT</small>
          <h2>Data Structures · Week 04</h2>
        </div>
        <span>
          00:
          {Math.max(0, 45 - Math.floor(elapsed / 1000))
            .toString()
            .padStart(2, "0")}{" "}
          remaining
        </span>
      </div>
      <div className="demo-code-columns">
        <div className="demo-problem">
          <span className="demo-pill">01 / 03 · EASY</span>
          <h3>Two Sum</h3>
          <p>
            Given an array of integers and a target, return the indices of the
            two numbers that add up to the target.
          </p>
          <h4>Example</h4>
          <pre>
            Input: nums = [2, 7, 11, 15]
            <br />
            target = 9<br />
            <br />
            Output: [0, 1]
          </pre>
          <h4>Constraints</h4>
          <p>
            Each input has exactly one solution.
            <br />
            You may not use the same element twice.
          </p>
          <span className="demo-pill">Arrays</span>{" "}
          <span className="demo-pill">Hash maps</span>
        </div>
        <div className="demo-editor">
          <div className="demo-editor-top">
            <span>solution.py</span>
            <span>Python 3</span>
          </div>
          <pre>
            <code>
              {typed}
              <span className="demo-caret">▎</span>
            </code>
          </pre>
          <div className="demo-code-actions">
            <span>Run code</span>
            <span>Submit solution</span>
          </div>
          <div className="demo-test-results">
            <span>TEST RESULTS</span>
            {elapsed > 4500 ? (
              [1, 2, 3, 4].map((n) => (
                <div key={n}>
                  <Check size={13} />
                  Test case {n}
                  <b>Passed</b>
                </div>
              ))
            ) : (
              <p>
                {elapsed > 3500
                  ? "Running test cases…"
                  : "Test cases will appear here."}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
function SetupScene({ elapsed }: { elapsed: number }) {
  return (
    <div className="demo-setup">
      <div className="demo-title">
        <div>
          <h2>Create session</h2>
          <p>Configure an assessment for your students.</p>
        </div>
        <span className="demo-pill">Draft · Demo</span>
      </div>
      <label>
        Session title<div>Data Structures · Week 04</div>
      </label>
      <div className="demo-mode-row">
        {["Rapid", "Coding", "Real-time"].map((name) => (
          <div key={name} className={name === "Coding" ? "chosen" : ""}>
            <Code2 size={19} />
            <b>{name}</b>
            <small>
              {name === "Rapid"
                ? "MCQ & aptitude"
                : name === "Coding"
                  ? "Problems & test cases"
                  : "A mixed timed session"}
            </small>
            {name === "Coding" && <Check size={15} />}
          </div>
        ))}
      </div>
      <div className="demo-fields">
        <label>
          Duration<div>45 minutes</div>
        </label>
        <label>
          Target cohort<div>Computer Science · III Year · A</div>
        </label>
      </div>
      <div className="demo-question-list">
        <div>
          <h3>Question set</h3>
          <span>3 selected</span>
        </div>
        {["Two Sum", "Balanced Brackets", "Binary Search"].map((name, i) => (
          <div key={name}>
            <Check size={14} />
            <b>{name}</b>
            <span>{i === 1 ? "Medium" : "Easy"}</span>
            <small>{[25, 40, 35][i]} points</small>
          </div>
        ))}
      </div>
      <div className="demo-session-ready">
        <ShieldCheck size={18} />
        <span>
          {elapsed > 4000
            ? "Session prepared. Waiting room ready to open."
            : "Checking cohort and question set…"}
        </span>
      </div>
    </div>
  );
}
const ProductScene = memo(function ProductScene({
  scene,
  elapsed,
}: {
  scene: Scene;
  elapsed: number;
}) {
  switch (scene) {
    case "dashboard":
      return <DashboardPage />;
    case "history":
      return <HistoryPage />;
    case "skills":
      return <AnalyticsPage />;
    case "overview":
      return <DashboardHome />;
    case "submissions":
      return <SubmissionsPanel />;
    case "analytics":
      return <AnalyticsPanel />;
    case "coding":
      return <CodingScene elapsed={elapsed} />;
    case "setup":
      return <SetupScene elapsed={elapsed} />;
  }
});
function ProductFrame({
  step,
  audience,
  elapsed,
}: {
  step: Step;
  audience: Audience;
  elapsed: number;
}) {
  const reduce = useReducedMotion();
  const wrapper = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(900);
  useEffect(() => {
    const observer = new ResizeObserver((entries) =>
      setWidth(entries[0].contentRect.width),
    );
    if (wrapper.current) observer.observe(wrapper.current);
    return () => observer.disconnect();
  }, []);
  const nav =
    audience === "student"
      ? [
          "Home",
          "Dashboard",
          "Assessments",
          "Analytics",
          "F.L.A.R.E. Report",
          "Rankings",
          "Feedback",
          "Achievements",
          "Profile",
        ]
      : [
          "Dashboard",
          "Sessions",
          "Live Proctoring",
          "Help Requests",
          "Students",
          "Question Repository",
          "Topics",
          "Submissions",
          "Analytics",
        ];
  const mobile = width < 620;
  const fit = width / 1120;
  const camera = reduce ? [1, 0, 0] : step.camera;
  // On narrow screens crop away the sidebar, keeping the actual content readable.
  const mobileScale = width / 880;
  return (
    <div ref={wrapper} className={`tour-stage ${mobile ? "narrow" : ""}`}>
      <div
        className="tour-fit"
        style={{
          transform: `scale(${mobile ? mobileScale : fit})`,
          width: 1120,
          height: 760,
        }}
      >
        <motion.div
          className="tour-camera"
          animate={{
            scale: mobile ? 1 : camera[0],
            x: mobile ? -220 : camera[1],
            y: mobile ? -Math.max(0, step.focus[1] - 150) : camera[2],
          }}
          transition={{ duration: reduce ? 0 : 1.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="demo-app dark" {...{ inert: "" }}>
            <aside className="demo-sidebar">
              <BeaconLogo fontSize={29} />
              <small>
                {audience === "student"
                  ? "STUDENT WORKSPACE"
                  : "FACULTY WORKSPACE"}
              </small>
              {nav.map((name, i) => (
                <div key={name} className={name === step.nav ? "active" : ""}>
                  {i === 0 ? (
                    <LayoutDashboard size={15} />
                  ) : i % 2 ? (
                    <Code2 size={15} />
                  ) : (
                    <Users size={15} />
                  )}
                  <span>{name}</span>
                </div>
              ))}
              <footer>
                <span className="demo-user">
                  {audience === "student" ? "AS" : "PM"}
                </span>
                <div>
                  {audience === "student" ? "Aarav Sharma" : "Dr. Priya Menon"}
                  <small>
                    {audience === "student"
                      ? "Computer Science · III Year"
                      : "Faculty · Computer Science"}
                  </small>
                </div>
              </footer>
            </aside>
            <div className="demo-body">
              <div className="demo-top">
                <span>
                  Workspace <span>/</span> {step.nav}
                </span>
                <span className="demo-pill">Sample workspace</span>
              </div>
              <div className="demo-content">
                <ProductScene
                  scene={step.scene}
                  elapsed={
                    step.scene === "coding" || step.scene === "setup"
                      ? elapsed
                      : 0
                  }
                />
              </div>
            </div>
          </div>
          {!reduce && (
            <motion.div
              className="tour-focus"
              animate={{
                left: step.focus[0],
                top: step.focus[1],
                width: step.focus[2],
                height: step.focus[3],
                opacity: elapsed > 1000 ? 0.8 : 0,
              }}
              transition={{ duration: 1.2 }}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}
export default function BeaconTour() {
  const [params, setParams] = useSearchParams();
  const initial = params.get("tour");
  const [audience, setAudience] = useState<Audience | null>(
    initial === "student" || initial === "faculty" ? initial : null,
  );
  const [index, setIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [paused, setPaused] = useState(false);
  const [finished, setFinished] = useState(false);
  const [hidden, setHidden] = useState(document.hidden);
  const reduce = useReducedMotion();
  const steps = audience === "faculty" ? faculty : student;
  const step = steps[index];
  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);
  useEffect(() => {
    if (!audience || paused || finished || hidden) return;
    let last = performance.now();
    const timer = window.setInterval(() => {
      const now = performance.now();
      const delta = now - last;
      last = now;
      setElapsed((value) => value + delta);
    }, 80);
    return () => clearInterval(timer);
  }, [audience, paused, finished, hidden]);
  useEffect(() => {
    if (elapsed < duration) return;
    if (index === steps.length - 1) {
      setFinished(true);
      setElapsed(duration);
    } else {
      setIndex((i) => i + 1);
      setElapsed(0);
    }
  }, [elapsed, index, steps.length]);
  const start = (role: Audience) => {
    window.scrollTo(0, 0);
    setAudience(role);
    setParams({ tour: role }, { replace: true });
    setIndex(0);
    setElapsed(0);
    setFinished(false);
    setPaused(false);
  };
  const exit = () => {
    window.scrollTo(0, 0);
    setAudience(null);
    setParams({}, { replace: true });
    setIndex(0);
    setElapsed(0);
    setFinished(false);
  };
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key === "Escape") exit();
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, []);
  return (
    <QueryClientProvider client={client}>
      <div className="beacon-tour">
        <header className="tour-header">
          <Link to="/" className="tour-back">
            <ArrowLeft size={16} />
            <span>Aperture Intelligence</span>
          </Link>
          <BeaconLogo fontSize={27} />
          <span className="tour-header-note">PRODUCT WALKTHROUGH</span>
        </header>
        {!audience ? (
          <main className="tour-lobby">
            <div className="tour-intro">
              <span className="tour-kicker">
                BEACON, FROM BOTH SIDES OF THE DESK
              </span>
              <h1>
                See how an assessment
                <br />
                <span>comes together.</span>
              </h1>
              <p>
                Step inside the student workspace or the faculty console.
                <br />
                Choose a tour. We’ll take it from there.
              </p>
            </div>
            <div className="tour-choices">
              <button onClick={() => start("student")}>
                <div className="choice-preview student-preview">
                  <div>
                    <GraduationCap size={21} />
                    <span>STUDENT WORKSPACE</span>
                  </div>
                  <strong>Good morning, Aarav.</strong>
                  <div className="choice-stats">
                    <span>
                      <b>
                        84<span>/100</span>
                      </b>
                      Career readiness
                    </span>
                    <span>
                      <b>12</b>Assessments completed
                    </span>
                  </div>
                  <div className="choice-session">
                    <span>
                      <i />
                      Data Structures · Week 04
                    </span>
                    <span>
                      Join session <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
                <div className="choice-description">
                  <h2>Your progress, in view.</h2>
                  <p>
                    Join an assessment, solve a problem and follow the results
                    into your skill profile.
                  </p>
                  <span className="choice-action">
                    Explore student <ArrowUpRight size={20} />
                  </span>
                </div>
              </button>
              <button onClick={() => start("faculty")}>
                <div className="choice-preview faculty-preview">
                  <div>
                    <LayoutDashboard size={19} />
                    <span>FACULTY WORKSPACE</span>
                  </div>
                  <strong>One session. A complete view.</strong>
                  <div className="choice-stats">
                    <span>
                      <b>06</b>Students assigned
                    </span>
                    <span>
                      <b>12</b>Submissions received
                    </span>
                  </div>
                  <div className="choice-session">
                    <span>
                      <i />
                      Data Structures · Week 04
                    </span>
                    <span>
                      Live session <ShieldCheck size={12} />
                    </span>
                  </div>
                </div>
                <div className="choice-description">
                  <h2>From setup to review.</h2>
                  <p>
                    Prepare a session, follow submissions and understand the
                    cohort’s results.
                  </p>
                  <span className="choice-action">
                    Explore faculty <ArrowUpRight size={20} />
                  </span>
                </div>
              </button>
            </div>
            <div className="tour-lobby-foot">
              <span>
                <Play size={12} />
                Automatic guided tours · About one minute each
              </span>
              <span>No account needed · Fictional sample data</span>
            </div>
          </main>
        ) : (
          <main className="tour-player">
            <div className="tour-player-heading">
              <div>
                <span className="tour-kicker">
                  EXPLORE {audience.toUpperCase()}
                </span>
                <h1>
                  {audience === "student"
                    ? "The student journey."
                    : "The faculty workflow."}
                </h1>
              </div>
              <button onClick={exit} className="tour-exit">
                <X size={15} />
                Exit tour
              </button>
            </div>
            <div className="tour-theatre">
              <div className="tour-screen-wrap">
                <div className="tour-window-bar">
                  <span>
                    <i />
                    <i />
                    <i />
                  </span>
                  <span>
                    beacon / {audience} / {step.nav.toLowerCase()}
                  </span>
                  <span>DEMO</span>
                </div>
                <ProductFrame
                  step={step}
                  audience={audience}
                  elapsed={elapsed}
                />
                <div className="tour-screen-caption">
                  <ShieldCheck size={12} />
                  Frontend preview · Fictional sample data
                </div>
              </div>
              <aside
                className="tour-narration"
                aria-live="polite"
                aria-atomic="true"
              >
                <div className="tour-chapter-count">
                  <span>0{index + 1}</span>
                  <span>/ 0{steps.length}</span>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${audience}-${index}`}
                    initial={{ opacity: 0, x: reduce ? 0 : 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: reduce ? 0 : -8 }}
                    transition={{ duration: 0.4 }}
                  >
                    <span className="tour-kicker">{step.label}</span>
                    <h2>{step.title}</h2>
                    <p>{step.body}</p>
                    <div className="tour-note">
                      <span /> {step.detail}
                    </div>
                  </motion.div>
                </AnimatePresence>
                <div className="tour-auto-label">
                  <span className={paused ? "paused" : ""} />
                  {finished
                    ? "Tour complete"
                    : paused
                      ? "Playback paused"
                      : "Playing automatically"}
                </div>
              </aside>
            </div>
            <div className="tour-transport">
              <div className="tour-play-controls">
                <button
                  onClick={() =>
                    finished ? start(audience) : setPaused((p) => !p)
                  }
                  aria-label={
                    finished
                      ? "Replay tour"
                      : paused
                        ? "Resume tour"
                        : "Pause tour"
                  }
                >
                  {finished ? (
                    <RotateCcw size={18} />
                  ) : paused ? (
                    <Play size={18} />
                  ) : (
                    <Pause size={18} />
                  )}
                </button>
                <button
                  onClick={() => start(audience)}
                  aria-label="Restart tour"
                >
                  <RotateCcw size={15} />
                </button>
              </div>
              <div className="tour-timeline">
                {steps.map((item, i) => (
                  <div key={i} className={i === index ? "current" : ""}>
                    <div>
                      <i
                        style={{
                          width: `${i < index ? 100 : i === index ? Math.min(100, (elapsed / duration) * 100) : 0}%`,
                        }}
                      />
                    </div>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
              <span className="tour-time">
                {Math.min(51, Math.floor((index * duration + elapsed) / 1000))
                  .toString()
                  .padStart(2, "0")}{" "}
                / 51s
              </span>
            </div>
            {finished && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="tour-complete"
              >
                <div>
                  <Check size={22} />
                  <span>You’ve seen the {audience} workspace.</span>
                </div>
                <button
                  onClick={() =>
                    start(audience === "student" ? "faculty" : "student")
                  }
                >
                  Explore {audience === "student" ? "faculty" : "student"}
                  <ArrowRight size={16} />
                </button>
                <a href="mailto:support@apertureintelligence.in">
                  Talk to Aperture <ArrowUpRight size={16} />
                </a>
              </motion.div>
            )}
          </main>
        )}
      </div>
    </QueryClientProvider>
  );
}
