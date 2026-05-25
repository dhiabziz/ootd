import { HeroSection } from '@/components/sections/hero-section';
import { LegalGuideSection } from '@/components/sections/legal-guide-section';
import { YakinSiapSection } from '@/components/sections/yakin-siap-section';
import { BehindAestheticSection } from '@/components/sections/behind-aesthetic-section';
import { StartSection } from '@/components/sections/start-section';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <LegalGuideSection />
      <YakinSiapSection />
      <BehindAestheticSection />
      <StartSection />
    </>
  );
}
