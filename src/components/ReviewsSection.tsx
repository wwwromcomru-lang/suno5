import { useLanguage } from "@/i18n/LanguageContext";
import { TranslationKey } from "@/i18n/translations";

const reviewKeys: { textKey: TranslationKey; authorKey: TranslationKey; roleKey: TranslationKey }[] = [
  { textKey: "reviews.r1.text", authorKey: "reviews.r1.author", roleKey: "reviews.r1.role" },
  { textKey: "reviews.r2.text", authorKey: "reviews.r2.author", roleKey: "reviews.r2.role" },
  { textKey: "reviews.r3.text", authorKey: "reviews.r3.author", roleKey: "reviews.r3.role" },
];

const ReviewsSection = () => {
  const { t } = useLanguage();

  return (
    <section id="reviews" className="py-20 md:py-28 bg-card" aria-labelledby="reviews-heading">
      <div className="container">
        <h2 id="reviews-heading" className="text-3xl md:text-4xl font-extrabold text-center text-foreground">
          {t("reviews.title")}
        </h2>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {reviewKeys.map((r, i) => (
            <article
              key={i}
              className="animate-in-view bg-background rounded-2xl p-6 border border-border shadow-sm"
            >
              <div className="text-primary text-3xl mb-3" aria-label={t("reviews.rating")}>★★★★★</div>
              <blockquote className="text-foreground leading-relaxed">«{t(r.textKey)}»</blockquote>
              <footer className="mt-4 pt-4 border-t border-border">
                <p className="font-bold text-foreground">{t(r.authorKey)}</p>
                <p className="text-sm text-muted-foreground">{t(r.roleKey)}</p>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
