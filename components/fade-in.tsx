'use client';

import { motion, type Variants } from 'framer-motion';
import * as React from 'react';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'header' | 'h1' | 'h2' | 'h3' | 'p';
  y?: number;
}

export function FadeIn({
  children,
  delay = 0,
  className,
  as = 'div',
  y = 24,
}: FadeInProps) {
  const variants: Variants = {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98], delay },
    },
  };

  const MotionComp = motion[as] as any;

  return (
    <MotionComp
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={variants}
    >
      {children}
    </MotionComp>
  );
}
