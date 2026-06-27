'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowUpRight, X, Check, TrendingUp, Users, Clock, Zap } from 'lucide-react';
import { Reveal, AnimatedHeading } from '@/components/ui/Motion';

// Animated counter component for premium stats
function AnimatedCounter({ value, isHovered }) {
  const [displayValue, setDisplayValue] = useState('');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const match = value.toString().match(/^([\d.,]+)(.*)$/);
  const number = match ? parseFloat(match[1].replace(/,/g, '')) : 0;
  const suffix = match ? match[2] : '';

  useEffect(() => {
    if (!match) {
      setDisplayValue(value);
      return;
    }
    if (!isInView && !isHovered) return;
    
    const duration = 1.2;
    let startTime = null;
    let frameId;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = Math.floor(easeProgress * number);
      
      setDisplayValue(`${currentVal}${suffix}`);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, isHovered, number, suffix, value, match]);

  return <span ref={ref}>{displayValue || value}</span>;
}

// Hover components for high-tech blueprint layout
function FarCryHover() {
  return (
    <>
      <div className="absolute top-6 right-6 w-48 border border-paper/15 bg-paper/[0.02] p-3 rounded backdrop-blur-sm">
        <div className="flex justify-between items-center border-b border-paper/10 pb-1.5 mb-1.5">
          <span className="font-semibold text-paper/80 font-mono text-[9px]">REPORT #4892</span>
          <span className="h-1.5 w-1.5 rounded-full bg-paper animate-blink" />
        </div>
        <div className="space-y-1 text-paper/50 font-mono text-[9px]">
          <div className="flex justify-between"><span>SCORE:</span><span className="text-paper/80 font-semibold">94%</span></div>
          <div className="flex justify-between"><span>INTEGRITY:</span><span className="text-paper/80">99.9%</span></div>
          <div className="flex justify-between"><span>COHORT REQ:</span><span className="text-paper/80">PASSED</span></div>
          <div className="flex justify-between mt-1 pt-1 border-t border-paper/10"><span>AI VERDICT:</span><span className="text-paper font-semibold">STRONG HIRE</span></div>
        </div>
      </div>

      <div className="absolute top-1/3 right-8 opacity-25">
        <svg width="100" height="40" viewBox="0 0 100 40">
          <rect x="0" y="25" width="8" height="15" fill="currentColor" />
          <rect x="12" y="15" width="8" height="25" fill="currentColor" />
          <rect x="24" y="8" width="8" height="32" fill="currentColor" />
          <rect x="36" y="5" width="8" height="35" fill="currentColor" />
          <rect x="48" y="10" width="8" height="30" fill="currentColor" />
          <rect x="60" y="18" width="8" height="22" fill="currentColor" />
          <rect x="72" y="22" width="8" height="18" fill="currentColor" />
          <rect x="84" y="30" width="8" height="10" fill="currentColor" />
        </svg>
      </div>

      <div className="absolute bottom-6 left-6 w-64 border border-paper/10 bg-paper/[0.01] p-3 rounded">
        <div className="text-paper/40 mb-1 font-mono text-[9px]">LIVE EVALUATION FEED</div>
        <div className="space-y-1 text-paper/45 font-mono text-[8px] leading-tight">
          <div>&gt; RUNNING CHALLENGE #04</div>
          <div className="text-paper/70 font-semibold">&gt; USER_ID_904: SUBMITTED SOLUTION.PY</div>
          <div>&gt; RUNNING 10 TEST CASES...</div>
          <div className="text-paper/70">&gt; ALL TESTS PASSED (104MS)</div>
          <div>&gt; PLAGIARISM CHECK: 0% MATCH</div>
        </div>
      </div>
    </>
  );
}

