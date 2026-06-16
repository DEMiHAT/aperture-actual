'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal, AnimatedHeading } from '@/components/ui/Motion';

/* ------------------------------------------------------------------ */
/* Brand logos restricted on Simple Icons — inlined as real SVGs       */
/* ------------------------------------------------------------------ */
const InlineLogos = {
  aws: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.24-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.28-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.36c.574.183.99.439 1.237.766.247.327.367.702.367 1.117 0 .343-.072.655-.207.926a2.157 2.157 0 0 1-.583.703c-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167z" />
      <path d="M21.698 16.207c-2.626 1.94-6.442 2.969-9.722 2.969-4.598 0-8.74-1.7-11.87-4.526-.247-.223-.024-.527.27-.351 3.384 1.963 7.559 3.153 11.877 3.153 2.914 0 6.114-.607 9.06-1.852.439-.2.814.287.385.607z" />
      <path d="M22.792 14.961c-.336-.43-2.22-.207-3.074-.103-.255.032-.295-.192-.063-.36 1.5-1.053 3.967-.75 4.254-.398.287.36-.08 2.826-1.485 4.007-.215.184-.423.088-.327-.151.32-.79 1.03-2.57.694-3.002z" />
    </svg>
  ),
  azure: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M5.483 21.3H24L14.025 4.013l-3.038 8.347 5.836 6.938L5.483 21.3zM13.23 2.7L6.954 7.882 0 19.866h5.646L13.23 2.7z" />
    </svg>
  ),
  openai: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0805.0805 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
    </svg>
  ),
};

/* slug = Simple Icons slug (real official logo). svg = inline key. */
const categories = [
  {
    id: 'frontend',
    name: 'Experience & Interfaces',
    techs: [
      { name: 'React', slug: 'react' },
      { name: 'Next.js', slug: 'nextdotjs' },
      { name: 'Vue', slug: 'vuedotjs' },
      { name: 'Angular', slug: 'angular' },
      { name: 'Svelte', slug: 'svelte' },
      { name: 'TypeScript', slug: 'typescript' },
      { name: 'Tailwind CSS', slug: 'tailwindcss' },
    ],
  },
  {
    id: 'backend',
    name: 'Application & APIs',
    techs: [
      { name: 'Node.js', slug: 'nodedotjs' },
      { name: 'Express', slug: 'express' },
      { name: 'NestJS', slug: 'nestjs' },
      { name: 'Django', slug: 'django' },
      { name: 'FastAPI', slug: 'fastapi' },
      { name: 'Spring', slug: 'spring' },
      { name: 'GraphQL', slug: 'graphql' },
    ],
  },
  {
    id: 'mobile',
    name: 'Mobile & Cross-Platform',
    techs: [
      { name: 'React Native', slug: 'react' },
      { name: 'Flutter', slug: 'flutter' },
      { name: 'Swift', slug: 'swift' },
      { name: 'Kotlin', slug: 'kotlin' },
    ],
  },
  {
    id: 'database',
    name: 'Data & Storage',
    techs: [
      { name: 'PostgreSQL', slug: 'postgresql' },
      { name: 'MySQL', slug: 'mysql' },
      { name: 'MongoDB', slug: 'mongodb' },
      { name: 'Firebase', slug: 'firebase' },
      { name: 'Redis', slug: 'redis' },
      { name: 'Supabase', slug: 'supabase' },
      { name: 'Prisma', slug: 'prisma' },
    ],
  },
  {
    id: 'cloud',
    name: 'Cloud & Infrastructure',
    techs: [
      { name: 'AWS', svg: 'aws' },
      { name: 'Azure', svg: 'azure' },
      { name: 'Google Cloud', slug: 'googlecloud' },
      { name: 'Vercel', slug: 'vercel' },
      { name: 'Cloudflare', slug: 'cloudflare' },
    ],
  },
  {
    id: 'devops',
    name: 'DevOps & Delivery',
    techs: [
      { name: 'Docker', slug: 'docker' },
      { name: 'Kubernetes', slug: 'kubernetes' },
      { name: 'Terraform', slug: 'terraform' },
      { name: 'GitHub Actions', slug: 'githubactions' },
      { name: 'Jenkins', slug: 'jenkins' },
    ],
  },
  {
    id: 'ai',
    name: 'AI & Orchestration',
    techs: [
      { name: 'OpenAI', svg: 'openai' },
      { name: 'Anthropic', slug: 'anthropic' },
      { name: 'Gemini', slug: 'googlegemini' },
      { name: 'Mistral AI', slug: 'mistralai' },
      { name: 'LangChain', slug: 'langchain' },
      { name: 'CrewAI', slug: 'crewai' },
      { name: 'n8n', slug: 'n8n' },
      { name: 'Ollama', slug: 'ollama' },
      { name: 'Hugging Face', slug: 'huggingface' },
      { name: 'PyTorch', slug: 'pytorch' },
      { name: 'TensorFlow', slug: 'tensorflow' },
    ],
  },
];

