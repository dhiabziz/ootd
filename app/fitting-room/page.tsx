import type { Metadata } from 'next';
import { Lock, MessageCircle, Handshake } from 'lucide-react';
import { FittingRoomForm } from '@/components/forms/fitting-room-form';
import { PageHero } from '@/components/sections/page-hero';

export const metadata: Metadata = {
  title: 'Fitting Room — OOTD',
  description:
    'Ruang aman untuk bercerita tanpa dihakimi. Konsultasi anonim via WhatsApp tentang kesiapan dan pernikahan dini.',
};

const features = [
  { icon: Lock, text: 'Identitasmu tetap aman' },
  { icon: MessageCircle, text: 'Konsultasi via WhatsApp' },
  { icon: Handshake, text: 'Didengarkan tanpa dihakimi' },
];

export default function FittingRoomPage() {
  return (
    <>
      <PageHero
        label="Anonymous Deep Talk"
        title="Fitting Room"
        subtitle="Ruang aman untuk bercerita"
        description="Ada hal yang ingin kamu sampaikan tapi sulit dibicarakan? Di sini kamu didengar tanpa dihakimi. Konsultasi dilakukan via WhatsApp untuk kenyamananmu."
        image="/images/fitting-room-hero.png"
        blur="blur-[8px]"
      >
        <div className="bg-primary-50/90 border border-primary-100 rounded-2xl p-6 backdrop-blur-sm shadow-xl shadow-slate-200/50">
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {features.map((feature) => (
              <li
                key={feature.text}
                className="flex items-center gap-3 text-sm font-medium text-neutral-900"
              >
                <span className="flex-shrink-0 inline-flex items-center justify-center h-9 w-9 rounded-full bg-white border border-primary-100">
                  <feature.icon className="h-4 w-4 text-primary-600" />
                </span>
                <span>{feature.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </PageHero>

      {/* Form */}
      <section className="mt-12 pb-20 md:mt-16 md:pb-32">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto space-y-8">
            <FittingRoomForm />
          </div>
        </div>
      </section>
    </>
  );
}
