'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import { StartProjectButton } from '@/components/ui/StartProject';
import { useMoments } from '@/components/moments/MomentsProvider';

const links = [
  { name: 'Services', href: '#services' },
  { name: 'Industries', href: '/industries' },
  { name: 'Ecosystem', href: '#ecosystem' },
  { name: 'Process', href: '#process' },
  { name: 'Work', href: '#work' },
  { name: 'About', href: '#about' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { open: openMoments } = useMoments();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div
        className={`border-b transition-all duration-500 ${
          scrolled
            ? 'border-line bg-paper/80 backdrop-blur-xl py-3'
            : 'border-transparent bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-3">
              <span className="relative flex h-7 w-7 items-center justify-center">
                <span className="absolute inset-0 rounded-full border border-ink transition-transform duration-700 group-hover:rotate-180" />
                <span className="h-2 w-2 rounded-full bg-ink transition-transform duration-500 group-hover:scale-150" />
              </span>
              <span className="font-display text-2xl font-medium tracking-tight text-ink">
                Aperture
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden items-center gap-9 md:flex">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="link-wipe hover:bg-[length:100%_1px] text-[13px] font-medium uppercase tracking-[0.16em] text-ash transition-colors hover:text-ink"
                >
                  {link.name}
                </Link>
              ))}
              {/* Aperture Moments — the portal trigger */}
              <button
                onClick={openMoments}
                className="group inline-flex items-center gap-1.5 text-[13px] font-medium uppercase tracking-[0.16em] text-ash transition-colors hover:text-[#e6a532]"
              >
                <Sparkles className="h-3.5 w-3.5 text-[#e6a532] transition-transform duration-500 group-hover:rotate-90" />
                Moments
              </button>
            </nav>

            {/* Desktop CTA */}
            <div className="hidden items-center md:flex">
              <StartProjectButton size="sm" label="Start Project" />
            </div>

            {/* Mobile Toggle */}
            <button
              className="relative z-10 p-2 text-ink md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-b border-line bg-paper md:hidden"
          >
            <div className="container mx-auto flex flex-col gap-1 px-6 py-6">
              {links.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block border-b border-line py-4 font-display text-3xl font-medium text-ink"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openMoments();
                }}
                className="flex items-center gap-2 border-b border-line py-4 text-left font-display text-3xl font-medium text-[#e6a532]"
              >
                <Sparkles className="h-6 w-6" />
                Moments
              </button>
              <div className="pt-6">
                <StartProjectButton className="w-full" label="Start Project" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