function TechLogo({ tech }) {
  if (tech.svg) {
    return (
      <span className="inline-flex h-8 w-8 items-center justify-center text-ink md:h-9 md:w-9 [&>svg]:h-full [&>svg]:w-full">
        {InlineLogos[tech.svg]}
      </span>
    );
  }
  return (
    <img
      src={`https://cdn.simpleicons.org/${tech.slug}/000000`}
      alt={`${tech.name} logo`}
      width={36}
      height={36}
      loading="lazy"
      className="h-8 w-8 object-contain md:h-9 md:w-9"
    />
  );
}

export function Ecosystem() {
  const [activeId, setActiveId] = useState('frontend');
  const active = categories.find((c) => c.id === activeId);

  return (
    <section id="ecosystem" className="relative overflow-hidden border-t border-line bg-paper py-28 md:py-40">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-20 grid grid-cols-1 gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <span className="eyebrow">(03) — Tech Stack</span>
          </Reveal>
          <div className="md:col-span-9">
            <AnimatedHeading
              as="h2"
              text="Our engineering ecosystem."
              className="font-display text-5xl font-medium leading-[1.05] text-ink md:text-7xl"
            />
            <Reveal delay={0.2} className="mt-8 max-w-xl">
              <p className="text-lg leading-relaxed text-ash">
                A modern, enterprise-grade toolkit spanning product engineering, cloud, and
                applied AI — including the agentic orchestration frameworks powering our
                next-generation intelligent solutions.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-px border border-line bg-line lg:grid-cols-12">
          {/* Category selector */}
          <div className="flex flex-col bg-paper lg:col-span-5">
            {categories.map((category) => {
              const isActive = activeId === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveId(category.id)}
                  className={`group relative flex items-center justify-between border-b border-line px-8 py-6 text-left transition-colors duration-300 last:border-b-0 ${
                    isActive ? 'bg-ink' : 'bg-paper hover:bg-mist'
                  }`}
                >
                  <span
                    className={`font-display text-2xl font-medium transition-colors md:text-3xl ${
                      isActive ? 'text-paper' : 'text-ink'
                    }`}
                  >
                    {category.name}
                  </span>
                  <span
                    className={`text-xs uppercase tracking-widest transition-colors ${
                      isActive ? 'text-paper/60' : 'text-smoke'
                    }`}
                  >
                    {String(category.techs.length).padStart(2, '0')}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Logo grid display */}
          <div className="relative min-h-[460px] overflow-hidden bg-paper lg:col-span-7">
            {/* Decorative rotating ring */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-dashed border-line animate-spin-slow" />

            <div className="relative z-10 flex h-full flex-col p-8 md:p-10">
              <div className="mb-8 flex items-baseline gap-3">
                <span className="font-display text-4xl italic text-ink">{active.name}</span>
                <span className="text-xs uppercase tracking-widest text-smoke">
                  {active.techs.length} technologies
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="grid flex-1 grid-cols-2 gap-px self-start border border-line bg-line sm:grid-cols-3"
                >
                  {active.techs.map((tech, i) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                      className="group flex flex-col items-center justify-center gap-3 bg-paper p-6 transition-colors duration-300 hover:bg-mist"
                    >
                      <span className="grayscale transition-all duration-300 group-hover:scale-110">
                        <TechLogo tech={tech} />
                      </span>
                      <span className="text-center text-xs font-medium text-ash transition-colors group-hover:text-ink">
                        {tech.name}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
