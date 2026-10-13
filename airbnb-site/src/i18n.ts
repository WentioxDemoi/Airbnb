import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { BASE } from "./config";

// Pour ajouter une langue : une ligne ici, un drapeau dans Flag.tsx,
// et un fichier public/locales/<code>/translation.json.
export const LANGUAGES = [
  { code: "fr", label: "Français" },
  { code: "en", label: "English" },
  { code: "it", label: "Italiano" },
  { code: "es", label: "Español" },
  { code: "de", label: "Deutsch" },
] as const;

export type LangCode = (typeof LANGUAGES)[number]["code"];

void i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: LANGUAGES.map((l) => l.code),
    nonExplicitSupportedLngs: true, // en-GB, fr-CA… → en, fr
    load: "languageOnly",
    fallbackLng: "en",
    backend: { loadPath: `${BASE}locales/{{lng}}/translation.json` },
    detection: { order: ["localStorage", "navigator"], caches: ["localStorage"] },
    interpolation: { escapeValue: false },
  });

i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
});

export default i18n;
