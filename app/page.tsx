import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { ProcessFlow } from '@/components/ProcessFlow';
import { FeatureCards } from '@/components/FeatureCards';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ProcessFlow />
        <FeatureCards />
      </main>
      <Footer />
    </div>
  );
}
