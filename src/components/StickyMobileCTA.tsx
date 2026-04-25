import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useLocation } from "react-router-dom";

const StickyMobileCTA = () => {
  const { t, prefix } = useLanguage();
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = location.pathname === prefix + "/" || location.pathname === prefix;
  const href = isHome ? "#tariffs" : prefix + "/#tariffs";

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 pt-3 bg-gradient-to-t from-background via-background/95 to-transparent transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <a
        href={href}
        className="block w-full text-center bg-accent text-accent-foreground py-4 rounded-2xl font-extrabold shadow-2xl hover:opacity-90 transition-opacity"
      >
        {t("nav.subscribe")} →
      </a>
    </div>
  );
};

export default StickyMobileCTA;
