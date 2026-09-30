import { createContext, useContext, useState } from "react";
import { translations } from "../data/translations";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(
    () => localStorage.getItem("language") || "english"
  );

  const setLanguage = (lang) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    document.documentElement.lang = lang === "marathi" ? "mr" : "en";
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

export const useTranslation = () => {
  const { language, setLanguage } = useLanguage();

  const t = (key) =>
    translations[language]?.[key] ?? translations.english[key] ?? key;

  return { t, language, setLanguage };
};
