import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import PriceHikeTimer from "@/components/PriceHikeTimer";
import AnimatedPrice from "@/components/AnimatedPrice";
import { isBeforeHike } from "@/lib/pricing";
import { getLastCta, markLastCta } from "@/lib/lastCta";

const LAVA_LINK = "https://app.lava.top/posts/a683bc4b-d25b-4ec6-a14a-ab80c5a4ffb9";

const TariffsSection = () => {
  const { t } = useLanguage();
  const [now, setNow] = useState(() => Date.now());
  const ctaRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    // Тикаем раз в минуту — для авто-переключения цены ровно в дедлайн.
    const id = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(id);
  }, []);

  const showHike = isBeforeHike(now);

  // После смены цены возвращаем фокус в ту CTA, с которой пользователь
  // взаимодействовал последней (Header desktop, Sticky mobile или эта же кнопка).
  // Если ничего не зарегистрировано — фолбэк на основную CTA в тарифах.
  const handlePriceChange = useCallback(() => {
    const target = getLastCta() ?? ctaRef.current;
    target?.focus({ preventScroll: true });
  }, []);

  const trackTariffsCta = () => markLastCta(ctaRef.current, "tariffs");

  const features = [
    t("tariffs.f1"), t("tariffs.f2"), t("tariffs.f3"),
    t("tariffs.f4"), t("tariffs.f5"), t("tariffs.f6"),
  ];

  return (
    <section id="tariffs" className="py-20 md:py-28 bg-background" aria-labelledby="tariffs-heading">
      <div className="container">
        <h2 id="tariffs-heading" className="text-3xl md:text-4xl font-extrabold text-center text-foreground">
          {t("tariffs.title")}
        </h2>
        <p className="mt-3 text-center text-muted-foreground text-lg">
          {t("tariffs.subtitle")}
        </p>
        <div className={`mt-14 grid gap-6 ${showHike ? "md:grid-cols-2" : ""} max-w-4xl mx-auto items-stretch`}>
          <article className="animate-in-view relative rounded-2xl p-10 border border-primary popular-glow bg-card shadow-xl text-center">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
              {t("tariffs.badge")}
            </span>
            <AnimatedPrice onPriceChange={handlePriceChange} />
            <ul className="mt-8 space-y-3 text-left inline-block">
              {features.map((f, j) => (
                <li key={j} className="flex items-center gap-2 text-sm text-foreground">
                  <span className="text-primary" aria-hidden="true">✓</span> {f}
                </li>
              ))}
            </ul>
            <a
              ref={ctaRef}
              href={LAVA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onFocus={trackTariffsCta}
              onClick={trackTariffsCta}
              className="mt-8 block text-center py-3.5 rounded-xl font-bold transition-opacity hover:opacity-90 bg-accent text-accent-foreground outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background">
              {t("tariffs.cta")}
            </a>
          </article>

          {showHike && (
            <aside className="animate-in-view rounded-2xl p-8 border-2 border-accent bg-accent/10 shadow-sm flex flex-col justify-center">
              <h3 className="font-extrabold text-xl md:text-2xl text-foreground">
                {t("pricealert.title")}
              </h3>
              <p className="mt-3 text-sm md:text-base text-foreground/80 leading-relaxed">
                {t("pricealert.desc")}
              </p>
              <PriceHikeTimer />
            </aside>
          )}
        </div>
      </div>
    </section>
  );
};

export default TariffsSection;
