import { Reveal, AnimatedHeading } from '@/components/ui/Motion';
import { ProjectCarousel } from './ProjectCarousel';

const projects = [
  {
    title: 'FARCRY',
    subtitle: 'Placement Operating System',
    category: 'MANAGEMENT PLATFORM',
    status: 'IN DEVELOPMENT',
    year: '2026',
    description:
      'A full assessment engine institutions use for technical hiring and placement drives, run in three modes — timed MCQ and aptitude, a built-in code editor across four languages with hidden test cases, and live faculty-pushed real-time challenges. Students sign in with a single access code into a screen-locked session with tab-switch detection, clipboard blocking, and real-time violation logs; faculty get one-click session control, a live leaderboard, and CSV export.',
    metric: { value: '10x', label: 'Faster Assessment Administration' },
    tech: ['Next.js', 'Python', 'WebSockets', 'PostgreSQL', 'Docker'],
    slides: [
      { src: '/projects/farcry-1.svg', alt: 'FARCRY hero screen — the Placement Operating System dashboard' },
      { src: '/projects/farcry-2.svg', alt: "FARCRY's three assessment modes — timed MCQ and aptitude, the built-in code editor, and live real-time challenges" },
      { src: '/projects/farcry-3.svg', alt: 'FARCRY session flow and rules — screen-locked session with tab-switch detection and violation logging' },
      { src: '/projects/farcry-4.svg', alt: 'Comparison table of legacy PuTTY-based testing versus FARCRY' },
    ],
  },
  {
    title: 'KALYANI',
    subtitle: "Aperture's Internal Operating System",
    category: 'INTERNAL OPERATING SYSTEM',
    status: 'LIVE',
    year: '2026',
    description:
      "The tool Aperture runs itself on — goals, tasks, CRM, meetings and accountability in one workspace. Goals roll up progress from linked tasks automatically; an 8-stage CRM pipeline tracks outreach; a Friday Weekly Review surfaces top performers and missed commitments, founders included. Every member can read everyone else's goals and tasks — transparent accountability enforced identically top to bottom.",
    metric: { value: '13', label: 'Team Members Onboarded' },
    tech: ['Next.js 15', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind'],
    slides: [
      { src: '/projects/kalyani-1.svg', alt: "KALYANI's Tasks view — a kanban board of work in progress" },
      { src: '/projects/kalyani-2.svg', alt: 'KALYANI New Task modal for capturing and assigning work' },
      { src: '/projects/kalyani-3.svg', alt: 'KALYANI Goals view — progress rolled up from linked tasks' },
      { src: '/projects/kalyani-4.svg', alt: 'KALYANI Home — the KPI console summarising team performance' },
      { src: '/projects/kalyani-5.svg', alt: 'KALYANI Weekly Review — top performers and missed commitments' },
      { src: '/projects/kalyani-6.svg', alt: 'KALYANI Activity feed — a live log of team actions' },
    ],
  },
];

export function Projects() {
  return (
    <section id="projects" className="border-t border-line bg-paper py-28 md:py-40">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-16 grid grid-cols-1 gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <span className="eyebrow">(06c) — Our Projects</span>
          </Reveal>
          <div className="md:col-span-9">
            <AnimatedHeading
              as="h2"
              text="Products we build to run on."
              className="font-display text-5xl font-medium leading-[1.05] text-ink md:text-7xl"
            />
            <Reveal delay={0.2} className="mt-6">
              <p className="text-lg text-ash">
                Beyond the client work, we build products of our own — the same engineering we bring to every
                engagement, turned inward. These are two systems we designed, shipped, and now run on ourselves.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-px bg-line md:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal
              key={project.title}
              delay={i * 0.1}
              className="flex flex-col bg-paper p-6 md:p-8"
            >
              {/* Image carousel */}
              <ProjectCarousel slides={project.slides} />

              {/* Category · status · year */}
              <div className="mt-8 flex items-start justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-xs uppercase tracking-[0.2em] text-smoke font-mono">
                    {project.category}
                  </span>
                  <span
                    className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-wider ${
                      project.status === 'LIVE'
                        ? 'border-ink/20 text-ink'
                        : 'border-smoke/40 text-smoke'
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        project.status === 'LIVE' ? 'bg-ink animate-blink' : 'bg-smoke'
                      }`}
                    />
                    {project.status}
                  </span>
                </div>
                <span className="font-display text-lg italic text-smoke">{project.year}</span>
              </div>

              {/* Title + subtitle */}
              <h3 className="mt-6 font-display text-4xl font-medium text-ink md:text-5xl">
                {project.title}
              </h3>
              <p className="mt-2 font-display text-lg italic text-ash">{project.subtitle}</p>

              {/* Description */}
              <p className="mt-5 leading-relaxed text-ash">{project.description}</p>

              {/* Featured metric */}
              <div className="mt-6 flex items-baseline gap-2 border-t border-line/50 pt-4">
                <span className="font-display text-3xl font-medium text-ink">
                  {project.metric.value}
                </span>
                <span className="text-[10px] uppercase tracking-[0.15em] text-smoke font-mono">
                  {project.metric.label}
                </span>
              </div>

              {/* Tech stack */}
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-line px-3 py-1 text-[10px] uppercase tracking-wider text-ash"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