function MonolithHover() {
  return (
    <>
      <div className="absolute top-6 right-6 w-48 border border-paper/15 bg-paper/[0.02] p-3 rounded backdrop-blur-sm">
        <div className="flex justify-between items-center border-b border-paper/10 pb-1.5 mb-2">
          <span className="font-mono text-[9px]">SURVEILLANCE MESH</span>
          <span className="text-paper/90 font-semibold animate-pulse font-mono text-[9px]">CAMERAS: 60+</span>
        </div>
        <div className="flex justify-around items-center h-12 py-1">
          <div className="relative">
            <div className="w-2.5 h-2.5 rounded-full bg-paper animate-ping absolute -inset-0.5" />
            <div className="w-2.5 h-2.5 rounded-full bg-paper relative" />
            <span className="absolute top-3.5 left-1/2 -translate-x-1/2 text-[6px] text-paper/60 font-mono">CAM-01</span>
          </div>
          <div className="w-6 border-t border-dashed border-paper/20" />
          <div className="relative">
            <div className="w-2 h-2 rounded-full bg-paper/40" />
            <span className="absolute top-3.5 left-1/2 -translate-x-1/2 text-[6px] text-paper/40 font-mono">CAM-02</span>
          </div>
          <div className="w-6 border-t border-dashed border-paper/20" />
          <div className="relative">
            <div className="w-2 h-2 rounded-full bg-paper/40" />
            <span className="absolute top-3.5 left-1/2 -translate-x-1/2 text-[6px] text-paper/40 font-mono">CAM-03</span>
          </div>
        </div>
      </div>

      <div className="absolute top-1/4 left-8 opacity-20">
        <div className="grid grid-cols-5 gap-1.5 w-24 h-24 border border-paper/10 p-1.5">
          <div className="bg-paper/10" />
          <div className="bg-paper/20" />
          <div className="bg-paper/15" />
          <div className="bg-paper/10" />
          <div className="bg-paper/5" />
          <div className="bg-paper/20" />
          <div className="bg-paper/60 animate-pulse" />
          <div className="bg-paper/40" />
          <div className="bg-paper/10" />
          <div className="bg-paper/5" />
          <div className="bg-paper/15" />
          <div className="bg-paper/30" />
          <div className="bg-paper/80 animate-pulse" />
          <div className="bg-paper/30" />
          <div className="bg-paper/10" />
          <div className="bg-paper/5" />
          <div className="bg-paper/10" />
          <div className="bg-paper/20" />
          <div className="bg-paper/15" />
          <div className="bg-paper/5" />
          <div className="bg-paper/5" />
          <div className="bg-paper/5" />
          <div className="bg-paper/10" />
          <div className="bg-paper/5" />
          <div className="bg-paper/5" />
        </div>
        <div className="text-[6px] text-paper/50 mt-1 font-mono">DWELL ZONE HEATMAP (SEC-B)</div>
      </div>

      <div className="absolute bottom-6 left-6 w-60 border border-paper/10 bg-paper/[0.01] p-3 rounded">
        <div className="text-paper/40 mb-1 font-mono text-[9px]">CCTV INTEL LOGS</div>
        <div className="space-y-1 text-paper/45 font-mono text-[8px] leading-tight">
          <div>&gt; INITIALIZING MOVEMENT INTEL...</div>
          <div className="text-paper/70">&gt; CAM-04: ATTENDANCE VERIFIED (148/150)</div>
          <div>&gt; CAM-12: FLOW SPEED OPTIMAL</div>
          <div className="text-paper/70 font-semibold">&gt; CAM-09: ANOMALOUS DWELL TIME AT DOCK 3</div>
        </div>
      </div>
    </>
  );
}

function HailMaryHover() {
  return (
    <>
      <div className="absolute top-6 right-6 w-48 border border-paper/15 bg-paper/[0.02] p-3 rounded backdrop-blur-sm">
        <div className="flex justify-between items-center border-b border-paper/10 pb-1.5 mb-1.5 font-mono text-[9px]">
          <span className="font-semibold text-paper/80 font-mono text-[9px]">RISK INDEX</span>
          <span className="text-paper/95 font-semibold">12% (LOW)</span>
        </div>
        <div className="space-y-1 text-paper/50 font-mono text-[9px]">
          <div className="flex justify-between"><span>ACOUSTICS:</span><span className="text-paper/80">94.2% CONF</span></div>
          <div className="flex justify-between"><span>RADIOLOGY:</span><span className="text-paper/80">91.7% CONF</span></div>
          <div className="flex justify-between"><span>SYMPTOMS:</span><span className="text-paper/80">MATCH FOUND</span></div>
          <div className="flex justify-between mt-1 pt-1 border-t border-paper/10"><span>AI VERDICT:</span><span className="text-paper font-semibold">STABLE / TRIAGED</span></div>
        </div>
      </div>

      <div className="absolute top-1/4 left-10 w-24 h-24 border border-dashed border-paper/20 rounded flex items-center justify-center opacity-30">
        <div className="w-16 h-16 rounded-full border border-paper/10 flex items-center justify-center relative">
          <div className="absolute inset-x-0 h-0.5 bg-paper animate-pulse" />
          <span className="text-[6px] text-paper/60 uppercase font-mono">SCANNING ROI</span>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 w-64 border border-paper/10 bg-paper/[0.01] p-3 rounded">
        <div className="text-paper/40 mb-1 font-mono text-[9px]">HEALTHCARE PIPELINE</div>
        <div className="space-y-1 text-paper/45 font-mono text-[8px] leading-tight">
          <div>&gt; INPUT: AUDIO_COUGH_RECORDING.WAV</div>
          <div className="text-paper/70">&gt; EXTRACTING ACOUSTIC SPECTROGRAM... DONE</div>
          <div>&gt; ALIGNING ChestRadiograph DICOM METADATA</div>
          <div className="text-paper/70 font-semibold">&gt; MULTIMODAL MODEL RUNNING... (94.2% ACC)</div>
        </div>
      </div>
    </>
  );
}

