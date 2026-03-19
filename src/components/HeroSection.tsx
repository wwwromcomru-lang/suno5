import { useLanguage } from "@/i18n/LanguageContext";
import CountdownTimer from "./CountdownTimer";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="hero-bg pt-32 pb-20 md:pt-40 md:pb-28" aria-labelledby="hero-heading">
      <div className="container text-center">
        <CountdownTimer />
        <h1 id="hero-heading" className="mt-8 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-foreground">
          {t("hero.title")}
          <br />
          <span className="brand-gradient-text text-2xl">{t("hero.from")} <a href="https://mastersuno.ru" target="_blank" rel="noopener noreferrer" className="brand-gradient-text hover:underline transition-all">MASTERSUNO.RU</a></span>
        </h1>
        <p className="mt-5 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          {t("hero.subtitle")}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#tariffs"
            className="bg-accent text-accent-foreground px-8 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity shadow-lg">
            {t("hero.cta")}
          </a>
          <a
            href="#books"
            className="border-2 border-primary text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary hover:text-primary-foreground transition-colors">
            {t("hero.browse")}
          </a>
        </div>
      </div>
    </section>);
};

export default HeroSection;
