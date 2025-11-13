import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import OffersSection from '@/components/OffersSection';
import ServicesSection from '@/components/ServicesSection';
import GallerySection from '@/components/GallerySection';
import FAQSection from '@/components/FAQSection';

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <OffersSection />
      <ServicesSection />
      <GallerySection />
      <FAQSection />
    </>
  );
}
