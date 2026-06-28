// Content source of truth for the Aperture Personal division.
// Mock/sample data only — no real testimonials, no backend.

export const whatWeBuild = [
  {
    key: 'portfolio',
    title: 'Portfolio Websites',
    blurb: 'Showcase achievements professionally.',
  },
  {
    key: 'brand',
    title: 'Personal Brands',
    blurb: 'Build credibility online.',
  },
  {
    key: 'resume',
    title: 'Resume Websites',
    blurb: 'Stand out from traditional resumes.',
  },
  {
    key: 'event',
    title: 'Event Websites',
    blurb: 'Weddings, reunions, celebrations, milestones.',
  },
  {
    key: 'memory',
    title: 'Memory Pages',
    blurb: 'Preserve moments forever.',
  },
  {
    key: 'creator',
    title: 'Creator Websites',
    blurb: 'A dedicated home for your audience.',
  },
];

export const whyPoints = [
  {
    title: 'Personalized Design',
    blurb: 'Built around your story — never a template you have to fit into.',
  },
  {
    title: 'Mobile First',
    blurb: 'Looks effortless on the screen most people will actually use.',
  },
  {
    title: 'Fast Performance',
    blurb: 'Tuned to load in a blink, wherever your audience opens it.',
  },
  {
    title: 'Professional Appearance',
    blurb: 'A presence that quietly signals you take yourself seriously.',
  },
  {
    title: 'Built To Last',
    blurb: 'Clean foundations that age gracefully as you grow.',
  },
  {
    title: 'Fully Managed',
    blurb: 'Hosting, updates and care handled — you just live your life.',
  },
];

export const showcase = [
  {
    name: 'Aarav Sharma',
    role: 'Student Portfolio',
    theme: 'professional',
    summary:
      'A clean, confident first impression for a final-year engineering student stepping into the job market.',
    highlights: ['Projects', 'Achievements', 'Resume', 'Contact'],
    accent: '#e6a532',
  },
  {
    name: 'Priya Nair',
    role: 'UI/UX Designer',
    theme: 'creative',
    summary:
      'An expressive case-study led site that lets the work breathe and the craft speak for itself.',
    highlights: ['Case Studies', 'Process', 'Visuals', 'About'],
    accent: '#f4754b',
  },
  {
    name: 'Arjun Patel',
    role: 'Developer Portfolio',
    theme: 'minimal',
    summary:
      'A precise, fast, no-noise developer home — code, shipped products and a clear way to reach out.',
    highlights: ['Open Source', 'Stack', 'Writing', 'Links'],
    accent: '#5b3b22',
  },
  {
    name: 'The Kumar Family',
    role: 'Family Memory Archive',
    theme: 'premium',
    summary:
      'Generations of photographs, voices and milestones gathered into one quiet, lasting place.',
    highlights: ['Timeline', 'Gallery', 'Stories', 'Tree'],
    accent: '#ef6f8e',
  },
  {
    name: 'Wedding Celebration',
    role: 'Event Website',
    theme: 'premium',
    summary:
      'Everything guests need and everything the couple wants to remember — elegantly in one link.',
    highlights: ['Story', 'Schedule', 'Gallery', 'RSVP'],
    accent: '#f59e42',
  },
];

export const process = [
  {
    step: '01',
    title: 'Discovery Call',
    blurb: 'We get to know you, your goals and the story you want to tell.',
  },
  {
    step: '02',
    title: 'Planning',
    blurb: 'We shape the structure, content and feel — a clear map before we build.',
  },
  {
    step: '03',
    title: 'Design',
    blurb: 'We craft a look that feels unmistakably you, refined together.',
  },
  {
    step: '04',
    title: 'Development',
    blurb: 'We build it fast, responsive and polished down to the details.',
  },
  {
    step: '05',
    title: 'Launch',
    blurb: 'We ship it to the world — and stay on to keep it cared for.',
  },
];

export const pricingTiers = [
  {
    name: 'Essential',
    tagline: 'Perfect for students and professionals',
    points: ['Single-page personal site', 'Mobile-first design', 'Your content, beautifully set'],
    featured: false,
  },
  {
    name: 'Professional',
    tagline: 'For creators and growing personal brands',
    points: ['Multi-section experience', 'Custom interactions', 'Brand + social integration'],
    featured: true,
  },
  {
    name: 'Signature',
    tagline: 'Fully customized experiences',
    points: ['Bespoke design language', 'Rich media & motion', 'Memory archives & events'],
    featured: false,
  },
];

export const faqs = [
  {
    q: 'How long does it take?',
    a: 'Most personal sites go from first call to launch in one to three weeks, depending on how much content and customization you want. We move at a pace that feels calm, not rushed.',
  },
  {
    q: 'Can I update my website later?',
    a: 'Absolutely. We build with easy updates in mind, and our Fully Managed care means you can simply send us changes — or we can set you up to edit the essentials yourself.',
  },
  {
    q: 'Do I own the website?',
    a: 'Yes. It is yours — the design, the content and the domain. We are the team that builds and maintains it, never a landlord you rent your own story from.',
  },
  {
    q: 'Can you help with hosting?',
    a: 'We handle hosting, domains and the technical upkeep end to end as part of being Fully Managed, so you never have to think about servers or renewals.',
  },
  {
    q: 'Can you build event websites?',
    a: 'Weddings, reunions, graduations, milestones — yes. We create elegant event sites with schedules, galleries and everything your guests need in a single link.',
  },
];

