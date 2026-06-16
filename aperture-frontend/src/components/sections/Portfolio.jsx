'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, Check } from 'lucide-react';
import { Reveal, AnimatedHeading } from '@/components/ui/Motion';

const categories = ['All', 'Web Applications', 'Enterprise Software', 'Management Platforms', 'AI Solutions'];

const projects = [
  {
    title: 'ScholarHive',
    category: 'Web Applications',
    description: 'Collaborative student learning and notes-sharing platform with real-time sync and smart organization.',
    tech: ['React', 'Node.js', 'MongoDB'],
    year: '2025',
    overview:
      'ScholarHive is a collaborative learning platform that lets students share notes, organise study material, and work together in real time. We focused on a fast, distraction-free interface backed by reliable real-time synchronisation so groups stay perfectly in sync.',
    highlights: [
      'Real-time collaborative editing & sync',
      'Smart auto-organisation of notes',
      'Role-based study groups & sharing',
      'Full-text search across all material',
    ],
    metrics: [
      { value: 'Real-time', label: 'Sync engine' },
      { value: '99.9%', label: 'Uptime target' },
      { value: '< 1s', label: 'Load time' },
    ],
  },
  {
    title: 'Inventory Management System',
    category: 'Enterprise Software',
    description: 'Enterprise-grade inventory tracking, stock control, reporting, and automated workflow management.',
    tech: ['React', 'Express', 'MongoDB'],
    year: '2025',
    overview:
      'A comprehensive inventory platform built for operations teams managing complex stock across multiple locations. Automated reorder workflows, granular reporting, and real-time stock visibility replaced a tangle of manual spreadsheets.',
    highlights: [
      'Multi-location stock tracking',
      'Automated reorder workflows',
      'Custom reporting & exports',
      'Audit trail on every transaction',
    ],
    metrics: [
      { value: 'Multi-site', label: 'Inventory' },
      { value: 'Automated', label: 'Reordering' },
      { value: 'Real-time', label: 'Dashboards' },
    ],
  },
  {
    title: 'Apartment Utility Platform',
    category: 'Management Platforms',
    description: 'Utility billing, maintenance tracking, resident administration, and end-to-end operations management.',
    tech: ['React', 'Node.js', 'MongoDB'],
    year: '2026',
    overview:
      'An end-to-end management platform for residential communities — handling utility billing, maintenance requests, and resident administration in one place. Designed to cut admin overhead for managers while giving residents a clean self-service portal.',
    highlights: [
      'Automated utility billing',
      'Maintenance request tracking',
      'Resident self-service portal',
      'Operations & reporting dashboard',
    ],
    metrics: [
      { value: 'End-to-end', label: 'Operations' },
      { value: 'Self-service', label: 'Resident portal' },
      { value: 'Automated', label: 'Billing' },
    ],
  },
  {
    title: 'TB Detection Using AI',
    category: 'AI Solutions',
    description: 'Artificial intelligence system for tuberculosis detection using deep learning on medical imaging data.',
    tech: ['Python', 'Machine Learning', 'AI'],
    year: '2026',
    overview:
      'A deep-learning system that assists in the early detection of tuberculosis from chest imaging. Trained on medical imaging data, the model surfaces high-probability cases to support faster clinical screening.',
    highlights: [
      'Deep-learning image classification',
      'Trained on medical imaging datasets',
      'Probability scoring for screening',
      'Explainable result visualisations',
    ],
    metrics: [
      { value: 'Deep CNN', label: 'Architecture' },
      { value: 'Imaging', label: 'Data source' },
      { value: 'Screening', label: 'Use case' },
    ],
  },
];

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selected, setSelected] = useState(null);

  const filtered =
    activeCategory === 'All' ? projects : projects.filter((p) => p.category === activeCategory);

  // Lock body scroll while modal open
  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [selected]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setSelected(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section id="work" className="relative overflow-hidden border-t border-line bg-paper py-28 md:py-40">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-16 grid grid-cols-1 gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <span className="eyebrow">(06) — Selected Work</span>
          </Reveal>
          <div className="md:col-span-9">
            <AnimatedHeading
              as="h2"
              text="Visions transformed into realities."
              className="font-display text-5xl font-medium leading-[1.05] text-ink md:text-7xl"
            />
          </div>
        </div>

        {/* Filters */}
        <Reveal className="mb-16 flex flex-wrap gap-3 border-y border-line py-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-5 py-2 text-xs uppercase tracking-[0.12em] transition-all duration-300 ${
                activeCategory === category
                  ? 'border-ink bg-ink text-paper'
                  : 'border-line text-ash hover:border-ink hover:text-ink'
              }`}
            >
              {category}
            </button>
          ))}
        </Reveal>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 gap-px bg-line md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                layout
                key={project.title}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelected(project)}
                className="group relative cursor-pointer bg-paper p-8 transition-colors duration-500 hover:bg-ink md:p-12"
              >
                <div className="mb-16 flex items-start justify-between">
                  <span className="text-xs uppercase tracking-[0.2em] text-smoke transition-colors group-hover:text-paper/50">
                    {project.category}
                  </span>
                  <span className="font-display text-lg italic text-smoke transition-colors group-hover:text-paper/50">
                    {project.year}
                  </span>
                </div>

                <h3 className="font-display text-4xl font-medium text-ink transition-colors duration-500 group-hover:text-paper md:text-6xl">
                  {project.title}
                </h3>

                <p className="mt-6 max-w-md leading-relaxed text-ash transition-colors duration-500 group-hover:text-paper/70">
                  {project.description}
                </p>

                <div className="mt-10 flex items-end justify-between">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-line px-3 py-1 text-[10px] uppercase tracking-wider text-ash transition-colors group-hover:border-paper/30 group-hover:text-paper/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-ink text-ink transition-all duration-500 group-hover:rotate-45 group-hover:border-paper group-hover:bg-paper group-hover:text-ink">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Modal */}
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

function ProjectModal({ project, onClose }) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center md:items-center"
          initial="hidden"
          animate="show"
          exit="hidden"
        >
          {/* Backdrop */}
          <motion.div
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-h-[92vh] w-full overflow-y-auto border border-line bg-paper md:max-w-3xl"
          >
            {/* Sticky header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-paper/90 px-6 py-4 backdrop-blur-md md:px-10">
              <span className="text-xs uppercase tracking-[0.2em] text-smoke">
                {project.category} — {project.year}
              </span>
              <button
                onClick={onClose}
                aria-label="Close"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="px-6 py-10 md:px-10 md:py-12">
              <h3 className="font-display text-5xl font-medium leading-tight text-ink md:text-7xl">
                {project.title}
              </h3>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ash">
                {project.overview}
              </p>

              {/* Metrics */}
              <div className="mt-10 grid grid-cols-3 gap-px border border-line bg-line">
                {project.metrics.map((m) => (
                  <div key={m.label} className="bg-paper p-5 text-center">
                    <p className="font-display text-2xl font-medium text-ink md:text-3xl">
                      {m.value}
                    </p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-smoke">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Highlights */}
              <div className="mt-10">
                <span className="eyebrow">Highlights</span>
                <ul className="mt-5 border-t border-line">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-4 border-b border-line py-4">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ink">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-lg text-ink">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech */}
              <div className="mt-10 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-ink px-4 py-1.5 text-xs uppercase tracking-wider text-ink"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
