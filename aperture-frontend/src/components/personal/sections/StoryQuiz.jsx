'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, RotateCcw, Sparkles } from 'lucide-react';
import { Reveal, AnimatedHeading } from '@/components/ui/Motion';
import { MomentsButton } from '@/components/moments/MomentsButton';
import { useConsultation } from '../ConsultationProvider';
import { quizQuestions, quizResults } from '../data';

const EASE = [0.16, 1, 0.3, 1];

function tierFor(total) {
  const max = quizQuestions.length * 3;
  const ratio = total / max;
  if (ratio <= 0.33) return quizResults.Essential;
  if (ratio <= 0.7) return quizResults.Professional;
  return quizResults.Signature;
}

/**
 * StoryQuiz — "Build My Story": a few questions that recommend the right
 * package. No data stored — purely client-side guidance.
 */
export function StoryQuiz() {
  const { open: openConsultation } = useConsultation();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);

  const isResult = step >= quizQuestions.length;
  const total = answers.reduce((a, b) => a + b, 0);
  const result = isResult ? tierFor(total) : null;
  const progress = Math.min(step, quizQuestions.length) / quizQuestions.length;

  const choose = (weight) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[step] = weight;
      return next;
    });
    setStep((s) => s + 1);
  };

  const back = () => setStep((s) => Math.max(0, s - 1));
  const restart = () => {
    setStep(0);
    setAnswers([]);
  };

  return (
    <section className="relative px-6 py-24 md:px-12 md:py-32">
      <div className="container mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <Reveal>
            <span className="eyebrow text-cocoa-soft">Build My Story</span>
          </Reveal>
          <AnimatedHeading
            as="h2"
            text="Not sure where to start?"
            className="mt-5 font-display text-4xl font-medium leading-[1.05] text-cocoa md:text-6xl"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="overflow-hidden rounded-2xl liquid-glass p-7 md:p-10"
        >
          {/* progress */}
          <div className="mb-7 h-1 w-full overflow-hidden rounded-full bg-white/50">
            <motion.div
              animate={{ width: `${(isResult ? 1 : progress) * 100}%` }}
              transition={{ duration: 0.4, ease: EASE }}
              className="h-full rounded-full bg-gradient-to-r from-gold to-sunset"
            />
          </div>

          <AnimatePresence mode="wait">
            {!isResult ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <span className="text-[11px] uppercase tracking-[0.18em] text-gold">
                  Question {step + 1} / {quizQuestions.length}
                </span>
                <h3 className="mt-2 font-display text-3xl font-medium text-cocoa md:text-4xl">
                  {quizQuestions[step].q}
                </h3>
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {quizQuestions[step].options.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => choose(opt.weight)}
                      className="group rounded-xl border border-white/60 bg-white/50 p-5 text-left transition-all hover:-translate-y-0.5 hover:border-gold/50 hover:bg-white/70"
                    >
                      <span className="font-medium text-cocoa">{opt.label}</span>
                    </button>
                  ))}
                </div>
                {step > 0 && (
                  <button
                    onClick={back}
                    className="mt-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-cocoa-soft hover:text-cocoa"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="text-center"
              >
                <span className="inline-flex items-center gap-2 rounded-full bg-gold/15 px-4 py-1.5 text-[11px] uppercase tracking-[0.18em] text-gold">
                  <Sparkles className="h-3.5 w-3.5" /> Your match
                </span>
                <h3 className="mt-5 font-display text-5xl font-medium text-warm-gradient md:text-6xl">
                  {result.name}
                </h3>
                <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-cocoa-soft">
                  {result.line}
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <MomentsButton variant="primary" onClick={openConsultation}>
                    Start with {result.name}
                  </MomentsButton>
                  <button
                    onClick={restart}
                    className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.14em] text-cocoa-soft hover:text-cocoa"
                  >
                    <RotateCcw className="h-4 w-4" /> Retake
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
