import HeroSection from "@/src/components/pages/home/HeroSection";
import InfoSection from "@/src/components/pages/home/InfoSection";
import Testimonials from "@/src/components/pages/home/Testimonials";
import HowItWorks from "@/src/components/pages/home/HowItWorks";
import JobExample from "@/src/components/pages/home/JobExample";
import FAQ from "@/src/components/pages/home/FAQ";

export default function Home() {
  return (
    <>
      <HeroSection />
      <InfoSection />
      <HowItWorks />
      <Testimonials />
      <JobExample />
      <FAQ />
    </>
  );
}
