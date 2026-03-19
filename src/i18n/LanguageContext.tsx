import { createContext, useContext, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Lang, t as translate, TranslationKey } from "./translations";

interface LanguageContextValue {
  lang: Lang;
  t: (key: TranslationKey) => string;
  prefix: string;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "ru",
  t: (key) => translate(key, "ru"),
  prefix: "",
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isEn = location.pathname.startsWith("/en");
  const currentLang: Lang = isEn ? "en" : "ru";
  const prefix = isEn ? "/en" : "";

  const value = useMemo(
    () => ({
      lang: currentLang,
      t: (key: TranslationKey) => translate(key, currentLang),
      prefix,
    }),
    [currentLang, prefix]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
