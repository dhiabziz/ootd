'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HERO_IMAGE = '/images/hero-bg.svg';

export function HeroSection() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Background image */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-2xl scale-[1.03]"
          style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
        />
        <div className="absolute inset-0 bg-neutral-950/10" />
      </div>
      {/* Cream overlay */}
      <div aria-hidden="true" className="absolute inset-0 bg-neutral-50/70" />

      {/* Decorative SVG rings top-right */}
      <div
        aria-hidden="true"
        className="absolute top-24 right-6 md:top-32 md:right-16 opacity-40 hidden sm:block"
      >
        <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
          <circle cx="42" cy="40" r="32" stroke="#D87A8E" strokeWidth="1.5" />
          <circle cx="78" cy="40" r="32" stroke="#D87A8E" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative container mx-auto">
        <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
          {/* Top label with dot */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-[11px] md:text-xs uppercase tracking-[0.22em] font-semibold text-neutral-700"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
            Edukasi Pernikahan
          </motion.div>

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm md:text-base uppercase tracking-[0.18em] font-medium text-neutral-700"
          >
            Sebelum kamu bilang —
          </motion.p>

          {/* Massive headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.95] text-neutral-900"
          >
            &quot;Iya,{' '}
            <span className="italic font-extrabold text-primary-600">aku mau.</span>
            &quot;
          </motion.h1>

          {/* Sub-headline */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-2xl md:text-3xl lg:text-4xl font-semibold text-neutral-900 pt-2"
          >
            Sudah tahu belum?
          </motion.h2>

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="text-base md:text-lg text-neutral-700 max-w-xl mx-auto leading-relaxed"
          >
            Banyak yang jatuh cinta dengan pernikahan, tapi lupa mempersiapkan
            diri untuk hidup di dalamnya. Kenali dirimu — sebelum terlambat.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex flex-col gap-3 max-w-md mx-auto pt-4"
          >
            <Button
              size="lg"
              className="w-full text-base h-14"
              onClick={() => scrollTo('legal-guide')}
            >
              Mulai perjalananmu →
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        onClick={() => scrollTo('legal-guide')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-500 hover:text-primary-600 transition-colors"
        aria-label="Scroll ke bawah"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-medium">
          Scroll
        </span>
        <ArrowDown className="h-4 w-4 animate-bounce-slow" />
      </motion.button>
    </section>
  );
}
