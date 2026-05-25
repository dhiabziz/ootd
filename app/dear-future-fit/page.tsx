import type { Metadata } from 'next';
import { LetterForm } from '@/components/forms/letter-form';
import { PageHero } from '@/components/sections/page-hero';

export const metadata: Metadata = {
  title: 'Dear Future Fit — OOTD',
  description:
    'Tulis surat untuk dirimu di masa depan. Time capsule simbolis untuk mengingatkan dirimu tentang siapa kamu hari ini.',
};

export default function DearFutureFitPage() {
  return (
    <>
      <PageHero
        label="OOTD Letters"
        title="Dear Future Fit"
        subtitle="Surat untuk dirimu di masa depan"
        description="Apa yang ingin kamu sampaikan pada dirimu yang akan datang? Tulis impian, harapan, dan janjimu hari ini. Suratmu akan menjadi pengingat tentang siapa kamu hari ini."
        image="/images/dear-future-fit-hero.svg"
      />

      {/* Form */}
      <section className="pb-20 md:pb-32">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto">
            <LetterForm />
          </div>
        </div>
      </section>
    </>
  );
}
