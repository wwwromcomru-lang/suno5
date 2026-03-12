import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import WhatsInsideSection from "@/components/WhatsInsideSection";
import BooksSection from "@/components/BooksSection";
import TariffsSection from "@/components/TariffsSection";
import ReviewsSection from "@/components/ReviewsSection";
import FAQSection from "@/components/FAQSection";
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
        <BooksSection />
        <TariffsSection />
        <ReviewsSection />
        <FAQSection />
      </main>
      <FooterSection />
    </div>
  );
};

export default Index;