function UnitiveHover() {
  return (
    <>
      <div className="absolute top-6 right-6 w-52 border border-paper/15 bg-paper/[0.02] p-3 rounded backdrop-blur-sm font-mono text-[9px]">
        <div className="flex justify-between items-center border-b border-paper/10 pb-1.5 mb-1.5">
          <span className="font-semibold text-paper/80 font-mono text-[9px]">FORM PROCESSING</span>
          <span className="text-paper/95 font-semibold">80% REDUCTION</span>
        </div>
        <div className="space-y-1 text-paper/50">
          <div className="flex justify-between"><span>DOC TYPE:</span><span className="text-paper/80">INVOICE_V3</span></div>
          <div className="flex justify-between"><span>EXTRACTION:</span><span className="text-paper/80">99.8% ACC</span></div>
          <div className="flex justify-between"><span>ERP SYNC:</span><span className="text-paper/80">SUCCESS (200)</span></div>
          <div className="flex justify-between mt-1 pt-1 border-t border-paper/10"><span>STAGED FILES:</span><span className="text-paper font-semibold">8,402 READY</span></div>
        </div>
      </div>

      <div className="absolute top-1/3 left-8 w-48 opacity-20">
        <div className="flex items-center gap-1 text-[7px] text-paper/70 font-semibold font-mono">
          <div className="border border-paper/30 px-1.5 py-0.5 rounded bg-paper/5">[PDF IN]</div>
          <div>→</div>
          <div className="border border-paper/30 px-1.5 py-0.5 rounded bg-paper/10 animate-pulse">[AI OCR]</div>
          <div>→</div>
          <div className="border border-paper/30 px-1.5 py-0.5 rounded bg-paper/5">[ERP SYNC]</div>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 w-60 border border-paper/10 bg-paper/[0.01] p-3 rounded font-mono text-[9px]">
        <div className="text-paper/40 mb-1">AUTOMATION PIPELINE LOGS</div>
        <div className="space-y-1 text-paper/45 font-mono text-[8px] leading-tight">
          <div>&gt; POLLING INCOMING DIRECTORIES...</div>
          <div className="text-paper/70">&gt; OCR ENGINE: EXTRACTED 12 FIELDS FROM FORM_C</div>
          <div>&gt; SCHEMA ALIGNED TO ERP SYSTEM v4</div>
          <div className="text-paper/70 font-semibold">&gt; RECORD CREATED: ID_982103 (80% REDUCTION TIME)</div>
        </div>
      </div>
    </>
  );
}

function HoverVisualization({ title, isHovered, coords }) {
  if (!isHovered) return null;

  const style = {
    transform: `translate(${coords.x * 12}px, ${coords.y * 12}px)`,
    transition: 'transform 0.1s ease-out',
  };

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-ink">
      {/* Background blueprint/schematic grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      
      {/* Visual content based on project title */}
      <div style={style} className="relative w-full h-full p-8 md:p-12 text-paper/30 font-mono uppercase tracking-wider">
        {title === 'FARCRY' && <FarCryHover />}
        {title === 'MONOLITH' && <MonolithHover />}
        {title === 'HAILMARY' && <HailMaryHover />}
        {title === 'UNITIVE' && <UnitiveHover />}
      </div>
    </div>
  );
}

