'use client';

import { motion } from 'framer-motion';

type PageHeroProps = {
  label: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
};

export function PageHero({ label, title, subtitle, description, image }: PageHeroProps) {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-2xl scale-[1.03]"
          style={{ backgroundImage: `url('${image}')` }}
        />
        <div className="absolute inset-0 bg-neutral-950/10" />
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-neutral-50/90" />

      <div className="relative container mx-auto">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] font-semibold text-primary-700"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
            {label}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-neutral-900"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-lg md:text-xl font-medium text-neutral-700"
          >
            {subtitle}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base md:text-lg text-neutral-700 leading-relaxed max-w-2xl mx-auto"
          >
            {description}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
