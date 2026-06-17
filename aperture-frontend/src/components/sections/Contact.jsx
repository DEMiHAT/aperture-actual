'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, ArrowUpRight, MessageCircle } from 'lucide-react';
import { Reveal, AnimatedHeading } from '@/components/ui/Motion';
import { site } from '@/lib/site';

const contactInfo = [
  { icon: MapPin, label: 'Office', value: site.location },
  { icon: Phone, label: 'Phone', value: site.phone.display },
  { icon: Mail, label: 'General', value: site.email.general },
  { icon: Mail, label: 'Projects', value: site.email.projects },
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
            <div className="space-y-8">
              {contactInfo.map((info, i) => (
                <Reveal key={info.label + info.value} delay={i * 0.1}>
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

              {/* WhatsApp */}
              <Reveal delay={0.4}>
                <a
                  href={site.phone.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 border border-paper/20 px-5 py-4 transition-colors hover:border-paper hover:bg-paper/5"
                >
                  <MessageCircle className="h-5 w-5 text-paper/60 transition-colors group-hover:text-paper" />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-paper/50">WhatsApp Business</p>
                    <p className="text-paper">Chat with us directly</p>
                  </div>
                  <ArrowUpRight className="ml-auto h-4 w-4 text-paper/40 transition-transform group-hover:rotate-45 group-hover:text-paper" />
                </a>
              </Reveal>

              {/* LinkedIn */}
              <Reveal delay={0.5}>
                <a
                  href={site.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 border border-paper/20 px-5 py-4 transition-colors hover:border-paper hover:bg-paper/5"
                >
                  <svg className="h-5 w-5 text-paper/60 transition-colors group-hover:text-paper" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-paper/50">LinkedIn</p>
                    <p className="text-paper">{site.name}</p>
                  </div>
                  <ArrowUpRight className="ml-auto h-4 w-4 text-paper/40 transition-transform group-hover:rotate-45 group-hover:text-paper" />
                </a>
              </Reveal>
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
                    <label className={label}>Company / Organisation</label>
                    <input type="text" className={field} placeholder="Acme Inc." />
                  </div>
                  <div className="space-y-2">
                    <label className={label}>Project Type</label>
                    <select className={field}>
                      <option className="bg-ink text-paper">Web Application</option>
                      <option className="bg-ink text-paper">Mobile App</option>
                      <option className="bg-ink text-paper">Enterprise Software</option>
                      <option className="bg-ink text-paper">AI Integration</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className={label}>Expected Timeline</label>
                    <select className={field}>
                      <option className="bg-ink text-paper">As soon as possible</option>
                      <option className="bg-ink text-paper">1–3 months</option>
                      <option className="bg-ink text-paper">3–6 months</option>
                      <option className="bg-ink text-paper">Just exploring</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className={label}>Budget Range</label>
                    <select className={field}>
                      <option className="bg-ink text-paper">Not sure yet</option>
                      <option className="bg-ink text-paper">Under ₹1 lakh</option>
                      <option className="bg-ink text-paper">₹1–5 lakh</option>
                      <option className="bg-ink text-paper">₹5 lakh+</option>
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
