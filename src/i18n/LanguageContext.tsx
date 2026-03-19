import { createContext, useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Lang, t as translate, TranslationKey } from "./translations";

interface LanguageContextValue {
  lang: Lang;
  t: (key: TranslationKey) => string;
  prefix: string; // "" for ru, "/en" for en
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "ru",
  t: (key) => translate(key, "ru"),
  prefix: "",
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const { lang } = useParams<{ lang?: string }>();
  const currentLang: Lang = lang === "en" ? "en" : "ru";
  const prefix = currentLang === "en" ? "/en" : "";

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
