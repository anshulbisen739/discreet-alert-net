import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { TechnologySection } from "@/components/sections/TechnologySection";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { CTASection } from "@/components/sections/CTASection";
import { ContactSection } from "@/components/sections/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <HowItWorksSection />
        <FeaturesSection />
        <TechnologySection />
        <BenefitsSection />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
