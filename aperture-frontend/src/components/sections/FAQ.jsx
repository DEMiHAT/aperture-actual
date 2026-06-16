'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Reveal, AnimatedHeading } from '@/components/ui/Motion';

const faqs = [
  {
    question: 'What is your typical project timeline?',
    answer: 'Our timelines vary based on project complexity. A standard enterprise web application typically takes 3-6 months from discovery to deployment. We also offer accelerated timelines for urgent MVP launches.',
  },
  {
    question: 'Do you provide ongoing maintenance and support?',
    answer: 'Yes, we offer comprehensive continuous support packages. This includes performance monitoring, security updates, feature enhancements, and scalable infrastructure management.',
  },
  {
    question: 'What technology stack do you specialize in?',
    answer: 'We specialize in modern, scalable technologies including React, Next.js for frontend, Node.js, Python, and Java for backend, along with cloud infrastructure on AWS, Azure, and Google Cloud.',
  },
  {
    question: 'How do you handle project pricing?',
    answer: 'We offer both fixed-price contracts for well-defined projects and time-and-materials engagement models for dynamic, long-term product development.',
  },
  {
    question: 'Do you work with startups or only large enterprises?',
    answer: 'While we specialize in enterprise platforms, we frequently partner with well-funded startups and scale-ups to build robust, scalable MVPs that can support rapid user growth.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative border-t border-line bg-paper py-28 md:py-40">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* Left */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <span className="eyebrow">(07) — Knowledge Base</span>
              </Reveal>
              <AnimatedHeading
                as="h2"
                text="Frequently asked questions."
                className="mt-6 font-display text-5xl font-medium leading-[1.05] text-ink md:text-6xl"
              />
              <Reveal delay={0.2} className="mt-8">
                <a
                  href="#contact"
                  className="link-wipe hover:bg-[length:100%_1px] text-lg text-ink"
                >
                  Still have questions? Contact us →
                </a>
              </Reveal>
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-8">
            <div className="border-t border-line">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <Reveal key={index} delay={index * 0.05}>
                    <div className="border-b border-line">
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                        className="flex w-full items-center justify-between gap-6 py-8 text-left"
                      >
                        <h3 className="font-display text-2xl font-medium text-ink md:text-3xl">
                          {faq.question}
                        </h3>
                        <span
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink transition-all duration-500 ${
                            isOpen ? 'rotate-[135deg] bg-ink text-paper' : 'text-ink'
                          }`}
                        >
                          <Plus className="h-4 w-4" />
                        </span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="max-w-xl pb-8 text-lg leading-relaxed text-ash">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
