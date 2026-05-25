'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type PageHeroProps = {
  label: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  theme?: 'default' | 'dark';
  blur?: string;
  children?: ReactNode;
};

export function PageHero({
  label,
  title,
  subtitle,
  description,
  image,
  theme = 'default',
  blur = 'blur-[8px]',
  children,
}: PageHeroProps) {
  const isDark = theme === 'dark';
  const imageTint = isDark ? 'bg-neutral-950/20' : 'bg-black/5';
  const heroOverlay = isDark ? 'bg-black/40' : 'bg-black/40';

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute inset-0 bg-cover bg-center filter ${blur} scale-[1.03]`}
          style={{ backgroundImage: `url('${image}')` }}
        />
        <div className={`absolute inset-0 ${imageTint}`} />
      </div>
      <div aria-hidden="true" className={`absolute inset-0 ${heroOverlay}`} />

      <div className="relative container mx-auto">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={cn(
              'inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] font-semibold',
              isDark ? 'text-primary-100' : 'text-primary-100'
            )}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
            {label}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className={cn(
              'text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight',
              isDark ? 'text-white' : 'text-white'
            )}
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className={cn(
              'text-lg md:text-xl font-medium',
              isDark ? 'text-slate-200' : 'text-slate-200'
            )}
          >
            {subtitle}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className={cn(
              'text-base md:text-lg leading-relaxed max-w-2xl mx-auto',
              isDark ? 'text-slate-200' : 'text-slate-200'
            )}
          >
            {description}
          </motion.p>
        </div>

        {children ? (
          <div className="mt-12 relative z-10">{children}</div>
        ) : null}
      </div>
    </section>
  );
}
