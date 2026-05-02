import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import WhatsInsideSection from "@/components/WhatsInsideSection";
import ComparisonSection from "@/components/ComparisonSection";
import BooksSection from "@/components/BooksSection";
import TrackExamplesSection from "@/components/TrackExamplesSection";
import ListenedOnSection from "@/components/ListenedOnSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TariffsSection from "@/components/TariffsSection";
import ReviewsSection from "@/components/ReviewsSection";
import FAQSection from "@/components/FAQSection";
import SupportSection from "@/components/SupportSection";
import FooterSection from "@/components/FooterSection";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Index = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <WhatsInsideSection />
        <ComparisonSection />
        <BooksSection />
        <TrackExamplesSection />
        <ListenedOnSection />
        <HowItWorksSection />
        <TariffsSection />
        <ReviewsSection />
        <FAQSection />
        <SupportSection />
      </main>
      <FooterSection />
    </div>
  );
};

export default Index;
