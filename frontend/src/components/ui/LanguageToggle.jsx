import { useTranslation } from "../../context/LanguageContext";

export default function LanguageToggle({ className = "" }) {
  const { language, setLanguage, t } = useTranslation();

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-sm text-gray-500 hidden sm:inline">{t("language")}:</span>
      <div className="flex rounded-xl border-2 border-primary/20 overflow-hidden bg-white">
        <button
          type="button"
          onClick={() => setLanguage("english")}
          className={`px-3 py-2 text-sm font-semibold transition-colors min-w-[72px] ${
            language === "english"
              ? "bg-primary text-white"
              : "text-gray-600 hover:bg-secondary"
          }`}
        >
          English
        </button>
        <button
          type="button"
          onClick={() => setLanguage("marathi")}
          className={`px-3 py-2 text-sm font-semibold transition-colors min-w-[72px] ${
            language === "marathi"
              ? "bg-primary text-white"
              : "text-gray-600 hover:bg-secondary"
          }`}
        >
          मराठी
        </button>
      </div>
    </div>
  );
}
