import ScrollToTop from "@/components/ScrollToTop";
import AchivementSection from "./AchivementSection";
import CapabilitySection from "./CapabilitySection";
import CareerSection from "./CareerSection";
import FactorySection from "./FactorySection";
import HeroSection from "./HeroSection";
import NewsSection from "./NewsSection";
import VisionSection from "./VisionSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <VisionSection />
      <AchivementSection />
      <CapabilitySection />
      <FactorySection />
      <NewsSection />
      <CareerSection />
      <ScrollToTop />
    </>
  );
}
