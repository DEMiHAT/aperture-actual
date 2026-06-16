'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Marquee, Reveal } from '@/components/ui/Motion';

const footerLinks = {
  services: [
    { name: 'Custom Software', href: '#services' },
    { name: 'Web Applications', href: '#services' },
    { name: 'AI Solutions', href: '#services' },
    { name: 'Cloud Infrastructure', href: '#services' },
  ],
  company: [
    { name: 'About Us', href: '#about' },
    { name: 'Our Work', href: '#work' },
    { name: "Founder's Note", href: '#team' },
    { name: 'Contact', href: '#contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
  ],
};

const socials = ['Github', 'LinkedIn', 'Twitter', 'Instagram'];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-paper pt-24">
      {/* Giant marquee wordmark */}
      <Marquee className="border-b border-line py-6" slow>
        {[0, 1, 2].map((n) => (
          <span
            key={n}
            className="font-display text-[10vw] font-medium leading-none tracking-tight text-ink whitespace-nowrap px-8"
          >
            Let&rsquo;s Build —
          </span>
        ))}
      </Marquee>

      <div className="container mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {/* Brand */}
          <Reveal className="lg:col-span-2">
            <Link href="/" className="mb-6 flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-ink">
                <span className="h-2 w-2 rounded-full bg-ink" />
              </span>
              <span className="font-display text-2xl font-medium text-ink">Aperture</span>
            </Link>
            <p className="mb-8 max-w-sm text-sm leading-relaxed text-ash">
              Engineering intelligent digital experiences. We design scalable software
              products and enterprise platforms that help businesses innovate and grow.
            </p>
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-ink text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
                  aria-label={s}
                >
                  <span className="text-[10px] font-bold uppercase">{s.slice(0, 2)}</span>
                </a>
              ))}
            </div>
          </Reveal>

          {/* Services */}
          <Reveal delay={0.05}>
            <h4 className="eyebrow mb-6">Services</h4>
            <ul className="space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="link-wipe hover:bg-[length:100%_1px] text-sm text-ash transition-colors hover:text-ink"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Company */}
          <Reveal delay={0.1}>
            <h4 className="eyebrow mb-6">Company</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="link-wipe hover:bg-[length:100%_1px] text-sm text-ash transition-colors hover:text-ink"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Newsletter */}
          <Reveal delay={0.15}>
            <h4 className="eyebrow mb-6">Stay Updated</h4>
            <p className="mb-4 text-sm leading-relaxed text-ash">
              Subscribe for the latest engineering insights.
            </p>
            <form className="flex items-center gap-2 border-b border-ink pb-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-transparent text-sm text-ink placeholder-smoke focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="text-ink transition-transform hover:translate-x-1"
              >
                <ArrowUpRight className="h-5 w-5" />
              </button>
            </form>
          </Reveal>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 md:flex-row">
          <p className="text-xs uppercase tracking-[0.2em] text-smoke">
            © {new Date().getFullYear()} Aperture Technologies
          </p>
          <div className="flex gap-8">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs uppercase tracking-[0.2em] text-smoke transition-colors hover:text-ink"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
