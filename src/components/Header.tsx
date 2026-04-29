import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import { tariffsAnchor } from "@/lib/pricing";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { t, prefix } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-card/95 backdrop-blur-md shadow-md" : "bg-transparent"}`
      }>
      
      <div className="container flex items-center justify-between py-4">
        <a href="/" className="text-2xl font-extrabold brand-gradient-text" aria-label="Suno5.ru — Главная">
          SUNO5.RU
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground" aria-label="Основная навигация">
          <a href="#books" className="hover:text-foreground transition-colors">{t("nav.books")}</a>
          <a href="#tariffs" className="hover:text-foreground transition-colors">{t("nav.tariffs")}</a>
          <a href="#reviews" className="hover:text-foreground transition-colors">{t("nav.reviews")}</a>
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <a
            href="#tariffs"
            className="bg-accent text-accent-foreground px-5 py-2.5 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity">
            {t("nav.subscribe")}
          </a>
        </div>
      </div>
    </header>);
};

export default Header;
