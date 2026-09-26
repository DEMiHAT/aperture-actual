import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Code2,
  FileCheck2,
  LayoutDashboard,
  Menu,
  Network,
  ShieldCheck,
  X,
} from "lucide-react";
import { BeaconLogo } from "@/components/BeaconLogo";
import "./aperture.css";

const email = "mailto:support@apertureintelligence.in";
function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
function Brand({ header = false }: { header?: boolean }) {
  return (
    <span className={`ap-brand ${header ? "ap-brand-header" : ""}`}>
      <img
        src="/brand/aperture-banner.png"
        alt={
          header
            ? "Aperture Intelligence"
            : "Aperture Intelligence Private Limited"
        }
        width="2172"
        height="724"
      />
    </span>
  );
}
function CTA({
  secondary = false,
  children,
  href,
}: {
  secondary?: boolean;
  children: ReactNode;
  href: string;
}) {
  return (
    <a className={`ap-button ${secondary ? "secondary" : ""}`} href={href}>
      {children}
      <ArrowUpRight size={15} />
    </a>
  );
}
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 30);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <header className={`ap-nav ${scrolled ? "scrolled" : ""}`}>
      <a href="#" aria-label="Aperture home">
        <Brand header />
      </a>
      <nav aria-label="Main navigation" className={open ? "open" : ""}>
        {[
          ["Products", "#beacon"],
          ["Technology", "#technology"],
          ["Company", "#company"],
          ["Contact", "#contact"],
        ].map(([name, href]) => (
          <a key={name} href={href} onClick={() => setOpen(false)}>
            {name}
          </a>
        ))}
      </nav>
      <CTA href={email}>Talk to us</CTA>
      <button
        className="ap-menu"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}
