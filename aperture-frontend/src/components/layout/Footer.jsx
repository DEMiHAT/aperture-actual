'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Marquee, Reveal } from '@/components/ui/Motion';
import { site } from '@/lib/site';

const socials = [
  {
    name: 'GitHub',
    href: site.social.github,
    label: `${site.name} on GitHub`,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: site.social.linkedin,
    label: `${site.name} on LinkedIn`,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

const footerLinks = {
  services: [
    { name: 'Custom Software', href: '#services' },
    { name: 'Web Applications', href: '#services' },
    { name: 'AI Solutions', href: '#services' },
    { name: 'Cloud Infrastructure', href: '#services' },
  ],
  company: [
    { name: 'About Us', href: '#about' },
    { name: 'Industries', href: '/industries' },
    { name: 'Our Work', href: '#work' },
    { name: 'Book a Call', href: '#book' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
};

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
              <span className="font-display text-2xl font-medium text-ink">{site.shortName}</span>
            </Link>
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-ash">
              Engineering intelligent digital experiences. We design scalable software
              products and enterprise platforms that help businesses innovate and grow.
            </p>
            <p className="mb-6 text-xs text-smoke">
              <a href={`mailto:${site.email.general}`} className="transition-colors hover:text-ink">
                {site.email.general}
              </a>
              {' · '}
              <a href={`mailto:${site.email.projects}`} className="transition-colors hover:text-ink">
                {site.email.projects}
              </a>
            </p>
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-ink text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
                  aria-label={s.label}
                >
                  {s.icon}
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
            © {new Date().getFullYear()} {site.name} · {site.domain}
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
