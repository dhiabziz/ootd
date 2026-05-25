'use client';

import Link from 'next/link';
import { FadeIn } from '@/components/fade-in';

export function StartSection() {
  return (
    <section id="start" className="py-20 md:py-32 scroll-mt-20">
      <div className="container mx-auto">
        {/* Section header */}
        <FadeIn className="max-w-3xl mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] font-semibold text-primary-700 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
            Bagian 04
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 mb-5">
            Start From Yourself
          </h2>
          <p className="text-lg md:text-xl text-neutral-700 leading-relaxed">
            Setelah memahami, sekarang waktunya merefleksikan. Pilih satu —
            atau keduanya.
          </p>
        </FadeIn>

        {/* Two cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Card Kiri */}
          <FadeIn>
            <div className="h-full bg-primary-200 rounded-3xl p-8 md:p-10 flex flex-col group hover:bg-primary-300 transition-colors">
              <div className="text-5xl md:text-6xl mb-6">💌</div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-neutral-900 mb-4">
                Dear Future Fit
              </h3>
              <p className="text-base md:text-lg text-neutral-900/80 leading-relaxed mb-8 flex-1">
                Tulis surat untuk dirimu di masa depan. Apa yang ingin kamu
                ingatkan pada dirimu nanti?
              </p>
              <Link
                href="/dear-future-fit"
                className="inline-flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-full px-7 py-3.5 text-base transition-all hover:shadow-lg w-full sm:w-auto sm:self-start"
              >
                Mulai menulis →
              </Link>
            </div>
          </FadeIn>

          {/* Card Kanan */}
          <FadeIn delay={0.1}>
            <div className="h-full bg-primary-100 rounded-3xl p-8 md:p-10 flex flex-col group hover:bg-primary-200 transition-colors">
              <div className="text-5xl md:text-6xl mb-6">💬</div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-neutral-900 mb-4">
                Fitting Room
              </h3>
              <p className="text-base md:text-lg text-neutral-900/80 leading-relaxed mb-8 flex-1">
                Butuh teman bicara? Ruang aman untuk bercerita tanpa dihakimi.
                Konsultasi via WhatsApp.
              </p>
              <Link
                href="/fitting-room"
                className="inline-flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-full px-7 py-3.5 text-base transition-all hover:shadow-lg w-full sm:w-auto sm:self-start"
              >
                Masuk ke Fitting Room →
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
