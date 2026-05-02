import { Check, X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { TranslationKey } from "@/i18n/translations";

const rows: { key: TranslationKey; without: TranslationKey; with: TranslationKey }[] = [
  { key: "compare.r1", without: "compare.r1.without", with: "compare.r1.with" },
  { key: "compare.r2", without: "compare.r2.without", with: "compare.r2.with" },
  { key: "compare.r3", without: "compare.r3.without", with: "compare.r3.with" },
  { key: "compare.r4", without: "compare.r4.without", with: "compare.r4.with" },
  { key: "compare.r5", without: "compare.r5.without", with: "compare.r5.with" },
  { key: "compare.r6", without: "compare.r6.without", with: "compare.r6.with" },
];

const ComparisonSection = () => {
  const { t } = useLanguage();

  return (
    <section id="comparison" className="py-20 md:py-28 bg-secondary/50">
      <div className="container max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-foreground">
          {t("compare.title")}
        </h2>
        <p className="mt-3 text-center text-muted-foreground text-lg max-w-2xl mx-auto">
          {t("compare.subtitle")}
        </p>

        <div className="mt-12 animate-in-view rounded-2xl border border-border overflow-hidden bg-card shadow-lg">
          <div className="grid grid-cols-3 bg-muted/40 text-sm md:text-base font-bold">
            <div className="p-4 md:p-5 text-muted-foreground">{t("compare.col.criterion")}</div>
            <div className="p-4 md:p-5 text-center border-l border-border text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <X className="w-4 h-4 text-destructive" />
                {t("compare.col.without")}
              </span>
            </div>
            <div className="p-4 md:p-5 text-center border-l border-border text-primary">
              <span className="inline-flex items-center gap-2">
                <Check className="w-4 h-4" />
                {t("compare.col.with")}
              </span>
            </div>
          </div>

          {rows.map((r, i) => (
            <div
              key={r.key}
              className={`grid grid-cols-3 text-sm md:text-base ${i % 2 === 0 ? "bg-background" : "bg-muted/20"} border-t border-border`}
            >
              <div className="p-4 md:p-5 font-semibold text-foreground">{t(r.key)}</div>
              <div className="p-4 md:p-5 text-center border-l border-border text-muted-foreground">
                {t(r.without)}
              </div>
              <div className="p-4 md:p-5 text-center border-l border-border text-foreground font-medium">
                {t(r.with)}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {t("compare.footer")}
        </p>
      </div>
    </section>
  );
};

export default ComparisonSection;
