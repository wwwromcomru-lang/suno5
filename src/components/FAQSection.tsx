import { useLanguage } from "@/i18n/LanguageContext";
import { TranslationKey } from "@/i18n/translations";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqKeys: { qKey: TranslationKey; aKey: TranslationKey }[] = [
  { qKey: "faq.q1", aKey: "faq.a1" },
  { qKey: "faq.q2", aKey: "faq.a2" },
  { qKey: "faq.q3", aKey: "faq.a3" },
  { qKey: "faq.q4", aKey: "faq.a4" },
  { qKey: "faq.q5", aKey: "faq.a5" },
  { qKey: "faq.q6", aKey: "faq.a6" },
  
  { qKey: "faq.q8", aKey: "faq.a8" },
  { qKey: "faq.q9", aKey: "faq.a9" },
  { qKey: "faq.q10", aKey: "faq.a10" },
  { qKey: "faq.q11", aKey: "faq.a11" },
  { qKey: "faq.q12", aKey: "faq.a12" },
  { qKey: "faq.q13", aKey: "faq.a13" },
];

const FAQSection = () => {
  const { t } = useLanguage();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqKeys.map((item) => ({
      "@type": "Question",
      name: t(item.qKey),
      acceptedAnswer: {
        "@type": "Answer",
        text: t(item.aKey),
      },
    })),
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-muted/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="container max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-foreground">
          {t("faq.title")}
        </h2>
        <Accordion type="single" collapsible className="mt-12">
          {faqKeys.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="animate-in-view">
              <AccordionTrigger className="text-left text-foreground font-semibold">
                {t(item.qKey)}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {t(item.aKey)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
