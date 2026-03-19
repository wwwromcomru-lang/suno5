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
];

const FAQSection = () => {
  const { t } = useLanguage();

  return (
    <section id="faq" className="py-20 md:py-28 bg-muted/30">
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
