import { CreditCard, Unlock, CalendarPlus } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const HowItWorksSection = () => {
  const { t } = useLanguage();

  const steps = [
    { icon: CreditCard, titleKey: "how.s1.title" as const, descKey: "how.s1.desc" as const },
    { icon: Unlock, titleKey: "how.s2.title" as const, descKey: "how.s2.desc" as const },
    { icon: CalendarPlus, titleKey: "how.s3.title" as const, descKey: "how.s3.desc" as const },
  ];

  return (
    <section id="how" className="py-16 md:py-24 bg-muted/30" aria-labelledby="how-title">
      <div className="container max-w-6xl">
        <div className="text-center max-w-2xl mx-auto">
          <h2 id="how-title" className="text-3xl md:text-4xl font-extrabold text-foreground">
            {t("how.title")}
          </h2>
          <p className="mt-3 text-muted-foreground text-lg">{t("how.subtitle")}</p>
        </div>

        <ol className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 list-none">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <li
                key={i}
                className="relative bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/15 text-accent flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="font-extrabold text-lg text-foreground">{t(s.titleKey)}</h3>
                <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{t(s.descKey)}</p>
                {i < steps.length - 1 && (
                  <div
                    className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border"
                    aria-hidden="true"
                  />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default HowItWorksSection;
