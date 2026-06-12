// Shared capability/service data — used by the Services section and the
// dynamic /services/[slug] detail pages.

export const services = [
  {
    slug: 'custom-software-development',
    title: 'Custom Software Development',
    tagline: 'Bespoke systems, engineered end to end.',
    description:
      'End-to-end software engineering tailored to your unique enterprise requirements and business workflows.',
    overview:
      'We design and build custom software from first principles — mapping your operations, modelling the domain, and engineering systems that fit the way you actually work. No off-the-shelf compromises, no rigid templates: just software shaped precisely around your business.',
    tech: ['React', 'Node.js', 'Python', 'PostgreSQL', 'TypeScript'],
    capabilities: [
      'Domain-driven architecture & system design',
      'Internal tools, dashboards & admin platforms',
      'Legacy system modernisation & migration',
      'Third-party & API integrations',
      'Long-term maintenance & iterative delivery',
    ],
    process: [
      { step: 'Discovery', detail: 'We map your workflows, constraints, and goals.' },
      { step: 'Architecture', detail: 'We model the domain and design for scale.' },
      { step: 'Build', detail: 'Agile delivery in tight, reviewable increments.' },
      { step: 'Evolve', detail: 'Ongoing support, hardening, and enhancement.' },
    ],
  },
  {
    slug: 'web-application-development',
    title: 'Web Application Development',
    tagline: 'Fast, scalable, beautifully engineered web apps.',
    description:
      'Scalable, high-performance web applications built with modern frontend frameworks and robust backend architectures.',
    overview:
      'From real-time collaboration tools to data-heavy enterprise dashboards, we build web applications that are fast, accessible, and built to scale. Modern frontend craftsmanship meets resilient backend engineering.',
    tech: ['Next.js', 'React', 'Express', 'PostgreSQL', 'GraphQL'],
    capabilities: [
      'Single-page & server-rendered applications',
      'Real-time features with WebSockets',
      'Progressive web apps (PWA)',
      'Performance & Core Web Vitals optimisation',
      'Design-system driven component libraries',
    ],
    process: [
      { step: 'Define', detail: 'Scope features, flows, and success metrics.' },
      { step: 'Design', detail: 'Interface and interaction prototypes.' },
      { step: 'Engineer', detail: 'Component-driven build with CI/CD.' },
      { step: 'Launch', detail: 'Zero-downtime deploy and monitoring.' },
    ],
  },
  {
    slug: 'ai-automation-solutions',
    title: 'AI & Automation Solutions',
    tagline: 'Applied AI and agentic orchestration.',
    description:
      'Intelligent systems that leverage machine learning and AI to automate workflows and unlock data insights.',
    overview:
      'We build practical AI into real products — from retrieval-augmented assistants and document intelligence to multi-agent orchestration that automates entire workflows. We pair the right models with solid engineering so the results are reliable, not just impressive in a demo.',
    tech: ['OpenAI', 'Anthropic', 'LangChain', 'CrewAI', 'n8n', 'PyTorch'],
    capabilities: [
      'RAG pipelines & knowledge assistants',
      'Multi-agent orchestration (LangChain, CrewAI)',
      'Workflow automation (n8n, custom agents)',
      'Document & data intelligence',
      'Model fine-tuning & evaluation',
    ],
    process: [
      { step: 'Frame', detail: 'Identify high-leverage AI use-cases.' },
      { step: 'Prototype', detail: 'Validate quality with real data fast.' },
      { step: 'Productionise', detail: 'Guardrails, evals, and observability.' },
      { step: 'Scale', detail: 'Cost, latency, and accuracy tuning.' },
    ],
  },
  {
    slug: 'enterprise-software-systems',
    title: 'Enterprise Software Systems',
    tagline: 'Mission-critical platforms built to last.',
    description:
      'Mission-critical enterprise platforms designed for high availability, security, and global scalability.',
    overview:
      'For organisations where downtime is not an option, we engineer enterprise platforms with security, compliance, and scale designed in from day one. Robust, observable, and built to support thousands of concurrent users.',
    tech: ['Java', 'Spring Boot', 'Kubernetes', 'PostgreSQL', 'Kafka'],
    capabilities: [
      'High-availability distributed systems',
      'Role-based access & enterprise SSO',
      'Audit logging & compliance readiness',
      'Event-driven & microservice architectures',
      'Horizontal scaling & load resilience',
    ],
    process: [
      { step: 'Assess', detail: 'Requirements, risks, and compliance needs.' },
      { step: 'Architect', detail: 'Resilient, secure system blueprint.' },
      { step: 'Implement', detail: 'Hardened build with full test coverage.' },
      { step: 'Operate', detail: 'Monitoring, SLAs, and continuous ops.' },
    ],
  },
  {
    slug: 'cloud-solutions',
    title: 'Cloud Solutions',
    tagline: 'Cloud-native architecture & DevOps.',
    description:
      'Cloud-native architecture, migration, and DevOps strategies to optimize performance and reduce infrastructure costs.',
    overview:
      'We help you move to — and get the most from — the cloud. From greenfield cloud-native builds to migrating legacy workloads, we design infrastructure that is automated, observable, and cost-efficient.',
    tech: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Terraform'],
    capabilities: [
      'Cloud migration & modernisation',
      'Infrastructure as Code (Terraform)',
      'CI/CD pipeline automation',
      'Containerisation & orchestration',
      'Cost optimisation & FinOps',
    ],
    process: [
      { step: 'Audit', detail: 'Review current infra and spend.' },
      { step: 'Plan', detail: 'Target architecture and migration path.' },
      { step: 'Automate', detail: 'IaC, pipelines, and guardrails.' },
      { step: 'Optimise', detail: 'Performance and cost tuning.' },
    ],
  },
  {
    slug: 'ui-ux-design',
    title: 'UI/UX Design',
    tagline: 'Human-centric product design.',
    description:
      'Human-centric product design that transforms complex workflows into intuitive, premium user experiences.',
    overview:
      'Great engineering deserves great design. We craft intuitive, premium interfaces grounded in research and refined through prototyping — turning complex workflows into experiences that feel effortless.',
    tech: ['Figma', 'Framer', 'Prototyping', 'Design Systems'],
    capabilities: [
      'Product & UX strategy',
      'Interaction & interface design',
      'Design systems & component libraries',
      'High-fidelity prototyping',
      'Usability testing & iteration',
    ],
    process: [
      { step: 'Research', detail: 'Understand users and their context.' },
      { step: 'Wireframe', detail: 'Structure flows and information.' },
      { step: 'Design', detail: 'High-fidelity, on-brand interfaces.' },
      { step: 'Validate', detail: 'Prototype, test, and refine.' },
    ],
  },
];

export const getService = (slug) => services.find((s) => s.slug === slug);
