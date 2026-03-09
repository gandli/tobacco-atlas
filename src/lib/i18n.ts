import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation files
import zhCNCommon from "../locales/zh-CN/common.json";
import zhCNDashboard from "../locales/zh-CN/dashboard.json";
import zhCNAuth from "../locales/zh-CN/auth.json";
import zhCNSubmit from "../locales/zh-CN/submit.json";
import zhCNChangelog from "../locales/zh-CN/changelog.json";
import zhCNNav from "../locales/zh-CN/nav.json";
import zhCNHome from "../locales/zh-CN/home.json";
import zhCNBrands from "../locales/zh-CN/brands.json";

import enUSCommon from "../locales/en-US/common.json";
import enUSDashboard from "../locales/en-US/dashboard.json";
import enUSAuth from "../locales/en-US/auth.json";
import enUSSubmit from "../locales/en-US/submit.json";
import enUSChangelog from "../locales/en-US/changelog.json";
import enUSNav from "../locales/en-US/nav.json";
import enUSHome from "../locales/en-US/home.json";
import enUSBrands from "../locales/en-US/brands.json";

const resources = {
  "zh-CN": {
    common: zhCNCommon,
    dashboard: zhCNDashboard,
    auth: zhCNAuth,
    submit: zhCNSubmit,
    changelog: zhCNChangelog,
    nav: zhCNNav,
    home: zhCNHome,
    brands: zhCNBrands,
  },
  "en-US": {
    common: enUSCommon,
    dashboard: enUSDashboard,
    auth: enUSAuth,
    submit: enUSSubmit,
    changelog: enUSChangelog,
    nav: enUSNav,
    home: enUSHome,
    brands: enUSBrands,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "zh-CN",
    defaultNS: "common",
    ns: [
      "common",
      "dashboard",
      "auth",
      "submit",
      "changelog",
      "nav",
      "home",
      "brands",
    ],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
      lookupLocalStorage: "i18nextLng",
    },
  });

export default i18n;
