'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { FadeIn } from '@/components/fade-in';

const stats = [
  {
    number: '25,53 juta',
    description:
      'Perempuan Indonesia menikah sebelum usia 18 tahun (kumulatif).',
    sourceLabel: 'UNICEF 2023 via MPR RI',
    sourceUrl:
      'https://mpr.go.id/berita/Pencegahan-Pernikahan-Usia-Dini-Harus-Konsisten-Ditingkatkan',
  },
  {
    number: 'Peringkat 4',
    description:
      'Indonesia di peringkat 4 dunia kasus pernikahan anak (setelah India, Bangladesh, China).',
    sourceLabel: 'UNICEF 2023 via MPR RI',
    sourceUrl:
      'https://mpr.go.id/berita/Pencegahan-Pernikahan-Usia-Dini-Harus-Konsisten-Ditingkatkan',
  },
  {
    number: '4,56%',
    description:
      'Perempuan usia 20-24 tahun di Indonesia menikah sebelum 18 tahun (lebih dari 4 dari setiap 100 perempuan muda).',
    sourceLabel: 'BPS Susenas 2025',
    sourceUrl:
      'https://www.bps.go.id/id/statistics-table/2/MTM2MCMy/proporsi-perempuan-umur-20-24-tahun-yang-berstatus-kawin-atau-berstatus-hidup-bersama-sebelum-umur-18-tahun-menurut-provinsi.html',
  },
];

const provinces = [
  { name: 'Papua Selatan', value: 12.94 },
  { name: 'Papua Barat', value: 12.25 },
  { name: 'Nusa Tenggara Barat', value: 11.31 },
  { name: 'Sulawesi Barat', value: 11.21 },
  { name: 'Kalimantan Barat', value: 8.82 },
];

const maxProvince = Math.max(...provinces.map((p) => p.value));

const timeline = [
  {
    year: '1974',
    title: 'UU Perkawinan No. 1/1974 ditetapkan',
    description:
      'Batas minimal: perempuan 16 tahun, laki-laki 19 tahun (sudah tertinggal sejak awal).',
    sourceLabel: 'UU No. 1 Tahun 1974',
    sourceUrl: 'https://peraturan.bpk.go.id/Details/47406/uu-no-1-tahun-1974',
  },
  {
    year: '1990',
    title: 'Ratifikasi Konvensi Hak Anak PBB',
    description:
      'Indonesia meratifikasi Konvensi Hak Anak PBB melalui Keppres No. 36/1990, mengakui bahwa anak di bawah 18 tahun wajib dilindungi dari pernikahan dini.',
    sourceLabel: 'PUSKAPA — Seri Belajar',
    sourceUrl: 'https://puskapa.org/blog/seri-belajar/722/',
  },
  {
    year: '2019',
    title: 'UU No. 16/2019 disahkan',
    description:
      'Batas usia minimal naik menjadi 19 tahun untuk keduanya. Namun, dispensasi pengadilan masih terbuka.',
    sourceLabel: 'UU No. 16 Tahun 2019 (PDF)',
    sourceUrl:
      'https://peraturan.bpk.go.id/Download/113523/UU%20Nomor%2016%20Tahun%202019.pdf',
  },
  {
    year: '2020 — sekarang',
    title: 'Pandemi memperparah kondisi',
    description:
      'Pandemi COVID-19 memperparah kondisi. Angka dispensasi pernikahan dini naik hingga 300% akibat tekanan ekonomi dan penutupan sekolah.',
    sourceLabel: 'DP3AK Jatim',
    sourceUrl: 'https://www.dp3ak.jatimprov.go.id/berita/link/17',
  },
];

