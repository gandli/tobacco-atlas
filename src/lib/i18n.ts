import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import zhCNCommon from '../../public/locales/zh-CN/common.json';
import zhCNDashboard from '../../public/locales/zh-CN/dashboard.json';
import zhCNAuth from '../../public/locales/zh-CN/auth.json';
import zhCNSubmit from '../../public/locales/zh-CN/submit.json';
import zhCNChangelog from '../../public/locales/zh-CN/changelog.json';
import zhCNNav from '../../public/locales/zh-CN/nav.json';
import zhCNHome from '../../public/locales/zh-CN/home.json';
import zhCNBrands from '../../public/locales/zh-CN/brands.json';

import enUSCommon from '../../public/locales/en-US/common.json';
import enUSDashboard from '../../public/locales/en-US/dashboard.json';
import enUSAuth from '../../public/locales/en-US/auth.json';
import enUSSubmit from '../../public/locales/en-US/submit.json';
import enUSChangelog from '../../public/locales/en-US/changelog.json';
import enUSNav from '../../public/locales/en-US/nav.json';
import enUSHome from '../../public/locales/en-US/home.json';
import enUSBrands from '../../public/locales/en-US/brands.json';

const resources = {
  'zh-CN': {
    common: zhCNCommon,
    dashboard: zhCNDashboard,
    auth: zhCNAuth,
    submit: zhCNSubmit,
    changelog: zhCNChangelog,
    nav: zhCNNav,
    home: zhCNHome,
    brands: zhCNBrands,
  },
  'en-US': {
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
    fallbackLng: 'zh-CN',
    defaultNS: 'common',
    ns: ['common', 'dashboard', 'auth', 'submit', 'changelog', 'nav', 'home', 'brands'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
  });

export default i18n;