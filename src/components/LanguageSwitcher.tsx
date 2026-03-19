import { useLanguage } from "@/i18n/LanguageContext";
import { useNavigate, useLocation } from "react-router-dom";

const LanguageSwitcher = () => {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const switchLang = () => {
    const path = location.pathname + location.hash;
    if (lang === "ru") {
      // Add /en prefix
      navigate("/en" + path);
    } else {
      // Remove /en prefix
      navigate(path.replace(/^\/en/, "") || "/");
    }
  };

  return (
    <button
      onClick={switchLang}
      className="px-3 py-1.5 rounded-lg text-xs font-bold border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
      aria-label={lang === "ru" ? "Switch to English" : "Переключить на русский"}
    >
      {lang === "ru" ? "EN" : "RU"}
    </button>
  );
};

export default LanguageSwitcher;
