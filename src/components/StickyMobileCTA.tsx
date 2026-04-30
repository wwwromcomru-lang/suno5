import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useLocation } from "react-router-dom";
import { tariffsAnchor } from "@/lib/pricing";
import { markLastCta } from "@/lib/lastCta";

const StickyMobileCTA = () => {
  const { t, prefix } = useLanguage();
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLAnchorElement | null>(null);
  const track = () => markLastCta(ref.current, "sticky");

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const homePath = prefix === "" ? "/" : prefix;
  const isHome = location.pathname === homePath || location.pathname === prefix + "/";
  const href = tariffsAnchor(prefix, isHome);

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 pt-3 bg-gradient-to-t from-background via-background/95 to-transparent transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <a
        ref={ref}
        href={href}
        onFocus={track}
        onClick={track}
        aria-label={t("nav.subscribe")}
        className="block w-full text-center bg-accent text-accent-foreground py-4 rounded-2xl font-extrabold shadow-2xl hover:opacity-90 transition-opacity outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {t("nav.subscribe")} →
      </a>
    </div>
  );
};

export default StickyMobileCTA;
