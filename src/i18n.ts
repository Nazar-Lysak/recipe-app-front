import i18n from "i18next";
import backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(backend)
  .use(LanguageDetector)
  .use(initReactI18next)

  .init({
    lng: "en",
    fallbackLng: ["en", "ua"],
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
  });

export default i18n;
