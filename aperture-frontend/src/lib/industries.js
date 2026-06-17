// Shared industry-solution data — used by the /industries index and the
// dynamic /industries/[slug] detail pages.

export const industries = [
  {
    slug: 'education',
    title: 'Education',
    tagline: 'Software that helps learners and institutions thrive.',
    description:
      'Learning platforms, student systems, and collaboration tools built for schools, colleges, and edtech ventures.',
    overview:
      'We build technology for the way modern education actually works — collaborative, mobile-first, and often running on constrained campus connectivity. From learning management systems to student collaboration tools, we focus on experiences that are fast, accessible, and genuinely useful to students and educators alike.',
    challenges: [
      'Fragmented tools that scatter notes, assignments, and communication',
      'Poor performance on low-bandwidth campus and rural connections',
      'Manual administrative workflows that drain staff time',
      'Low engagement from interfaces that feel like paperwork',
    ],
    solutions: [
      'Collaborative learning and notes-sharing platforms',
      'Student information and administration systems',
      'Real-time, offline-capable collaboration features',
      'Assessment, scheduling, and reporting automation',
    ],
    tech: ['React', 'Node.js', 'MongoDB', 'WebSockets'],
    related: 'ScholarHive',
  },
  {
    slug: 'healthcare',
    title: 'Healthcare',
    tagline: 'Clinical-grade software, engineered responsibly.',
    description:
      'Diagnostic AI, patient platforms, and clinical tools built with the rigour healthcare demands.',
    overview:
      'Healthcare software carries real consequences, so we engineer it accordingly — with careful attention to data sensitivity, explainability, and clinical workflows. Whether it is an AI triage layer or a patient engagement platform, we build tools that support clinicians rather than replace their judgement.',
    challenges: [
      'Scarce specialist time creating screening bottlenecks',
      'Sensitive patient data demanding strict handling',
      'Inconsistent manual review and missed early-stage cases',
      'Disconnected systems and poor patient communication',
    ],
    solutions: [
      'Diagnostic AI as a triage and prioritisation layer',
      'Explainable model outputs for clinician-facing tools',
      'Patient engagement and appointment platforms',
      'Secure, audit-ready data pipelines',
    ],
    tech: ['Python', 'PyTorch', 'FastAPI', 'React'],
    related: 'TB Detection Using AI',
  },
  {
    slug: 'retail',
    title: 'Retail',
    tagline: 'Commerce and operations platforms that scale.',
    description:
      'E-commerce, inventory, and operations software for retailers going digital and scaling up.',
    overview:
      'We help retail businesses run and grow on solid software — from storefronts to the inventory and operations systems behind them. Our focus is on platforms that perform well for real customers on real devices, and that give operators clear, real-time visibility into their business.',
    challenges: [
      'Disconnected spreadsheets causing stock discrepancies',
      'Stockouts and reorder delays from manual processes',
      'Storefronts that underperform on entry-level devices',
      'No real-time visibility across locations',
    ],
    solutions: [
      'Custom e-commerce and storefront platforms',
      'Multi-location inventory and stock-control systems',
      'Automated reorder and reporting workflows',
      'Operations dashboards with live metrics',
    ],
    tech: ['React', 'Express', 'MongoDB', 'Redis'],
    related: 'Inventory Management System',
  },
  {
    slug: 'startups',
    title: 'Startups',
    tagline: 'From idea to shipped product, fast.',
    description:
      'MVP engineering and product partnership for founders who need to move quickly and build right.',
    overview:
      'Startups need a partner who thinks like a product team, not just a vendor executing tickets. We help founders pressure-test ideas, scope sharply, and ship MVPs that are built on a foundation that can actually scale — so the first version does not become technical debt you regret.',
    challenges: [
      'Vague briefs that need shaping into clear specs',
      'Pressure to ship fast without accumulating debt',
      'Limited runway demanding focused scope',
      'Foundations that must scale if the bet pays off',
    ],
    solutions: [
      'Rapid MVP scoping and delivery',
      'Product strategy and roadmap refinement',
      'Scalable architecture from day one',
      'Iterative delivery with measurable milestones',
    ],
    tech: ['Next.js', 'Node.js', 'PostgreSQL', 'TypeScript'],
    related: '',
  },
  {
    slug: 'manufacturing',
    title: 'Manufacturing',
    tagline: 'Connecting the factory floor to clear data.',
    description:
      'Production monitoring, IoT data, and operations platforms for manufacturers.',
    overview:
      'Manufacturing runs on visibility. We build software that connects the factory floor to clear, actionable data — turning sensor streams and production events into dashboards operators can act on, and automating the workflows that keep lines running.',
    challenges: [
      'Defect detection that takes hours instead of minutes',
      'IoT and sensor data that is hard to surface usefully',
      'Manual production tracking and reporting',
      'Disconnected systems across the operation',
    ],
    solutions: [
      'Production monitoring and operator dashboards',
      'IoT and sensor data pipelines at scale',
      'Defect detection and quality workflows',
      'Maintainable systems your internal team can own',
    ],
    tech: ['React', 'Node.js', 'Python', 'PostgreSQL'],
    related: '',
  },
  {
    slug: 'logistics',
    title: 'Logistics',
    tagline: 'Visibility and automation across the supply chain.',
    description:
      'Inventory, tracking, and route-optimisation platforms for logistics and supply-chain operations.',
    overview:
      'Logistics is a coordination problem at scale. We build platforms that give operators real-time visibility across warehouses, routes, and inventory — and automate the reconciliation and tracking work that manual processes cannot keep up with.',
    challenges: [
      'Disconnected warehouses with no central visibility',
      'Manual reconciliation consuming hours every week',
      'Reorder delays and undetected discrepancies',
      'Tracking that breaks down across handoffs',
    ],
    solutions: [
      'Multi-site inventory and stock-tracking platforms',
      'Route optimisation and fleet coordination',
      'Automated reorder and audit workflows',
      'Real-time operations visibility dashboards',
    ],
    tech: ['React', 'Express', 'MongoDB', 'Redis'],
    related: 'Inventory Management System',
  },
];

export const getIndustry = (slug) => industries.find((i) => i.slug === slug);
