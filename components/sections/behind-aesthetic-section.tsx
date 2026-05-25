'use client';

import { ExternalLink } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FadeIn } from '@/components/fade-in';

const personalImpacts = [
  {
    emoji: '📚',
    title: 'Putus sekolah',
    description: 'Pendidikan terhenti, peluang berkembang tertutup',
  },
  {
    emoji: '🧠',
    title: 'Risiko kesehatan mental',
    description:
      'Depresi, kecemasan, hingga PTSD akibat kematangan emosi yang belum siap',
  },
  {
    emoji: '🩺',
    title: 'Komplikasi kesehatan reproduksi',
    description:
      'Tubuh remaja belum siap untuk kehamilan, risiko kematian ibu 2x lipat dibanding usia >20',
  },
  {
    emoji: '🌱',
    title: 'Kehilangan masa eksplorasi diri',
    description: 'Identitas dan tujuan hidup belum sempat terbentuk',
  },
];

const socialImpacts = [
  {
    emoji: '💥',
    title: 'Risiko KDRT lebih tinggi',
    description: 'Ketidaksiapan menangani konflik berujung kekerasan',
  },
  {
    emoji: '💸',
    title: 'Ketergantungan ekonomi',
    description: 'Tidak memiliki kemandirian finansial',
  },
  {
    emoji: '🔄',
    title: 'Siklus kemiskinan antargenerasi',
    description: 'Anak yang lahir berisiko mengalami stunting & kemiskinan',
  },
  {
    emoji: '💔',
    title: 'Tingkat perceraian lebih tinggi',
    description: 'Komitmen yang diambil belum matang',
  },
];

const sources = [
  {
    label: 'Jurnal: Pencegahan Pernikahan Dini pada Remaja (Anisa et al., 2023)',
    url: 'https://ejournal.nusantaraglobal.ac.id/index.php/ejoin/article/download/1606/1535/8139',
  },
  {
    label: 'UNICEF Indonesia — Perkawinan Anak Factsheet 2020',
    url: 'https://www.unicef.org/indonesia/media/2826/file/Perkawinan-Anak-Factsheet-2020.pdf',
  },
  {
    label: 'UNICEF — Child Marriage Report 2020',
    url: 'https://www.unicef.org/indonesia/media/2851/file/child-marriage-report-2020.pdf',
  },
  {
    label: 'BPS — Data Proporsi Perempuan 20-24 Menikah <18 Tahun',
    url: 'https://www.bps.go.id/id/statistics-table/2/MTM2MCMy/proporsi-perempuan-umur-20-24-tahun-yang-berstatus-kawin-atau-berstatus-hidup-bersama-sebelum-umur-18-tahun-menurut-provinsi.html',
  },
  {
    label: 'Kemenpppa — 30 Tahun Ratifikasi Konvensi Hak Anak',
    url: 'https://www.kemenpppa.go.id/index.php/siaran-pers/indonesia-setelah-30-tahun-meratifikasi-konvensi-hak-anak',
  },
];

function ImpactList({
  title,
  items,
}: {
  title: string;
  items: typeof personalImpacts;
}) {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl md:text-3xl font-bold text-neutral-900">
        {title}
      </h3>
      <ul className="space-y-5">
        {items.map((item) => (
          <li
            key={item.title}
            className="bg-white rounded-2xl p-5 md:p-6 border border-primary-100 hover:border-primary-200 transition-colors"
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl flex-shrink-0" aria-hidden="true">
                {item.emoji}
              </span>
              <div>
                <h4 className="font-bold text-base md:text-lg text-neutral-900 mb-1">
                  {item.title}
                </h4>
                <p className="text-sm md:text-base text-neutral-700 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BehindAestheticSection() {
  return (
    <section
      id="behind-aesthetic"
      className="py-20 md:py-32 scroll-mt-20 bg-primary-50"
    >
      <div className="container mx-auto">
        {/* Section header */}
        <FadeIn className="max-w-3xl mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] font-semibold text-primary-700 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
            Bagian 03
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 mb-5">
            Behind the aesthetic marriage
          </h2>
          <p className="text-lg md:text-xl text-neutral-700 leading-relaxed">
            Pernikahan dini bukan sekadar pilihan personal — dampaknya
            menyentuh banyak aspek hidup. Mari kita lihat sisi yang jarang
            diceritakan.
          </p>
        </FadeIn>

        {/* Two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 mb-16">
          <FadeIn>
            <ImpactList title="💔 Dampak Personal" items={personalImpacts} />
          </FadeIn>
          <FadeIn delay={0.1}>
            <ImpactList title="🌍 Dampak Sosial" items={socialImpacts} />
          </FadeIn>
        </div>

        {/* Sources accordion */}
        <FadeIn delay={0.15}>
          <Accordion type="single" collapsible>
            <AccordionItem value="sources" className="bg-white">
              <AccordionTrigger>
                <span>📚 Baca Studi & Sumber Data</span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-base text-neutral-700 leading-relaxed mb-5 italic">
                  Penelitian Anisa et al. (2023) di Universitas Muhammadiyah
                  Sumatera Barat menemukan bahwa 42% pasangan menikah dini
                  didorong faktor ekonomi, 68% orang tua tidak memahami
                  regulasi batas usia menikah legal, dan 80% pelaku pernikahan
                  dini berasal dari pemahaman religiusitas yang belum dibarengi
                  kesiapan biologis-psikologis.
                </p>
                <p className="text-xs uppercase tracking-wider font-semibold text-primary-700 mb-3">
                  Sumber Lengkap:
                </p>
                <ul className="space-y-2.5">
                  {sources.map((s) => (
                    <li key={s.url} className="flex items-start gap-2">
                      <span className="text-primary-400 mt-2 flex-shrink-0">
                        •
                      </span>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-neutral-700 hover:text-primary-700 underline-offset-4 hover:underline transition-colors inline-flex items-start gap-1.5"
                      >
                        <span>{s.label}</span>
                        <ExternalLink className="h-3 w-3 flex-shrink-0 mt-1" />
                      </a>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </FadeIn>
      </div>
    </section>
  );
}