// Build-My-Story quiz — maps answers to a recommended tier.
export const quizQuestions = [
  {
    q: 'Which sounds most like you right now?',
    options: [
      { label: 'A student or job seeker', weight: 0 },
      { label: 'A working professional', weight: 1 },
      { label: 'A creator or freelancer', weight: 2 },
      { label: 'A founder or public figure', weight: 3 },
    ],
  },
  {
    q: 'What is the site mainly for?',
    options: [
      { label: 'A simple, sharp first impression', weight: 0 },
      { label: 'Showing my work and credibility', weight: 1 },
      { label: 'Growing an audience or brand', weight: 2 },
      { label: 'A rich, one-of-a-kind experience', weight: 3 },
    ],
  },
  {
    q: 'How much content do you have?',
    options: [
      { label: 'Just the essentials', weight: 0 },
      { label: 'A handful of projects', weight: 1 },
      { label: 'Plenty — work, media, story', weight: 2 },
      { label: 'Years of memories & media', weight: 3 },
    ],
  },
  {
    q: 'How custom should it feel?',
    options: [
      { label: 'Clean and ready fast', weight: 0 },
      { label: 'Polished and professional', weight: 1 },
      { label: 'Distinctly my style', weight: 2 },
      { label: 'Completely bespoke', weight: 3 },
    ],
  },
];

export const quizResults = {
  Essential: {
    name: 'Essential',
    line: 'A clean, fast personal site that makes a sharp first impression.',
  },
  Professional: {
    name: 'Professional',
    line: 'A polished, multi-section presence built to grow your reputation.',
  },
  Signature: {
    name: 'Signature',
    line: 'A fully bespoke experience worthy of your whole story.',
  },
};

// Cost estimator — relative ranges only (no exact prices per brief).
export const estimatorTypes = [
  { key: 'portfolio', label: 'Portfolio', range: 'Essential range', bars: 1 },
  { key: 'creator', label: 'Creator Site', range: 'Professional range', bars: 2 },
  { key: 'event', label: 'Event Site', range: 'Professional range', bars: 2 },
  { key: 'memory', label: 'Memory Archive', range: 'Signature range', bars: 3 },
];

// Preview "websites" the laptop mockup cycles through.
export const previewSites = [
  { key: 'student', label: 'Student Portfolio' },
  { key: 'creator', label: 'Creator Website' },
  { key: 'brand', label: 'Personal Brand' },
  { key: 'memory', label: 'Memory Page' },
];

// Hero typewriter roles.
export const heroRoles = ['Developer', 'Founder', 'Builder', 'Creator', 'Designer'];

// Theme switcher presets — monochrome only (black & white), matching the
// Aperture Personal identity. Transforms the preview's palette.
export const themePresets = [
  { key: 'professional', label: 'Professional', bg: '#ffffff', ink: '#1a1a1a', accent: '#1a1a1a' },
  { key: 'creative', label: 'Creative', bg: '#111111', ink: '#ffffff', accent: '#ffffff' },
  { key: 'minimal', label: 'Minimal', bg: '#f5f5f5', ink: '#222222', accent: '#888888' },
  { key: 'premium', label: 'Premium', bg: '#000000', ink: '#ffffff', accent: '#d4d4d4' },
];

// The headline promise for Aperture Personal.
export const handover = {
  hours: 48,
  badge: '48-Hour Handover',
  line: 'Your finished website, in your hands within 48 hours.',
};

// Skill ecosystem — orbiting nodes.
export const skillNodes = [
  'Design',
  'Branding',
  'Web',
  'Motion',
  'Story',
  'Strategy',
  'Photography',
  'Code',
];

// Achievement wall badges.
export const achievements = [
  { icon: '🏆', label: 'Hackathon Winner', story: 'First place among 120 teams — 36 sleepless, glorious hours.' },
  { icon: '🎓', label: 'Engineering Student', story: 'Final-year, top of the cohort, still asking the best questions.' },
  { icon: '🚀', label: 'Founder', story: 'Took an idea from a notebook sketch to real users in 90 days.' },
  { icon: '📱', label: 'App Developer', story: 'Shipped three apps; the latest crossed its first 10k downloads.' },
];

// Career timeline milestones.
export const careerMilestones = [
  { year: '2021', title: 'First Internship', detail: 'Where the spark turned into a craft.', tag: 'Certificate' },
  { year: '2022', title: 'First Shipped Product', detail: 'A small tool, real users, an enormous lesson.', tag: 'Project' },
  { year: '2023', title: 'Award Recognition', detail: 'Recognized for work that mattered.', tag: 'Photo' },
  { year: '2024', title: 'Founded a Studio', detail: 'Turned momentum into something of my own.', tag: 'Document' },
  { year: '2026', title: 'Scaling the Vision', detail: 'Bigger rooms, bigger problems, same curiosity.', tag: 'Project' },
];

// Memory time machine entries.
export const memoryYears = [
  { year: 2020, caption: 'The beginning', tone: '#fde8c4' },
  { year: 2021, caption: 'First steps', tone: '#f7d9a8' },
  { year: 2022, caption: 'Finding our people', tone: '#f7a8b8' },
  { year: 2023, caption: 'The big move', tone: '#f4b78c' },
  { year: 2024, caption: 'Milestones', tone: '#f4754b' },
  { year: 2025, caption: 'Coming together', tone: '#ef6f8e' },
  { year: 2026, caption: 'Here, now', tone: '#e6a532' },
];