const skills = [
  ["Technical skills", 91],
  ["Problem solving", 86],
  ["Communication", 78],
] as const;
function SkillBars() {
  return (
    <div className="ap-skills">
      {skills.map(([name, score]) => (
        <div key={name}>
          <span>
            {name}
            <b>{score}</b>
          </span>
          <div className="ap-bar">
            <i style={{ width: `${score}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
function Radar() {
  return (
    <svg
      viewBox="0 0 220 180"
      role="img"
      aria-label="Competency graph: technical 91, problem solving 86, communication 78"
    >
      <g fill="none" stroke="#e2e2e2">
        {[1, 0.72, 0.44].map((s) => (
          <polygon
            key={s}
            points="110,15 185,65 156,150 64,150 35,65"
            transform={`translate(${110 * (1 - s)},${85 * (1 - s)}) scale(${s})`}
          />
        ))}
        <path d="M110 15V85L185 65M110 85L156 150M110 85L64 150M110 85L35 65" />
      </g>
      <polygon
        points="110,32 174,68 145,136 74,128 55,68"
        fill="#27272715"
        stroke="#636363"
        strokeWidth="1.5"
      />
      <g fill="#383838">
        {[
          [110, 32],
          [174, 68],
          [145, 136],
          [74, 128],
          [55, 68],
        ].map(([cx, cy]) => (
          <circle key={cx} cx={cx} cy={cy} r="3" />
        ))}
      </g>
    </svg>
  );
}
function BeaconPreview() {
  const [tab, setTab] = useState("Overview");
  return (
    <div className="ap-product">
      <aside className="ap-sidebar">
        <BeaconLogo fontSize={26} />
        <small>WORKSPACE</small>
        {["Overview", "Assessments", "Evidence", "Opportunities"].map(
          (item, i) => (
            <button
              key={item}
              className={tab === item ? "selected" : ""}
              onClick={() => setTab(item)}
            >
              {i === 0 ? (
                <LayoutDashboard size={14} />
              ) : i === 1 ? (
                <Code2 size={14} />
              ) : i === 2 ? (
                <FileCheck2 size={14} />
              ) : (
                <Network size={14} />
              )}
              {item}
            </button>
          ),
        )}
        <div className="ap-sidebar-bottom">
          <span className="ap-avatar tiny">AS</span>
          <span>
            Aarav Sharma<small>Student workspace</small>
          </span>
        </div>
      </aside>
      <div className="ap-workspace">
        <select
          className="ap-mobile-view"
          aria-label="Product preview view"
          value={tab}
          onChange={(event) => setTab(event.target.value)}
        >
          {["Overview", "Assessments", "Evidence", "Opportunities"].map(
            (item) => (
              <option key={item}>{item}</option>
            ),
          )}
        </select>
        <div className="ap-product-top">
          <span>
            Workspace <ChevronRight size={12} /> Student intelligence
          </span>
          <span className="ap-demo">Illustrative product preview</span>
        </div>
        <div className="ap-profile">
          <div>
            <span className="ap-overline">YOUR CAPABILITY, CONNECTED.</span>
            <h3>
              {tab === "Overview"
                ? "A clearer picture of potential."
                : tab === "Assessments"
                  ? "Every assessment. One journey."
                  : tab === "Evidence"
                    ? "Capability, backed by evidence."
                    : "Find your next opportunity."}
            </h3>
            <p>Welcome back, Aarav. Here’s where you stand.</p>
          </div>
          <span className="ap-avatar">AS</span>
        </div>
        {tab === "Overview" ? (
          <>
            <div className="ap-dashboard-grid">
              <div className="ap-score">
                <span>
                  Beacon Score <ArrowUpRight size={13} />
                </span>
                <strong>
                  842<span>/ 1000</span>
                </strong>
                <div className="ap-score-line">
                  <i />
                </div>
                <small>Demonstrated capability</small>
                <p>
                  <span className="ap-dot" /> A connected view of your progress
                </p>
              </div>
              <div className="ap-competencies">
                <span className="ap-panel-title">Competency overview</span>
                <SkillBars />
              </div>
              <div className="ap-radar">
                <span className="ap-panel-title">Capability profile</span>
                <Radar />
              </div>
            </div>
            <div className="ap-evidence">
              <div>
                <h4>Recent evidence</h4>
                <span>Assessment history</span>
              </div>
              {[
                [
                  "Data structures & algorithms",
                  "Coding assessment",
                  "91 / 100",
                ],
                ["Analytical reasoning", "Aptitude assessment", "86 / 100"],
              ].map(([name, type, score]) => (
                <div className="ap-evidence-row" key={name}>
                  <span className="ap-file">
                    <FileCheck2 size={17} />
                  </span>
                  <span>
                    <b>{name}</b>
                    <small>{type}</small>
                  </span>
                  <span className="ap-verified">
                    <Check size={11} /> Completed
                  </span>
                  <b>{score}</b>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="ap-tab-detail">
            <span className="ap-overline">{tab}</span>
            <h4>
              {tab === "Assessments"
                ? "Measure what you can do."
                : tab === "Evidence"
                  ? "A record of demonstrated skills."
                  : "Capability meets possibility."}
            </h4>
            {(tab === "Assessments"
              ? [
                  "Data structures & algorithms · 91 / 100",
                  "Analytical reasoning · 86 / 100",
                  "Communication · 78 / 100",
                ]
              : tab === "Evidence"
                ? [
                    "12 coding submissions · Evaluated",
                    "3 competency signals · Connected",
                    "Assessment integrity · Recorded",
                  ]
                : [
                    "Software engineering · Technical track",
                    "Data & analytics · Analytical track",
                    "Graduate opportunities · Explore fit",
                  ]
            ).map((text) => (
              <div className="ap-detail-row" key={text}>
                <Check size={16} />
                {text}
              </div>
            ))}
            <p>Fictional sample data for product illustration.</p>
          </div>
        )}
        <div className="ap-product-bottom">
          <span>
            <ShieldCheck size={12} /> Evidence-led intelligence
          </span>
          <span>ASSESS → UNDERSTAND → CONNECT</span>
        </div>
      </div>
    </div>
  );
}
function Hero() {
  return (
    <section className="ap-hero">
      <Reveal>
        <div className="ap-eyebrow ap-tagline">DECOUPLING HUMAN ERROR.</div>
        <h1>
          Intelligence,
          <br />
          <span>built into infrastructure.</span>
        </h1>
        <p>
          Aperture builds intelligent systems for education,
          <br className="ap-desktop" /> assessment and workforce opportunity.
        </p>
        <div className="ap-actions">
          <CTA href="#beacon">Explore Beacon</CTA>
          <a className="ap-text-link" href={email}>
            Talk to us <ArrowRight size={15} />
          </a>
        </div>
      </Reveal>
      <Reveal className="ap-preview-wrap">
        <BeaconPreview />
        <div className="ap-preview-caption">
          <span>From individual potential to meaningful opportunity.</span>
          <span>One connected system.</span>
        </div>
      </Reveal>
    </section>
  );
}
function ProblemSection() {
  return (
    <section className="ap-section ap-problem">
      <Reveal>
        <h2>
          Capability is everywhere.
          <br />
          <span>Evidence isn’t.</span>
        </h2>
        <div className="ap-problem-bottom">
          <div className="ap-wordline">
            <span>Capability</span>
            <i />
            <span>Evidence</span>
            <i />
            <span>Opportunity</span>
          </div>
          <p>
            Institutions have students. Companies have opportunities.
            Assessments generate data. But the connection between capability and
            opportunity remains fragmented.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
function BeaconSection() {
  return (
    <section className="ap-section ap-beacon" id="beacon">
      <Reveal>
        <div className="ap-section-heading">
          <div>
            <h2>
              Early-career hiring,
              <br />
              <span>rebuilt.</span>
            </h2>
          </div>
          <div>
            <p>
              Assessment, competency intelligence, evidence and opportunity.
              Finally, in one system.
            </p>
            <a href="/beacon" className="ap-text-link">
              Discover Beacon <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
        <div className="ap-beacon-canvas">
          <div className="ap-beacon-intro">
            <BeaconLogo fontSize={64} />
            <p>
              The Career & Hiring
              <br />
              Operating System.
            </p>
            <a href="/beacon">
              Explore the platform <ArrowUpRight size={17} />
            </a>
            <small>INSTITUTIONS / STUDENTS / COMPANIES</small>
          </div>
          <div className="ap-intelligence-card">
            <span className="ap-overline">STUDENT INTELLIGENCE</span>
            <div className="ap-intelligence-score">
              <span>Beacon Score</span>
              <strong>
                842<small>/ 1000</small>
              </strong>
            </div>
            <SkillBars />
            <div className="ap-mini-evidence">
              <FileCheck2 size={19} />
              <span>
                Assessment evidence
                <small>Demonstrated. Connected. Actionable.</small>
              </span>
              <Check size={16} />
            </div>
            <div className="ap-match">
              <span>Company tracks</span>
              <span>
                Explore relevant pathways <ArrowRight size={13} />
              </span>
            </div>
            <small className="ap-sample">
              Illustrative data · Not a customer result
            </small>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
const audienceContent = {
  student: {
    question: "Are you a student?",
    name: "For students",
    headline: "Make your work",
    emphasis: "speak for you.",
    description:
      "Know where you stand, see what you can improve, and build a clearer picture of your career readiness.",
    benefits: [
      [
        "Your assessments, together",
        "Find assigned sessions and join when your faculty opens the waiting room.",
      ],
      [
        "Progress you can see",
        "Review scores, coding performance and skill trends across assessments.",
      ],
      [
        "A more useful next step",
        "Use topic mastery and faculty feedback to focus your practice.",
      ],
    ],
    action: "Explore the student experience",
    href: "/beacon?tour=student",
  },
  faculty: {
    question: "Are you faculty?",
    name: "For faculty",
    headline: "Run the assessment.",
    emphasis: "Understand the cohort.",
    description:
      "Move from preparing a question set to reviewing results in one connected workspace.",
    benefits: [
      [
        "Assess your way",
        "Prepare coding, aptitude or mixed assessments for the right student cohort.",
      ],
      [
        "Follow the work live",
        "See submissions, test-case verdicts and recorded integrity events as a session unfolds.",
      ],
      [
        "Make feedback specific",
        "Review the code and results behind a score before planning the next assessment.",
      ],
    ],
    action: "Explore the faculty experience",
    href: "/beacon?tour=faculty",
  },
  company: {
    question: "Hiring fresh graduates?",
    name: "For hiring teams",
    headline: "Look beyond",
    emphasis: "the résumé.",
    description:
      "Bring demonstrated skills into your early-career hiring conversations. Start with the role, then look at the work.",
    benefits: [
      [
        "Start with role requirements",
        "Discuss an assessment approach aligned with the skills your graduate roles need.",
      ],
      [
        "Review demonstrated ability",
        "Use coding submissions, test results and competency signals to inform candidate review.",
      ],
      [
        "Add context to interviews",
        "Bring specific assessment evidence into the conversation with each candidate.",
      ],
    ],
    action: "Discuss your hiring needs",
    href: "mailto:support@apertureintelligence.in?subject=Graduate%20hiring%20with%20Beacon",
  },
};
function AudienceSection() {
  const [audience, setAudience] =
    useState<keyof typeof audienceContent>("student");
  const content = audienceContent[audience];
  const roles = Object.keys(
    audienceContent,
  ) as (keyof typeof audienceContent)[];
  return (
    <section className="ap-audience ap-section" id="for-you">
      <Reveal>
        <div className="ap-audience-heading">
          <h2>
            Different roles.
            <br />
            <span>A shared view of capability.</span>
          </h2>
          <p>
            For the student building a career.
            <br />
            The faculty guiding a cohort.
            <br />
            The team making its next hire.
          </p>
        </div>
        <div
          className="ap-audience-tabs"
          role="tablist"
          aria-label="Find your Beacon experience"
        >
          {roles.map((role) => (
            <button
              key={role}
              id={`audience-tab-${role}`}
              role="tab"
              aria-selected={audience === role}
              aria-controls="audience-panel"
              tabIndex={audience === role ? 0 : -1}
              onClick={() => setAudience(role)}
              onKeyDown={(event) => {
                if (
                  ["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)
                ) {
                  event.preventDefault();
                  const next =
                    event.key === "Home"
                      ? 0
                      : event.key === "End"
                        ? 2
                        : (roles.indexOf(role) +
                            (event.key === "ArrowRight" ? 1 : 2)) %
                          3;
                  setAudience(roles[next]);
                  document
                    .getElementById(`audience-tab-${roles[next]}`)
                    ?.focus();
                }
              }}
            >
              {audienceContent[role].question}
              <ArrowUpRight size={17} />
            </button>
          ))}
        </div>
        <div
          id="audience-panel"
          className="ap-audience-panel"
          role="tabpanel"
          aria-labelledby={`audience-tab-${audience}`}
        >
          <div className="ap-audience-copy">
            <h3>
              {content.headline}
              <br />
              <span>{content.emphasis}</span>
            </h3>
            <p>{content.description}</p>
            <div className="ap-audience-benefits">
              {content.benefits.map(([title, body]) => (
                <div key={title}>
                  <Check size={15} />
                  <div>
                    <h4>{title}</h4>
                    <p>{body}</p>
                  </div>
                </div>
              ))}
            </div>
            <CTA href={content.href}>{content.action}</CTA>
          </div>
          <div className={`ap-audience-visual ${audience}`} key={audience}>
            <div className="ap-role-window">
              <div className="ap-role-window-top">
                <BeaconLogo fontSize={24} />
                <span>{content.name}</span>
              </div>
              {audience === "student" ? (
                <>
                  <div className="ap-role-greeting">
                    <span>YOUR CAREER, TAKING SHAPE</span>
                    <h4>
                      Every assessment.
                      <br />A little more clarity.
                    </h4>
                  </div>
                  <div className="ap-role-score">
                    <div>
                      <span>Career readiness</span>
                      <strong>
                        84<small>/100</small>
                      </strong>
                    </div>
                    <svg
                      viewBox="0 0 100 100"
                      aria-label="Career readiness: 84 out of 100"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="none"
                        stroke="#3e3e3e"
                        strokeWidth="5"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="none"
                        stroke="#c2c2c2"
                        strokeWidth="5"
                        strokeDasharray="200 239"
                        transform="rotate(-90 50 50)"
                      />
                      <text
                        x="50"
                        y="55"
                        textAnchor="middle"
                        fill="#e5e5e5"
                        fontSize="16"
                      >
                        84
                      </text>
                    </svg>
                  </div>
                  <div className="ap-role-bars">
                    {[
                      ["Coding", 89],
                      ["Aptitude", 82],
                      ["Consistency", 86],
                    ].map(([title, value]) => (
                      <div key={title}>
                        <span>
                          {title}
                          <b>{value}</b>
                        </span>
                        <i>
                          <i style={{ width: `${value}%` }} />
                        </i>
                      </div>
                    ))}
                  </div>
                  <div className="ap-role-note">
                    <FileCheck2 size={16} />
                    <span>Assessment history, connected to your growth.</span>
                  </div>
                </>
              ) : audience === "faculty" ? (
                <>
                  <div className="ap-role-greeting">
                    <span>YOUR COHORT, IN FOCUS</span>
                    <h4>
                      Less chasing results.
                      <br />
                      More understanding them.
                    </h4>
                  </div>
                  <div className="ap-role-session">
                    <span>
                      <i />
                      SESSION IN PROGRESS
                    </span>
                    <h5>Data Structures · Week 04</h5>
                    <p>Coding · 45 minutes · Computer Science</p>
                  </div>
                  <div className="ap-role-metrics">
                    <div>
                      <b>06</b>
                      <span>Students</span>
                    </div>
                    <div>
                      <b>12</b>
                      <span>Submissions</span>
                    </div>
                    <div>
                      <b>01</b>
                      <span>Event to review</span>
                    </div>
                  </div>
                  <div className="ap-role-feed">
                    {[
                      ["Aarav Sharma", "Two Sum", "Passed"],
                      ["Meera Iyer", "Binary Search", "Passed"],
                      ["Rohan Das", "Balanced Brackets", "Review"],
                    ].map(([name, task, status]) => (
                      <div key={name}>
                        <span>
                          {name}
                          <small>{task}</small>
                        </span>
                        <b>{status}</b>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="ap-role-greeting">
                    <span>GRADUATE HIRING, WITH CONTEXT</span>
                    <h4>
                      A candidate is more
                      <br />
                      than a line on a CV.
                    </h4>
                  </div>
                  <div className="ap-role-candidate">
                    <span className="ap-candidate-avatar">AS</span>
                    <div>
                      <h5>Aarav Sharma</h5>
                      <p>Graduate software engineer · Example role</p>
                    </div>
                  </div>
                  <div className="ap-role-evidence">
                    <div>
                      <span>Role requirement</span>
                      <span>Assessment evidence</span>
                    </div>
                    {[
                      ["Problem solving", "Data structures · 91/100"],
                      ["Coding fundamentals", "4/4 test cases passed"],
                      ["Analytical thinking", "Reasoning · 86/100"],
                    ].map(([skill, evidence]) => (
                      <div key={skill}>
                        <b>{skill}</b>
                        <span>{evidence}</span>
                      </div>
                    ))}
                  </div>
                  <div className="ap-role-note">
                    <FileCheck2 size={16} />
                    <span>
                      Evidence to inform a conversation.
                      <br />
                      The hiring decision stays with your team.
                    </span>
                  </div>
                </>
              )}
              <footer>
                {audience === "company"
                  ? "Illustrative evidence brief · Discuss a hiring workflow with us"
                  : "Illustrative workspace · Fictional sample data"}
              </footer>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
const stages = [
  [
    "Assess",
    "Measure capability through structured assessments.",
    "Structured assessment",
    "Coding · Aptitude · Communication",
  ],
  [
    "Understand",
    "Turn performance into meaningful competency signals.",
    "Competency intelligence",
    "Technical 91 · Analytical 86 · Communication 78",
  ],
  [
    "Verify",
    "Build evidence around demonstrated capability.",
    "Evidence you can trace",
    "Submissions · Results · Integrity signals",
  ],
  [
    "Match",
    "Connect capability with relevant opportunities.",
    "Relevant company tracks",
    "Software engineering · Data & analytics",
  ],
  [
    "Opportunity",
    "Enable better decisions for institutions and companies.",
    "Potential, made visible",
    "A shared view of readiness and opportunity",
  ],
];
function IntelligenceLoop() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            setActive(Number((entry.target as HTMLElement).dataset.stage));
        });
      },
      { rootMargin: "-35% 0px -40% 0px" },
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return (
    <section className="ap-section ap-loop">
      <div className="ap-loop-sticky">
        <h2>
          From assessment
          <br />
          <span>to opportunity.</span>
        </h2>
        <div className="ap-loop-display">
          <div className="ap-loop-orbit">
            <BeaconLogo fontSize={44} />
          </div>
          <h3>{stages[active][2]}</h3>
          <p>{stages[active][3]}</p>
          <div
            className="ap-loop-progress"
            style={{ width: `${(active + 1) * 20}%` }}
          />
        </div>
      </div>
      <div className="ap-stages">
        {stages.map(([name, description], i) => (
          <button
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-stage={i}
            key={name}
            onClick={() => setActive(i)}
            className={active === i ? "active" : ""}
            aria-pressed={active === i}
          >
            <div>
              <h3>{name}</h3>
              <p>{description}</p>
            </div>
            <ArrowUpRight size={20} />
          </button>
        ))}
      </div>
    </section>
  );
}
const capabilities = [
  [
    "Assessment Engine",
    "Secure assessments designed to measure real capability.",
    "MCQ",
    "Coding",
    "Real-time",
  ],
  [
    "Beacon Score",
    "A structured intelligence layer for understanding candidate capability.",
    "842",
    "Capability signal",
    "/ 1000",
  ],
  [
    "Competency Intelligence",
    "Transform assessment performance into meaningful competency signals.",
    "Technical",
    "Analytical",
    "Communication",
  ],
  [
    "Company Tracks",
    "Create company-specific assessment and hiring pathways.",
    "Assess",
    "Qualify",
    "Connect",
  ],
  [
    "Secure Proctoring",
    "Protect assessment integrity with controlled environments and proctoring.",
    "Focus monitoring",
    "Audit trail",
    "Sandboxed execution",
  ],
  [
    "Matching",
    "Connect demonstrated capability with relevant opportunities.",
    "Capability",
    "Evidence",
    "Opportunity",
  ],
];
function CapabilityGrid() {
  const [expanded, setExpanded] = useState<number | null>(null);
  return (
    <section className="ap-section">
      <Reveal>
        <h2>
          Every signal.
          <br />
          <span>A bigger picture.</span>
        </h2>
        <div className="ap-capabilities">
          {capabilities.map(([title, copy, ...labels], i) => (
            <button
              key={title}
              onClick={() => setExpanded(expanded === i ? null : i)}
              aria-expanded={expanded === i}
              className="ap-capability"
            >
              <div className="ap-cap-head">
                <ArrowUpRight size={18} />
              </div>
              <h3>{title}</h3>
              <p>{copy}</p>
              <div className={`ap-cap-visual visual-${i}`}>
                {labels.map((label, j) => (
                  <span key={label}>
                    {i === 4 && <ShieldCheck size={13} />}
                    {label}
                    {i === 2 && <i style={{ width: `${90 - j * 16}%` }} />}
                  </span>
                ))}
              </div>
              {expanded === i && (
                <div className="ap-cap-expanded">
                  {
                    [
                      "Run coding, aptitude and mixed assessments with server-side evaluation.",
                      "Bring multiple assessment signals into a structured view of readiness.",
                      "Understand strengths across technical, analytical and communication skills.",
                      "Organize assessment journeys around role-specific requirements.",
                      "Record focus events, restrict clipboard access and audit integrity signals.",
                      "Explore pathways informed by demonstrated skills and assessment evidence.",
                    ][i]
                  }
                </div>
              )}
            </button>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
function TechnologyArchitecture() {
  return (
    <section className="ap-technology ap-evidence-engine" id="technology">
      <div className="ap-section">
        <Reveal>
          <h2>
            A verdict you can
            <br />
            <span>look behind.</span>
          </h2>
          <p>
            A submitted answer is only the beginning. Beacon connects the code,
            test results and session events so faculty can review how a result
            was produced.
          </p>
          <div className="ap-execution-story">
            <div className="ap-execution-code">
              <div>
                <span>SUBMISSION</span>
                <span>solution.py</span>
              </div>
              <pre>
                <code>{`def two_sum(nums, target):
    seen = {}
    for i, value in enumerate(nums):
        if target - value in seen:
            return [seen[target - value], i]
        seen[value] = i`}</code>
              </pre>
              <footer>
                <span>Python</span>
                <span>C++</span>
                <span>Java</span>
                <span>JavaScript</span>
              </footer>
            </div>
            <div className="ap-execution-results">
              <h3>The same test. Every submission.</h3>
              <p>
                Code runs in an isolated environment against visible and hidden
                test cases.
              </p>
              <div className="ap-case-list">
                {[
                  "Visible test · Expected output",
                  "Hidden test · Edge case",
                  "Hidden test · Input limits",
                ].map((test) => (
                  <div key={test}>
                    <Check size={13} />
                    <span>{test}</span>
                    <b>Passed</b>
                  </div>
                ))}
              </div>
              <div className="ap-verdict">
                <span>VERDICT</span>
                <strong>Accepted</strong>
                <small>Illustrative result</small>
              </div>
            </div>
          </div>
          <div className="ap-review-record">
            <div>
              <span>REVIEW</span>
              <h3>The result keeps its context.</h3>
            </div>
            <p>
              <b>Submission history</b>Revisit the student’s code and evaluation
              result.
            </p>
            <p>
              <b>Integrity events</b>Review recorded focus changes and session
              events.
            </p>
            <p>
              <b>Cohort results</b>Compare assessment outcomes and plan
              follow-up.
            </p>
          </div>
          <a className="ap-text-link" href="/beacon?tour=faculty">
            Watch the faculty workflow <ArrowUpRight size={16} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
function ApertureDifference() {
  return (
    <section className="ap-section ap-difference">
      {[
        ["Intelligence", "Turn fragmented information into useful signals."],
        ["Evidence", "Measure capability through observable evidence."],
        [
          "Infrastructure",
          "Build systems that operate beyond individual workflows.",
        ],
        [
          "Opportunity",
          "Connect demonstrated capability with meaningful opportunity.",
        ],
      ].map(([title, copy], i) => (
        <Reveal key={title}>
          <h3>{title}</h3>
          <p>{copy}</p>
        </Reveal>
      ))}
    </section>
  );
}
function CompanySection() {
  return (
    <section className="ap-section ap-company" id="company">
      <Reveal>
        <h2>
          Built around the work
          <br />
          <span>of assessment.</span>
        </h2>
        <div className="ap-company-specific">
          <p>
            Aperture Intelligence builds Beacon for the people on both sides of
            an assessment: the student doing the work and the faculty making
            sense of the results.
          </p>
          <div>
            <span>FOR STUDENTS</span>
            <p>
              One place for assigned sessions, assessment history, skill trends
              and career readiness.
            </p>
            <a className="ap-text-link" href="/beacon?tour=student">
              See the student workspace <ArrowUpRight size={15} />
            </a>
          </div>
          <div>
            <span>FOR INSTITUTIONS</span>
            <p>
              Session setup, question sets, submissions and integrity review in
              a shared faculty workspace.
            </p>
            <a className="ap-text-link" href="/beacon?tour=faculty">
              See the faculty workspace <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
        <div className="ap-company-byline">
          <span>Aperture Intelligence · India</span>
          <span>
            Sanjeev Sriram <span>Founder & CEO</span>
          </span>
        </div>
      </Reveal>
    </section>
  );
}
function VisionSection() {
  return (
    <section className="ap-section ap-vision">
      <Reveal>
        <h2>
          <span>A result tells you how it went.</span>
          <br />
          The evidence helps you
          <br />
          decide what comes next.
        </h2>
        <div>
          Code submitted <ArrowRight /> Tests evaluated <ArrowRight /> Results
          reviewed
        </div>
      </Reveal>
    </section>
  );
}
function FinalCTA() {
  return (
    <section className="ap-final" id="contact">
      <Reveal>
        <span className="ap-tagline">DECOUPLING HUMAN ERROR.</span>
        <h2>Build with Aperture.</h2>
        <p>Explore what intelligent infrastructure can make possible.</p>
        <div className="ap-actions">
          <CTA href="#beacon">Explore Beacon</CTA>
          <CTA secondary href={email}>
            Talk to us
          </CTA>
        </div>
      </Reveal>
    </section>
  );
}
function Footer() {
  return (
    <footer className="ap-footer">
      <div className="ap-footer-main">
        <div>
          <a href="#" aria-label="Back to top">
            <Brand />
          </a>
          <p className="ap-tagline">DECOUPLING HUMAN ERROR.</p>
        </div>
        <div>
          <span>PRODUCT</span>
          <a href="/beacon">Beacon ↗</a>
        </div>
        <div>
          <span>COMPANY</span>
          <a href="#technology">Technology</a>
          <a href="#company">About</a>
          <a href="#contact">Contact</a>
        </div>
        <div>
          <span>LET’S TALK</span>
          <a href={email}>support@apertureintelligence.in</a>
          <a href="tel:+918111010959">+91 8111010959</a>
          <a href="tel:+918610213489">+91 8610213489</a>
          <a href="tel:+919003472654">+91 9003472654</a>
          <a href="https://www.apertureintelligence.in">
            apertureintelligence.in ↗
          </a>
        </div>
      </div>
      <div className="ap-footer-bottom">
        <span>© 2026 Aperture Intelligence Private Limited</span>
      </div>
    </footer>
  );
}
export default function Aperture() {
  return (
    <div className="ap-site">
      <a className="ap-skip" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <ProblemSection />
        <BeaconSection />
        <AudienceSection />
        <IntelligenceLoop />
        <CapabilityGrid />
        <TechnologyArchitecture />
        <ApertureDifference />
        <CompanySection />
        <VisionSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
