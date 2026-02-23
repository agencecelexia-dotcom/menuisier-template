import { HeroSection } from "@/components/home/HeroSection";
import { ValuesSection } from "@/components/home/ValuesSection";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CtaSection } from "@/components/home/CtaSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ValuesSection />
      <ServicesPreview />
      <FeaturedProjects />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