export function LegalGuideSection() {
  return (
    <section id="legal-guide" className="py-20 md:py-32 scroll-mt-20">
      <div className="container mx-auto">
        {/* Section header */}
        <FadeIn className="max-w-3xl mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] font-semibold text-primary-700 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
            Bagian 01
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 mb-5">
            Legal Guide
          </h2>
          <p className="text-lg md:text-xl text-neutral-700 leading-relaxed mb-8">
            Memahami regulasi pernikahan di Indonesia dari masa ke masa
          </p>
          <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
            Indonesia masuk dalam daftar negara dengan angka pernikahan anak
            tertinggi di dunia. Ini bukan sekadar angka, tetapi tentang jutaan
            remaja yang kehilangan masa depannya. Sebelum bicara tentang
            kesiapan, mari pahami dulu landasan hukum dan realitas yang ada.
          </p>
        </FadeIn>

        {/* Sub-section A: Statistik */}
        <div className="mb-20">
          <FadeIn className="mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-neutral-900">
              Statistik Pernikahan Dini di Indonesia
            </h3>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div className="h-full bg-white border border-primary-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                  <div className="text-4xl md:text-5xl font-extrabold text-primary-600 leading-none mb-4">
                    {stat.number}
                  </div>
                  <p className="text-base font-medium text-neutral-700 leading-relaxed flex-1">
                    {stat.description}
                  </p>
                  <a
                    href={stat.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-primary-700 underline-offset-4 hover:underline transition-colors"
                  >
                    Sumber: {stat.sourceLabel}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="mt-8 max-w-3xl">
            <p className="text-base md:text-lg text-neutral-700 leading-relaxed italic">
              Banyak keluarga di daerah terpencil menganggap menikahkan anak
              perempuan lebih awal sebagai cara mengurangi beban ekonomi,
              menghindari aib, atau mengikuti tradisi turun-temurun.
            </p>
          </FadeIn>
        </div>

        {/* Sub-section B: Provinsi */}
        <div className="mb-20">
          <FadeIn className="mb-3">
            <h3 className="text-2xl md:text-3xl font-bold text-neutral-900">
              Provinsi dengan Proporsi Pernikahan Dini Tertinggi (2025)
            </h3>
          </FadeIn>
          <FadeIn delay={0.05} className="mb-8">
            <p className="text-base text-neutral-700">
              Berdasarkan data BPS, proporsi perempuan 20-24 tahun yang menikah
              sebelum usia 18 tahun:
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="bg-white border border-primary-100 rounded-2xl p-6 md:p-10 space-y-5">
              {provinces.map((province, idx) => {
                const widthPct = (province.value / maxProvince) * 100;
                return (
                  <div key={province.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm md:text-base">
                      <span className="font-semibold text-neutral-900">
                        {province.name}
                      </span>
                      <span className="font-bold text-primary-700 tabular-nums">
                        {province.value.toFixed(2)}%
                      </span>
                    </div>
                    <div className="relative h-3 md:h-4 bg-primary-50 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${widthPct}%` }}
                        viewport={{ once: true, margin: '0px' }}
                        transition={{
                          duration: 0.9,
                          delay: idx * 0.08,
                          ease: 'easeOut',
                        }}
                        className="h-full bg-gradient-to-r from-primary-300 to-primary-400 rounded-full"
                      />
                    </div>
                  </div>
                );
              })}

              <a
                href="https://www.bps.go.id/id/statistics-table/2/MTM2MCMy/proporsi-perempuan-umur-20-24-tahun-yang-berstatus-kawin-atau-berstatus-hidup-bersama-sebelum-umur-18-tahun-menurut-provinsi.html"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary-700 hover:text-primary-800 underline-offset-4 hover:underline transition-colors"
              >
                Lihat data lengkap 38 provinsi di BPS →
              </a>
            </div>
          </FadeIn>
        </div>

        {/* Sub-section C: Timeline */}
        <div>
          <FadeIn className="mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">
              Timeline Perkembangan UU Pernikahan
            </h3>
            <p className="text-base text-neutral-700">
              Perjalanan regulasi pernikahan di Indonesia dari masa ke masa.
            </p>
          </FadeIn>

          <div className="relative">
            {/* Vertical line */}
            <div
              aria-hidden="true"
              className="absolute left-3 md:left-4 top-2 bottom-2 w-px bg-gradient-to-b from-primary-200 via-primary-300 to-primary-200"
            />

            <ol className="space-y-10">
              {timeline.map((item, idx) => (
                <FadeIn key={item.year} delay={idx * 0.08} as="div">
                  <li className="relative pl-12 md:pl-16">
                    {/* Dot */}
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-1.5 h-7 w-7 md:h-9 md:w-9 rounded-full bg-primary-100 border-4 border-neutral-50 flex items-center justify-center"
                    >
                      <span className="h-2 w-2 rounded-full bg-primary-500" />
                    </span>
                    <div className="bg-white border border-primary-100 rounded-2xl p-6 md:p-7 shadow-sm">
                      <span className="inline-block bg-primary-100 text-primary-700 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                        {item.year}
                      </span>
                      <h4 className="text-lg md:text-xl font-bold text-neutral-900 mb-2">
                        {item.title}
                      </h4>
                      <p className="text-base text-neutral-700 leading-relaxed mb-4">
                        {item.description}
                      </p>
                      <a
                        href={item.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-primary-700 underline-offset-4 hover:underline transition-colors"
                      >
                        Sumber: {item.sourceLabel}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </li>
                </FadeIn>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