const categories = ['ALL', 'WEB APPLICATIONS', 'ENTERPRISE SOFTWARE', 'MANAGEMENT PLATFORMS', 'AI SOLUTIONS'];

const projects = [
  {
    title: 'FARCRY',
    subtitle: 'Placement Operating System',
    category: 'MANAGEMENT PLATFORMS',
    description: 'A comprehensive assessment and placement intelligence platform enabling educational institutions to conduct coding evaluations, aptitude assessments, real-time challenges, automated grading, integrity monitoring, and AI-powered student performance analysis within a unified ecosystem.',
    tech: ['Next.js', 'Python', 'WebSockets', 'PostgreSQL', 'Docker'],
    year: '2026',
    status: 'LIVE',
    overview:
      'FARCRY is a comprehensive assessment and placement intelligence platform built for modern educational institutions. It unifies coding evaluations, aptitude assessments, and real-time challenges under a single automated ecosystem, replacing fragmented testing tools and manual grading processes.',
    challenge: 'Institutions struggled with disconnected systems for student evaluations, manual grading bottlenecks, and lack of secure remote proctoring. They needed an integrated environment capable of scaling to thousands of simultaneous sessions while maintaining absolute integrity.',
    outcome: 'AI-powered assessment platform with automated evaluation and integrity monitoring.',
    highlights: [
      'AI-generated student intelligence reports',
      'Real-time proctoring and integrity monitoring',
      'Automated coding evaluation engine',
      'Faculty analytics and cohort performance insights',
      'Enterprise deployment readiness and secure SSO integration',
    ],
    featuredMetric: { value: '10x', label: 'Faster Assessment Administration' },
    metrics: [
      { icon: Zap, value: '10x', label: 'Faster Assessment Administration', color: 'text-ink' },
      { icon: Clock, value: '< 2 min', label: 'Grade Generation Time', color: 'text-ink' },
      { icon: Users, value: '25k+', label: 'Active Students Evaluated', color: 'text-ink' },
      { icon: TrendingUp, value: '99.8%', label: 'Integrity Verification', color: 'text-ink' },
    ],
  },
  {
    title: 'MONOLITH',
    subtitle: 'Enterprise Intelligence Platform',
    category: 'ENTERPRISE SOFTWARE',
    description: 'An advanced computer vision and operational analytics platform that transforms existing CCTV infrastructure into actionable business intelligence through employee tracking, movement analysis, attendance verification, behavioral insights, and automated reporting systems.',
    tech: ['React', 'Python', 'PyTorch', 'OpenCV', 'FastAPI', 'Redis'],
    year: '2026',
    status: 'LIVE',
    overview:
      'MONOLITH is an advanced computer vision and operational analytics platform designed to transform existing enterprise CCTV infrastructure into actionable business intelligence. It provides real-time insights into employee movements, behavioral trends, and operational efficiency without requiring new hardware.',
    challenge: 'Enterprise facilities operated hundreds of camera networks without extracting analytical value. Manual tracking of employee presence, dwell-times, and area occupancy was labor-intensive and prone to human error.',
    outcome: 'Converts existing surveillance infrastructure into actionable business intelligence.',
    highlights: [
      'Employee movement intelligence',
      'Automated attendance verification',
      'Dwell-time and operational analytics',
      'Centralized enterprise reporting',
      'Sub-second latency edge processing pipelines',
    ],
    featuredMetric: { value: '60+', label: 'Camera Infrastructure Supported' },
    metrics: [
      { icon: Users, value: '60+', label: 'Camera Infrastructure Supported', color: 'text-ink' },
      { icon: Clock, value: 'Real-time', label: 'Tracking & Analytics', color: 'text-ink' },
      { icon: Zap, value: '99.4%', label: 'Verification Accuracy', color: 'text-ink' },
      { icon: TrendingUp, value: '12 hrs/wk', label: 'Manual Work Eliminated', color: 'text-ink' },
    ],
  },
  {
    title: 'HAILMARY',
    subtitle: 'AI-Powered Tuberculosis Screening Platform',
    category: 'AI SOLUTIONS',
    description: 'A multimodal healthcare intelligence platform combining cough acoustics, chest radiography, and clinical symptom analysis to assist healthcare professionals in identifying tuberculosis risk through advanced machine learning models and automated screening workflows.',
    tech: ['PyTorch', 'FastAPI', 'React', 'Tailwind', 'MongoDB'],
    year: '2026',
    status: 'PILOT DEPLOYMENT',
    overview:
      'HAILMARY is a multimodal healthcare intelligence platform designed to assist healthcare professionals in identifying tuberculosis risk. By combining chest radiography, cough acoustics, and clinical symptom analysis into a unified machine learning model, it accelerates early-stage screening.',
    challenge: 'Early detection of tuberculosis remains difficult in resource-constrained environments. Clinicians need quick, low-cost screening support that synthesizes radiological scans, clinical indicators, and physical symptoms.',
    outcome: 'Evaluated on 25 real patient cases in a hospital pilot environment.',
    highlights: [
      'Evaluated using 25 real patient cases',
      'Multimodal AI prediction architecture',
      'Automated risk assessment workflows',
      'Healthcare notification system',
      'Rigorous medical bias auditing and validation',
    ],
    featuredMetric: { value: '25', label: 'Real Patient Cases Evaluated' },
    metrics: [
      { icon: Users, value: '25', label: 'Real Patient Cases Evaluated', color: 'text-ink' },
      { icon: Zap, value: '94.2%', label: 'Sensitivity Achieved', color: 'text-ink' },
      { icon: TrendingUp, value: '91.7%', label: 'Specificity Rate', color: 'text-ink' },
      { icon: Clock, value: '< 3 sec', label: 'Screening Time', color: 'text-ink' },
    ],
  },
  {
    title: 'UNITIVE',
    subtitle: 'Enterprise Workflow Automation',
    category: 'ENTERPRISE SOFTWARE',
    description: 'A workflow automation platform designed to integrate with ERP environments and eliminate repetitive administrative operations through intelligent form processing, structured data extraction, workflow orchestration, and enterprise-grade automation pipelines.',
    tech: ['Next.js', 'Node.js', 'PostgreSQL', 'Python', 'FastAPI'],
    year: '2026',
    status: 'LIVE',
    overview:
      'UNITIVE is an enterprise workflow automation platform designed to integrate seamlessly with ERP environments. It eliminates repetitive administrative data-entry tasks by leveraging intelligent document processing, structured data extraction, and dynamic workflow pipelines.',
    challenge: 'Back-office teams spent thousands of manual hours copying data from invoices, forms, and PDFs into ERP systems. Delays led to slow operational processing and high error rates.',
    outcome: 'Automates document-driven workflows and enterprise data operations.',
    highlights: [
      'ERP integration architecture',
      'Automated form intelligence',
      'Workflow orchestration engine',
      'Enterprise deployment readiness',
      'Structured data extraction sequences',
    ],
    featuredMetric: { value: '80%', label: 'Reduction In Manual Processing' },
    metrics: [
      { icon: Zap, value: '80%', label: 'Reduction In Manual Processing', color: 'text-ink' },
      { icon: Users, value: '14 sites', label: 'ERP Environments Connected', color: 'text-ink' },
      { icon: Clock, value: '5.2x', label: 'Processing Speedup', color: 'text-ink' },
      { icon: TrendingUp, value: '99.9%', label: 'Extraction Accuracy', color: 'text-ink' },
    ],
  },
];

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selected, setSelected] = useState(null);
  const [isHovered, setIsHovered] = useState(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const filtered =
    activeCategory === 'ALL' ? projects : projects.filter((p) => p.category === activeCategory);

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setSelected(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCoords({ x, y });
  };

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
              text="Systems transformed into realities."
              className="font-display text-5xl font-medium leading-[1.05] text-ink md:text-7xl"
            />
            <Reveal delay={0.2} className="mt-6">
              <p className="text-lg text-ash">
                Every project below represents a real engineering challenge solved through software, artificial intelligence, automation, and systems thinking. Click any project to explore the full case study.
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
                onMouseEnter={() => setIsHovered(project.title)}
                onMouseLeave={() => {
                  setIsHovered(null);
                  setCoords({ x: 0, y: 0 });
                }}
                onMouseMove={handleMouseMove}
                className="group relative cursor-pointer overflow-hidden bg-paper p-8 transition-colors duration-500 hover:bg-ink md:p-12 min-h-[500px]"
              >
                {/* Parallax Hover Visualization Background */}
                <HoverVisualization title={project.title} isHovered={isHovered === project.title} coords={coords} />

                {/* Foreground content container */}
                <div className="relative z-10 flex flex-col justify-between h-full w-full">
                  <div>
                    {/* Top Row */}
                    <div className="mb-12 flex items-start justify-between">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs uppercase tracking-[0.2em] text-smoke transition-colors group-hover:text-paper/50 font-mono">
                          {project.category}
                        </span>
                        <span className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-wider transition-colors ${
                          project.status === 'LIVE'
                            ? 'border-ink/20 text-ink group-hover:border-paper/30 group-hover:text-paper/70'
                            : 'border-smoke/40 text-smoke group-hover:border-paper/20 group-hover:text-paper/40'
                        }`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${project.status === 'LIVE' ? 'bg-ink group-hover:bg-paper animate-blink' : 'bg-smoke'}`} />
                          {project.status}
                        </span>
                      </div>
                      <span className="font-display text-lg italic text-smoke transition-colors group-hover:text-paper/50">
                        {project.year}
                      </span>
                    </div>

                    {/* Project Title and Subtitle */}
                    <h3 className="font-display text-4xl font-medium text-ink transition-colors duration-500 group-hover:text-paper md:text-5xl lg:text-6xl">
                      {project.title}
                    </h3>
                    {project.subtitle && (
                      <p className="mt-2 font-display text-lg italic text-ash transition-colors duration-500 group-hover:text-paper/80">
                        {project.subtitle}
                      </p>
                    )}

                    {/* Description */}
                    <p className="mt-6 max-w-md leading-relaxed text-ash transition-colors duration-500 group-hover:text-paper/70">
                      {project.description}
                    </p>

                    {/* Key outcome teaser */}
                    <p className="mt-4 text-sm font-medium text-ink/60 transition-colors duration-500 group-hover:text-paper/50 line-clamp-1 font-mono">
                      → {project.outcome.split('.')[0]}.
                    </p>

                    {/* Animated Metric Counter */}
                    {project.featuredMetric && (
                      <div className="mt-6 flex items-baseline gap-2 border-t border-line/50 pt-4 transition-colors duration-500 group-hover:border-paper/10">
                        <span className="font-display text-3xl font-medium text-ink transition-colors duration-500 group-hover:text-paper">
                          <AnimatedCounter value={project.featuredMetric.value} isHovered={isHovered === project.title} />
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.15em] text-smoke transition-colors duration-500 group-hover:text-paper/60 font-mono">
                          {project.featuredMetric.label}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Tech stack footer */}
                  <div className="mt-10 flex items-end justify-between">
                    <div className="flex flex-wrap gap-2 max-w-[80%]">
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
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
          />

          <motion.div
            key="modal-content"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-h-[92vh] w-full overflow-y-auto border border-line bg-paper md:max-w-3xl"
          >
            {/* Sticky header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-paper/90 px-6 py-4 backdrop-blur-md md:px-10">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-[0.2em] text-smoke font-mono">
                  {project.category} — {project.year}
                </span>
                <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-wider ${
                  project.status === 'LIVE' ? 'border-ink/20 text-ink' : 'border-smoke/40 text-smoke'
                }`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${project.status === 'LIVE' ? 'bg-ink animate-blink' : 'bg-smoke'}`} />
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
              {project.subtitle && (
                <p className="mt-2 font-display text-2xl italic text-ash">
                  {project.subtitle}
                </p>
              )}

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
                  <p className="text-base leading-relaxed text-ink font-medium">→ {project.outcome}</p>
                </div>
              </div>

              {/* Metrics */}
              <div className="mt-10 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
                {project.metrics.map((m) => (
                  <div key={m.label} className="bg-paper p-5 text-center flex flex-col justify-between">
                    <m.icon className="mx-auto mb-2 h-4 w-4 text-smoke" />
                    <p className="font-display text-2xl font-medium text-ink md:text-3xl">
                      {m.value}
                    </p>
                    <p className="mt-1 text-[9px] uppercase tracking-[0.12em] text-smoke font-mono">
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
                      <span className="text-lg text-ink font-sans">{h}</span>
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
                      className="rounded-full border border-ink px-4 py-1.5 text-xs uppercase tracking-wider text-ink font-mono"
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
