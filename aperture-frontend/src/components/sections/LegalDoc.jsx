import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export function LegalDoc({ title, sections }) {
  return (
    <section className="relative border-t border-line bg-paper pt-36 pb-28 md:pt-44 md:pb-40">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="group mb-10 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-smoke transition-colors hover:text-ink"
          >
            <ArrowUpRight className="h-4 w-4 -rotate-[135deg] transition-transform group-hover:-translate-x-0.5" />
            Back to home
          </Link>

          <span className="eyebrow">Legal</span>
          <h1 className="mt-4 font-display text-5xl font-medium leading-[1.05] text-ink md:text-7xl">
            {title}
          </h1>

          <div className="mt-12 space-y-12 border-t border-line pt-12">
            {sections.map((s) => (
              <div key={s.heading}>
                <h2 className="font-display text-2xl font-medium text-ink md:text-3xl">
                  {s.heading}
                </h2>
                <div className="mt-4 space-y-4">
                  {s.body.map((p, i) => (
                    <p key={i} className="leading-relaxed text-ash">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
