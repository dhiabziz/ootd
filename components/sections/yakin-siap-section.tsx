'use client';

import { Check, ExternalLink } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FadeIn } from '@/components/fade-in';

const items = [
  {
    id: 'usia',
    emoji: '🎂',
    title: 'Kesiapan Usia',
    bullets: [
      'Perempuan minimal usia **21 tahun**',
      'Laki-laki minimal **25 tahun**',
      'Kenapa? Karena sudah lebih matang secara fisik dan emosional',
    ],
    note: 'UU No. 16/2019 menetapkan batas minimum legal 19 tahun, tapi BKKBN merekomendasikan usia ideal 21/25 tahun.',
  },
  {
    id: 'fisik',
    emoji: '💪',
    title: 'Kesiapan Fisik & Kesehatan',
    bullets: [
      'Sehat secara jasmani',
      'Siap secara reproduksi (sistem reproduksi sudah matang sempurna)',
      'Tidak memiliki penyakit berisiko (genetik, menular)',
      'Paham pentingnya perencanaan kehamilan',
      'Pemeriksaan pra-nikah (premarital check-up)',
    ],
    note: 'Ingat: Kesehatan orang tua menentukan kualitas generasi.',
  },
  {
    id: 'mental',
    emoji: '🧠',
    title: 'Kesiapan Mental & Emosional',
    bullets: [
      'Siap berkomitmen seumur hidup',
      'Mampu mengelola emosi dan konflik dengan dewasa',
      'Saling menghargai dan berkomunikasi dengan baik',
      'Siap menjadi pasangan, bukan sekadar pacar',
      'Kesiapan menjadi orang tua di masa depan',
    ],
  },
  {
    id: 'finansial',
    emoji: '💰',
    title: 'Kesiapan Finansial',
    bullets: [
      'Memiliki penghasilan atau sumber ekonomi yang stabil',
      'Mampu mengatur keuangan keluarga',
      'Tidak bergantung sepenuhnya pada orang tua',
      'Stabil secara ekonomi = lebih tenang menjalani rumah tangga',
      'Diskusi terbuka tentang keuangan dengan pasangan',
    ],
  },
  {
    id: 'sosial',
    emoji: '👥',
    title: 'Kesiapan Sosial',
    bullets: [
      'Memiliki restu keluarga dari kedua belah pihak',
      'Siap beradaptasi dengan lingkungan baru',
      'Memahami peran sebagai suami/istri',
      'Siap membangun relasi dengan keluarga besar pasangan',
    ],
  },
  {
    id: 'keluarga',
    emoji: '👶',
    title: 'Perencanaan Keluarga',
    bullets: [
      'Menentukan jumlah dan jarak kelahiran anak',
      'Menggunakan KB sesuai kebutuhan',
      'Membangun keluarga kecil, bahagia, dan sejahtera',
      'Inilah kunci keluarga berkualitas',
    ],
  },
];

// Simple bold parser for **text**
function renderText(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-bold text-neutral-900">
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export function YakinSiapSection() {
  return (
    <section id="yakin-siap" className="py-20 md:py-32 scroll-mt-20 bg-neutral-50">
      <div className="container mx-auto">
        {/* Section header */}
        <FadeIn className="max-w-3xl mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] font-semibold text-primary-700 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
            Bagian 02
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 mb-5">
            Yakin siap nikah?
          </h2>
          <p className="text-lg md:text-xl text-neutral-700 leading-relaxed">
            Pernikahan bukan sekadar acara, tetapi awal kehidupan baru. Cek
            dulu kesiapanmu di lima aspek penting berikut.
          </p>
        </FadeIn>

        {/* Why prepare card */}
        <FadeIn className="mb-12">
          <div className="bg-primary-50 border border-primary-100 rounded-3xl p-8 md:p-10">
            <h3 className="text-xl md:text-2xl font-bold text-neutral-900 mb-5">
              Kenapa harus siap?
            </h3>
            <ul className="space-y-3">
              {[
                'Mencegah konflik rumah tangga',
                'Mewujudkan keluarga berkualitas',
                'Menghindari risiko perceraian',
              ].map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="flex-shrink-0 mt-0.5 inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary-600 text-white">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-base md:text-lg text-neutral-900 font-medium">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-neutral-500">
              Sumber:{' '}
              <a
                href="https://www.instagram.com/reel/DXvJc77gFJU/?igsh=MWEzYjB3a29pdjJqZw=="
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary-700 hover:text-primary-800 underline-offset-4 hover:underline"
              >
                BKKBN — Cek Kesiapan Nikah
                <ExternalLink className="h-3 w-3" />
              </a>
            </p>
          </div>
        </FadeIn>

        {/* Accordion */}
        <FadeIn delay={0.1}>
          <Accordion type="single" collapsible className="space-y-4">
            {items.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger>
                  <span className="flex items-center gap-3">
                    <span className="text-2xl" aria-hidden="true">
                      {item.emoji}
                    </span>
                    <span>{item.title}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-3 pl-1">
                    {item.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="flex-shrink-0 mt-2.5 h-1.5 w-1.5 rounded-full bg-primary-400" />
                        <span className="text-base text-neutral-700 leading-relaxed">
                          {renderText(bullet)}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {item.note && (
                    <p className="mt-5 pt-5 border-t border-primary-50 text-sm italic text-neutral-500">
                      {item.note}
                    </p>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeIn>

        {/* Source */}
        <FadeIn delay={0.15} className="mt-10 max-w-3xl">
          <p className="text-sm text-neutral-500 leading-relaxed">
            Materi disusun berdasarkan rekomendasi{' '}
            <a
              href="https://www.instagram.com/reel/DXvJc77gFJU/?igsh=MWEzYjB3a29pdjJqZw=="
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary-700 hover:text-primary-800 underline-offset-4 hover:underline"
            >
              BKKBN
            </a>{' '}
            dan{' '}
            <a
              href="https://peraturan.bpk.go.id/Download/113523/UU%20Nomor%2016%20Tahun%202019.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary-700 hover:text-primary-800 underline-offset-4 hover:underline"
            >
              UU No. 16/2019
            </a>
            .
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
