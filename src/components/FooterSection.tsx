import { useLanguage } from "@/i18n/LanguageContext";
import FooterSynth from "./FooterSynth";

const FooterSection = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-foreground pt-10 pb-6" role="contentinfo">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/70">© 2026 <a href="https://mastersuno.ru" target="_blank" rel="noopener noreferrer" className="hover:text-background/90 transition-colors">MASTERSUNO.RU</a> — {t("footer.rights")}</p>
          <nav className="flex gap-6 text-sm" aria-label="Legal">
            <a href="/blog" className="text-background/70 hover:text-background/90 transition-colors">
              Блог
            </a>
            <a href="#" className="text-background/70 hover:text-background/90 transition-colors">
              {t("footer.privacy")}
            </a>
            <a href="#" className="text-background/70 hover:text-background/90 transition-colors">
              {t("footer.terms")}
            </a>
          </nav>
        </div>
        <div className="mt-8 text-center">
          <a
            href="#tariffs"
            className="bg-accent text-accent-foreground px-8 py-3.5 rounded-xl font-bold hover:opacity-90 transition-opacity inline-block">
            {t("footer.download")}
          </a>
        </div>
      </div>

      <div className="mt-10">
        <p className="text-center text-background/40 text-xs mb-3 font-medium tracking-wide uppercase">
          {t("footer.synth")}
        </p>
        <FooterSynth />
      </div>
    </footer>
  );
};

export default FooterSection;
