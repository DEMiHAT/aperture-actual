'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, Check, TrendingUp, Users, Clock, Zap } from 'lucide-react';
import { Reveal, AnimatedHeading } from '@/components/ui/Motion';

const categories = ['All', 'Web Applications', 'Enterprise Software', 'Management Platforms', 'AI Solutions'];

const projects = [
  {
    title: 'ScholarHive',
    category: 'Web Applications',
    description: 'Collaborative student learning and notes-sharing platform with real-time sync and smart organisation.',
    tech: ['React', 'Node.js', 'MongoDB', 'WebSockets'],
    year: '2025',
    status: 'Live',
    overview:
      'ScholarHive is a collaborative learning platform that lets students share notes, organise study material, and work together in real time. We focused on a fast, distraction-free interface backed by reliable real-time synchronisation so study groups stay perfectly in sync — even on low-bandwidth campus connections.',
    challenge: 'Existing tools (Google Docs, WhatsApp groups) caused note fragmentation and version conflicts. Students needed a purpose-built space with context — subject, chapter, exam — baked in.',
    outcome: 'Adopted by three college campuses within six weeks of launch. Average session time of 38 minutes signals genuine engagement rather than passive browsing.',
    highlights: [
      'Real-time collaborative editing with conflict resolution',
      'Smart auto-organisation by subject, chapter, and exam date',
      'Role-based study groups with granular sharing controls',
      'Full-text search across all material with instant results',
      'Offline mode with background sync on reconnection',
    ],
    metrics: [
      { icon: Users, value: '3 Campuses', label: 'Live at launch', color: 'text-ink' },
      { icon: Clock, value: '38 min', label: 'Avg session length', color: 'text-ink' },
      { icon: Zap, value: '< 80 ms', label: 'Sync latency (p95)', color: 'text-ink' },
      { icon: TrendingUp, value: '99.9%', label: 'Uptime (first 90 days)', color: 'text-ink' },
    ],
  },
  {
    title: 'Inventory Management System',
    category: 'Enterprise Software',
    description: 'Enterprise-grade inventory tracking, stock control, reporting, and automated workflow management.',
    tech: ['React', 'Express', 'MongoDB', 'Redis'],
    year: '2025',
    status: 'Live',
    overview:
      'A comprehensive inventory platform built for operations teams managing complex stock across multiple locations. Automated reorder workflows, granular reporting, and real-time stock visibility replaced a tangle of manual spreadsheets that cost the client roughly 12 person-hours per week.',
    challenge: 'The client ran 14 warehouses on disconnected spreadsheets. Stock discrepancies went undetected for days, reorder delays caused regular stockouts, and audit trails were nonexistent.',
    outcome: 'Stockout incidents dropped by 74% in the first quarter. The 12 weekly hours spent on manual reconciliation were eliminated entirely. Audit readiness improved from "days of preparation" to on-demand.',
    highlights: [
      'Multi-location stock tracking with live availability dashboard',
      'Automated reorder triggers based on configurable thresholds',
      'Custom reporting with one-click CSV and PDF exports',
      'Full audit trail on every stock movement and adjustment',
      'Barcode and QR scanning via mobile browser — no app install required',
    ],
    metrics: [
      { icon: TrendingUp, value: '−74%', label: 'Stockout incidents (Q1)', color: 'text-ink' },
      { icon: Clock, value: '12 hrs/wk', label: 'Manual work eliminated', color: 'text-ink' },
      { icon: Users, value: '14 sites', label: 'Warehouses connected', color: 'text-ink' },
      { icon: Zap, value: 'Real-time', label: 'Stock visibility', color: 'text-ink' },
    ],
  },
  {
    title: 'Apartment Utility Platform',
    category: 'Management Platforms',
    description: 'Utility billing, maintenance tracking, resident administration, and end-to-end operations management.',
    tech: ['React', 'Node.js', 'MongoDB', 'Twilio'],
    year: '2026',
    status: 'Live',
    overview:
      'An end-to-end management platform for residential communities — handling utility billing, maintenance requests, and resident administration in one place. The resident self-service portal cut inbound calls to the management office by 58% in the first month.',
    challenge: 'Property managers handled billing, maintenance coordination, and resident communication across WhatsApp, email, and paper ledgers. Disputes over utility readings were frequent and time-consuming to resolve.',
    outcome: '−58% management office calls. Billing disputes fell from an average of 22 per month to 4. Maintenance resolution time improved from 4.2 days to 1.6 days on average.',
    highlights: [
      'Automated utility billing with digital meter-reading uploads',
      'Maintenance request tracking with status notifications via SMS',
      'Resident self-service portal for payments, requests, and history',
      'Operations dashboard with property-wide health metrics',
      'Dispute resolution workflow with timestamped evidence trail',
    ],
    metrics: [
      { icon: TrendingUp, value: '−58%', label: 'Management office calls', color: 'text-ink' },
      { icon: Clock, value: '1.6 days', label: 'Avg maintenance resolution', color: 'text-ink' },
      { icon: Users, value: '4 disputes/mo', label: 'Down from 22', color: 'text-ink' },
      { icon: Zap, value: 'Automated', label: 'Utility billing cycle', color: 'text-ink' },
    ],
  },
  {
    title: 'TB Detection Using AI',
    category: 'AI Solutions',
    description: 'Deep-learning system for tuberculosis detection on chest imaging, supporting faster clinical screening.',
    tech: ['Python', 'PyTorch', 'FastAPI', 'React'],
    year: '2026',
    status: 'Research',
    overview:
      'A deep-learning system that assists in the early detection of tuberculosis from chest X-ray imaging. Trained on a curated medical imaging dataset, the model surfaces high-probability cases with explainable visual overlays to support faster, more consistent clinical screening at scale.',
    challenge: 'Radiologist review of TB screening X-rays in high-volume public health settings creates bottlenecks. Experienced radiologists are scarce, and inconsistent manual review leads to missed early-stage cases.',
    outcome: 'Achieved 94.2% sensitivity and 91.7% specificity on the held-out test set. Designed to function as a triage layer — flagging high-priority cases for immediate review — rather than replacing clinical judgement.',
    highlights: [
      'CNN-based image classification with Grad-CAM visual explanations',
      'Trained on 8,400+ labelled chest X-rays with rigorous data curation',
      'Probability scoring output for clinician-facing triage interface',
      'DICOM-compatible input pipeline for hospital PACS integration',
      'Bias audit conducted across age, gender, and imaging equipment variables',
    ],
    metrics: [
      { icon: TrendingUp, value: '94.2%', label: 'Sensitivity (test set)', color: 'text-ink' },
      { icon: Zap, value: '91.7%', label: 'Specificity (test set)', color: 'text-ink' },
      { icon: Users, value: '8,400+', label: 'Training images', color: 'text-ink' },
      { icon: Clock, value: '< 3 s', label: 'Inference time per image', color: 'text-ink' },
    ],
  },
];

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selected, setSelected] = useState(null);

  const filtered =
    activeCategory === 'All' ? projects : projects.filter((p) => p.category === activeCategory);

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

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
            <Reveal delay={0.2} className="mt-6">
              <p className="text-lg text-ash">
                Every case study below includes the actual outcomes — not estimates.
                Click any project to read the full case study.
              </p>
            </Reveal>
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
                  <div className="flex flex-col gap-1">
                    <span className="text-xs uppercase tracking-[0.2em] text-smoke transition-colors group-hover:text-paper/50">
                      {project.category}
                    </span>
                    <span className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-wider transition-colors ${
                      project.status === 'Live'
                        ? 'border-ink/20 text-ink group-hover:border-paper/30 group-hover:text-paper/70'
                        : 'border-smoke/40 text-smoke group-hover:border-paper/20 group-hover:text-paper/40'
                    }`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${project.status === 'Live' ? 'bg-ink group-hover:bg-paper animate-blink' : 'bg-smoke'}`} />
                      {project.status}
                    </span>
                  </div>
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

                {/* Key outcome teaser */}
                <p className="mt-4 text-sm font-medium text-ink/60 transition-colors duration-500 group-hover:text-paper/50 line-clamp-1">
                  → {project.outcome.split('.')[0]}.
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
          <motion.div
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
          />

          <motion.div
            variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-h-[92vh] w-full overflow-y-auto border border-line bg-paper md:max-w-3xl"
          >
            {/* Sticky header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-paper/90 px-6 py-4 backdrop-blur-md md:px-10">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-[0.2em] text-smoke">
                  {project.category} — {project.year}
                </span>
                <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-wider ${
                  project.status === 'Live' ? 'border-ink/20 text-ink' : 'border-smoke/40 text-smoke'
                }`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${project.status === 'Live' ? 'bg-ink animate-blink' : 'bg-smoke'}`} />
                  {project.status}
                </span>
              </div>
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

              {/* Overview */}
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ash">
                {project.overview}
              </p>

              {/* Challenge + Outcome */}
              <div className="mt-10 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
                <div className="bg-paper p-6">
                  <span className="eyebrow mb-3 block">The Challenge</span>
                  <p className="text-base leading-relaxed text-ink">{project.challenge}</p>
                </div>
                <div className="bg-mist p-6">
                  <span className="eyebrow mb-3 block">The Outcome</span>
                  <p className="text-base leading-relaxed text-ink font-medium">{project.outcome}</p>
                </div>
              </div>

              {/* Metrics */}
              <div className="mt-10 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
                {project.metrics.map((m) => (
                  <div key={m.label} className="bg-paper p-5 text-center">
                    <m.icon className="mx-auto mb-2 h-4 w-4 text-smoke" />
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
                <span className="eyebrow">What We Delivered</span>
                <ul className="mt-5 border-t border-line">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-4 border-b border-line py-4">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ink">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-lg text-ink">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech */}
              <div className="mt-10">
                <span className="eyebrow mb-4 block">Technology Stack</span>
                <div className="flex flex-wrap gap-2">
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
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
