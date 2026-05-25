'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/dear-future-fit', label: 'Dear Future Fit' },
  { href: '/fitting-room', label: 'Fitting Room' },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        scrolled
          ? 'bg-neutral-50/95 backdrop-blur-md border-b border-neutral-200/60 shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-baseline gap-2 group" aria-label="OOTD beranda">
            <span className="text-2xl md:text-3xl font-extrabold tracking-tight text-neutral-900 group-hover:text-primary-700 transition-colors">
              OOTD
            </span>
            <span className="hidden sm:inline text-[10px] md:text-xs uppercase tracking-[0.18em] font-medium text-neutral-500">
              Our Own Tomorrow Dreams
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Navigasi utama">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative px-4 py-2 text-sm font-medium transition-colors rounded-full',
                    isActive
                      ? 'text-primary-700'
                      : 'text-neutral-700 hover:text-primary-700'
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-4 right-4 h-[2px] bg-primary-600 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-neutral-900 hover:bg-neutral-100 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          'md:hidden fixed inset-x-0 top-16 bottom-0 bg-neutral-50/95 backdrop-blur-xl shadow-2xl transition-all duration-300 ease-in-out',
          mobileOpen
            ? 'opacity-100 visible translate-y-0'
            : 'opacity-0 invisible -translate-y-2'
        )}
      >
        <nav className="container mx-auto py-8 flex flex-col gap-2" aria-label="Navigasi mobile">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-4 text-lg font-semibold rounded-2xl transition-colors',
                  isActive
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-neutral-900 hover:bg-neutral-100'
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
