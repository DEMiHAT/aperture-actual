// Proprietary product data — the Aperture Suite. Used by the /products
// landing page. Mirrors the shape and conventions of lib/services.js.

export const products = [
  {
    slug: 'beacon',
    title: 'Beacon',
    category: 'Assessment & Placement Platform',
    status: 'Available',
    description: [
      "Beacon is Aperture's flagship assessment and placement platform built for educational institutions, universities, and organizations.",
      'It enables secure coding assessments, automated evaluation, proctoring, analytics, technical examinations, and placement workflows from a single unified platform.',
      'Designed with scalability and reliability in mind, Beacon modernizes the assessment experience while simplifying administration for institutions and recruiters alike.',
    ],
  },
  {
    slug: 'something',
    title: 'Something',
    category: 'Engineering Student Operating System',
    status: 'In Development',
    description: [
      "Something is Aperture's proprietary platform built specifically for engineering students.",
      'Rather than being just another code editor or IDE, Something brings together the tools students need throughout their academic journey into one unified experience.',
      'The platform combines coding, concept visualization, practical laboratories, project management, technical interview preparation, learning resources, notes, and productivity tools within a single workspace.',
      'Its vision is to become the complete operating system for engineering education, eliminating fragmented workflows and helping students learn, build, and prepare for industry from one platform.',
    ],
  },
  {
    slug: 'anyone',
    title: 'Anyone',
    category: 'CRM & Operations Platform',
    status: 'In Development',
    description: [
      "Anyone is Aperture's intelligent CRM and operations platform designed to help organizations manage relationships, operations, outreach, workflows, and internal collaboration.",
      'It combines customer management, workflow automation, operational insights, and productivity tools into one unified platform, enabling businesses to operate more efficiently while maintaining complete visibility across teams.',
      'Anyone is designed to become the operational backbone for modern organizations.',
    ],
  },
];

export const principles = [
  {
    title: 'Purpose First',
    detail:
      'Every product begins with a real problem worth solving, ensuring technology always serves people rather than the other way around.',
  },
  {
    title: 'Minimal by Design',
    detail:
      'Clean interfaces, thoughtful interactions, and focused experiences allow users to accomplish more with less complexity.',
  },
  {
    title: 'Built to Scale',
    detail:
      'Our platforms are engineered with long-term growth in mind, capable of evolving alongside the organizations and individuals who rely on them.',
  },
  {
    title: 'Powered by Intelligence',
    detail:
      'Artificial intelligence is integrated where it creates genuine value—enhancing productivity, automation, and decision-making without overwhelming the user experience.',
  },
];

export const getProduct = (slug) => products.find((p) => p.slug === slug);
