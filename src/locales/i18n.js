import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./en/en.json";
import translationAR from "./ar/ar.json";

const langFromLocalStorage =
  localStorage.getItem("lang") === "ar" ? "ar" : "en";

const resources = {
  en: {
    translation: translationEN,
  },
  ar: {
    translation: translationAR,
  },
};

i18n.use(initReactI18next).init({
  fallbackLng: langFromLocalStorage || "en",
  debug: false,
  resources,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
