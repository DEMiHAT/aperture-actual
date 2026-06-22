'use client';

import React, { useState } from 'react';
import { ArrowUpRight, Check, Loader2 } from 'lucide-react';
import { Reveal } from '@/components/ui/Motion';
import { useNotify } from './useNotify';

const EMPTY = {
  name: '',
  email: '',
  phone: '',
  company: '',
  preferredDate: '',
  preferredTime: '',
  message: '',
};

/**
 * StrategyCallForm — monochrome booking form. Posts to /api/notify
 * (type: strategy-call) which emails aperture.websites@gmail.com.
 */
export function StrategyCallForm() {
  const [values, setValues] = useState(EMPTY);
  const [honeypot, setHoneypot] = useState('');
  const { submit, status, error } = useNotify('strategy-call');

  const onChange = (e) =>
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    const ok = await submit(values, { company_website: honeypot });
    if (ok) setValues(EMPTY);
  };

  const field =
    'w-full border-b border-ink/20 bg-transparent py-3 text-base text-ink caret-ink placeholder-smoke transition-colors focus:border-ink focus:outline-none';
  const label = 'text-[10px] uppercase tracking-[0.2em] text-smoke';

  if (status === 'success') {
    return (
      <Reveal>
        <div className="flex flex-col items-center justify-center border border-line bg-paper px-6 py-20 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-paper">
            <Check className="h-6 w-6" />
          </span>
          <h3 className="font-display mt-6 text-3xl font-medium text-ink">Request received.</h3>
          <p className="mt-3 max-w-md text-ash">
            Thank you — we&rsquo;ve got your details and one of our founding engineers will reach
            out shortly to lock in a time.
          </p>
        </div>
      </Reveal>
    );
  }

  return (
    <Reveal>
      <form onSubmit={onSubmit} className="border border-line bg-paper p-6 md:p-10">
        {/* Honeypot (hidden from humans) */}
        <input
          type="text"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          className="hidden"
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-2">
            <label className={label}>Full Name *</label>
            <input required name="name" value={values.name} onChange={onChange} className={field} placeholder="John Doe" />
          </div>
          <div className="space-y-2">
            <label className={label}>Email Address *</label>
            <input required type="email" name="email" value={values.email} onChange={onChange} className={field} placeholder="john@company.com" />
          </div>
          <div className="space-y-2">
            <label className={label}>Phone</label>
            <input name="phone" value={values.phone} onChange={onChange} className={field} placeholder="+91 90000 00000" />
          </div>
          <div className="space-y-2">
            <label className={label}>Company / Organisation</label>
            <input name="company" value={values.company} onChange={onChange} className={field} placeholder="Acme Inc." />
          </div>
          <div className="space-y-2">
            <label className={label}>Preferred Date</label>
            <input type="date" name="preferredDate" value={values.preferredDate} onChange={onChange} className={field} />
          </div>
          <div className="space-y-2">
            <label className={label}>Preferred Time</label>
            <input type="time" name="preferredTime" value={values.preferredTime} onChange={onChange} className={field} />
          </div>
        </div>

        <div className="mt-8 space-y-2">
          <label className={label}>What would you like to discuss?</label>
          <textarea
            rows="3"
            name="message"
            value={values.message}
            onChange={onChange}
            className={field + ' resize-none'}
            placeholder="A short note about your project, goals, and timeline..."
          />
        </div>

        {status === 'error' && (
          <p className="mt-6 border border-ink/30 bg-mist px-4 py-3 text-sm text-ink">{error}</p>
        )}

        <button
          type="submit"
          disabled={status === 'sending'}
          className="group mt-8 flex w-full items-center justify-between rounded-full bg-ink px-8 py-5 text-paper transition-opacity disabled:opacity-60"
        >
          <span className="text-sm font-medium uppercase tracking-[0.12em]">
            {status === 'sending' ? 'Sending…' : 'Book my strategy call'}
          </span>
          {status === 'sending' ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            <ArrowUpRight className="h-6 w-6 transition-transform duration-500 group-hover:rotate-45" />
          )}
        </button>
      </form>
    </Reveal>
  );
}
