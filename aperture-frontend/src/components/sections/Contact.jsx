'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';
import { Reveal, AnimatedHeading } from '@/components/ui/Motion';

const contactInfo = [
  { icon: MapPin, label: 'Office', value: 'Chennai, Tamil Nadu, India' },
  { icon: Phone, label: 'Phone', value: '+91 9003472654' },
  { icon: Mail, label: 'Email', value: 'apperture.websites@gmail.com' },
];

export function Contact() {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const field =
    'w-full border-b border-paper/25 bg-transparent py-3 text-lg text-paper caret-paper placeholder-paper/40 transition-colors focus:border-paper focus:outline-none [color-scheme:dark]';
  const label = 'text-[10px] uppercase tracking-[0.2em] text-paper/50';

  return (
    <section id="contact" className="relative overflow-hidden border-t border-line bg-ink py-28 md:py-40">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-20">
          <Reveal>
            <span className="text-[0.7rem] uppercase tracking-[0.28em] text-paper/50">
              (08) — Get in Touch
            </span>
          </Reveal>
          <AnimatedHeading
            as="h2"
            text="Let's build something extraordinary."
            className="mt-6 font-display text-6xl font-medium leading-[0.98] text-paper md:text-[7vw]"
          />
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* Info */}
          <div className="lg:col-span-4">
            <div className="space-y-10">
              {contactInfo.map((info, i) => (
                <Reveal key={info.label} delay={i * 0.1}>
                  <div className="border-b border-paper/15 pb-6">
                    <div className="mb-2 flex items-center gap-3">
                      <info.icon className="h-4 w-4 text-paper/50" />
                      <span className="text-[10px] uppercase tracking-[0.2em] text-paper/50">
                        {info.label}
                      </span>
                    </div>
                    <p className="text-xl text-paper">{info.value}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-8">
            <Reveal delay={0.15}>
              <form className="space-y-10">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className={label}>Full Name</label>
                    <input type="text" className={field} placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className={label}>Email Address</label>
                    <input type="email" className={field} placeholder="john@company.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className={label}>Project Type</label>
                    <select className={field}>
                      <option className="bg-ink text-paper">Web Application</option>
                      <option className="bg-ink text-paper">Mobile App</option>
                      <option className="bg-ink text-paper">Enterprise Software</option>
                      <option className="bg-ink text-paper">AI Integration</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className={label}>Budget Range</label>
                    <select className={field}>
                      <option className="bg-ink text-paper">$10k - $25k</option>
                      <option className="bg-ink text-paper">$25k - $50k</option>
                      <option className="bg-ink text-paper">$50k - $100k</option>
                      <option className="bg-ink text-paper">$100k+</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={label}>Project Details</label>
                  <textarea
                    rows="3"
                    className={field + ' resize-none'}
                    placeholder="Tell us about your requirements, goals, and timeline..."
                  />
                </div>

                {/* Upload */}
                <div
                  className={`flex flex-col items-center justify-center border border-dashed py-10 transition-colors ${
                    dragActive ? 'border-paper bg-paper/5' : 'border-paper/25'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <p className="text-center text-sm text-paper/60">
                    <span className="text-paper underline">Click to upload</span> or drag and drop
                    <br />
                    <span className="text-xs text-paper/40">PDF, DOCX, ZIP or Images (max 10MB)</span>
                  </p>
                </div>

                <button
                  type="submit"
                  className="group flex w-full items-center justify-between rounded-full bg-paper px-8 py-5 text-ink transition-colors"
                >
                  <span className="text-sm font-medium uppercase tracking-[0.12em]">
                    Submit Request
                  </span>
                  <ArrowUpRight className="h-6 w-6 transition-transform duration-500 group-hover:rotate-45" />
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
