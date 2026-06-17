'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Reveal, AnimatedHeading } from '@/components/ui/Motion';
import { site } from '@/lib/site';

const paragraphs = [
  "When I started Aperture, I wasn't trying to build just another software company.",
  'I wanted to build a team that cared about the details.',
  'As students, we often see the world differently. We are naturally curious, constantly learning, and unafraid to challenge conventional approaches. While many view being student-led as a limitation, I see it as one of our greatest strengths. We bring fresh perspectives, adaptability, and a genuine passion for creating solutions that make a difference.',
  'At Aperture, we believe that great products are not defined by the number of features they have, but by how thoughtfully they solve a problem. A fast-loading website, an intuitive user experience, a seamless workflow, a reliable backend, or a simple interaction that feels effortless to the user—these are the details that matter.',
  'That is why we pay close attention to every aspect of the solutions we build.',
  'We take time to understand the people behind every project. We listen before we build. We analyze before we implement. We question assumptions, explore possibilities, and refine every element until it aligns with the vision and goals of our clients.',
  'Being student-led also means we carry an endless drive to improve. We are not constrained by "how things have always been done." Instead, we focus on how they can be done better. Every project is an opportunity to learn, innovate, and deliver something we are genuinely proud of.',
  'Aperture was founded on a simple belief: excellence comes from commitment, not titles. When passion meets discipline, and creativity meets attention to detail, remarkable things can be built.',
  "Whether you're a startup with an ambitious idea, a business looking to scale, or an organization seeking digital transformation, our promise remains the same—we will treat your project with the same care, ownership, and dedication as if it were our own.",
  'Thank you for visiting Aperture. We look forward to building something meaningful together.',
];

const team = [
  {
    name: 'Sanjeev',
    role: 'Founder & Team Lead',
    focus: 'Full-Stack Engineering · Product Strategy · AI Systems',
    bio: 'Leads architecture decisions and client relationships. Obsessed with the gap between what software promises and what it actually delivers.',
    linkedin: site.social.linkedin,
    github: site.social.github,
    initials: 'SJ',
  },
  {
    name: 'Engineering Lead',
    role: 'Backend & Cloud',
    focus: 'Node.js · AWS · Distributed Systems',
    bio: 'Owns infrastructure, CI/CD pipelines, and the reliability of every system Aperture ships. Believes good architecture is invisible.',
    linkedin: site.social.linkedin,
    github: site.social.github,
    initials: 'EL',
  },
  {
    name: 'Design Lead',
    role: 'UI/UX & Frontend',
    focus: 'React · Figma · Interaction Design',
    bio: 'Translates complex requirements into interfaces that feel effortless. Champions accessibility and performance as design constraints, not afterthoughts.',
    linkedin: site.social.linkedin,
    github: site.social.github,
    initials: 'DL',
  },
  {
    name: 'AI & Data Lead',
    role: 'Machine Learning · LLM Orchestration',
    focus: 'Python · PyTorch · LangChain · Agentic AI',
    bio: 'Builds the intelligence layer — from fine-tuned models to production-grade agentic workflows. Keeps the team honest about what AI can and cannot do.',
    linkedin: site.social.linkedin,
    github: site.social.github,
    initials: 'AL',
  },
];

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

export function Team() {
  return (
    <section id="team" className="relative overflow-hidden border-t border-line bg-ink py-28 md:py-40">
      {/* Oversized quotation mark */}
      <span className="pointer-events-none absolute -top-10 right-6 select-none font-display text-[28vw] italic leading-none text-paper/[0.04] md:right-20 md:text-[20vw]">
        &rdquo;
      </span>

      <div className="container relative z-10 mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-16 grid grid-cols-1 gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <span className="text-[0.7rem] uppercase tracking-[0.28em] text-paper/50">
              (02) — Founder&rsquo;s Note
            </span>
          </Reveal>
          <div className="md:col-span-9">
            <AnimatedHeading
              as="h2"
              text="A Note from the Founder"
              className="font-display text-5xl font-medium leading-[1.05] text-paper md:text-7xl"
            />
          </div>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-3" />
          <div className="md:col-span-9 lg:col-span-8">
            <div className="space-y-7">
              {paragraphs.map((text, i) => (
                <Reveal key={i} delay={Math.min(i * 0.04, 0.3)}>
                  <p
                    className={
                      i < 2
                        ? 'font-display text-2xl leading-snug text-paper md:text-3xl'
                        : 'text-lg leading-relaxed text-paper/70'
                    }
                  >
                    {text}
                  </p>
                </Reveal>
              ))}
            </div>

            {/* Signature */}
            <Reveal delay={0.1} className="mt-16 border-t border-paper/15 pt-10">
              <p className="font-display text-5xl italic text-paper md:text-6xl">Sanjeev</p>
              <p className="mt-4 text-[0.7rem] uppercase tracking-[0.28em] text-paper/50">
                Founder &amp; Team Lead — Aperture
              </p>
            </Reveal>
          </div>
        </div>

        {/* ── Team Section ── */}
        <div className="mt-28 border-t border-paper/15 pt-20">
          <div className="mb-16 grid grid-cols-1 gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-3">
              <span className="text-[0.7rem] uppercase tracking-[0.28em] text-paper/50">
                The team
              </span>
            </Reveal>
            <div className="md:col-span-9">
              <AnimatedHeading
                as="h2"
                text="The people behind the work."
                className="font-display text-4xl font-medium leading-[1.05] text-paper md:text-6xl"
              />
              <Reveal delay={0.15} className="mt-6">
                <p className="max-w-xl text-lg leading-relaxed text-paper/60">
                  A compact, senior-weighted team where every member ships. No juniors left
                  unsupervised. No bloated hierarchies. Just focused engineers and designers
                  who take ownership.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-px bg-paper/10 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => (
              <Reveal key={member.name} delay={i * 0.07}>
                <div className="group flex h-full flex-col bg-ink p-8 transition-colors duration-500 hover:bg-paper/5">
                  {/* Avatar initials */}
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-paper/30 font-display text-xl italic text-paper/60 transition-colors group-hover:border-paper group-hover:text-paper">
                    {member.initials}
                  </div>

                  <h3 className="font-display text-2xl font-medium text-paper md:text-3xl">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-[0.7rem] uppercase tracking-[0.2em] text-paper/40">
                    {member.role}
                  </p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-paper/60">
                    {member.bio}
                  </p>
                  <p className="mt-4 text-xs text-paper/30">{member.focus}</p>

                  <div className="mt-6 flex items-center gap-3 border-t border-paper/10 pt-6">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on LinkedIn`}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/20 text-paper/50 transition-colors hover:border-paper hover:text-paper"
                    >
                      <LinkedInIcon />
                    </a>
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on GitHub`}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/20 text-paper/50 transition-colors hover:border-paper hover:text-paper"
                    >
                      <GitHubIcon />
                    </a>
                    <span className="ml-auto text-[10px] uppercase tracking-widest text-paper/30">
                      0{i + 1}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
