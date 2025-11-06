import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

export const defaultNS = 'common';

void i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'th'],
    ns: ['auth', 'user', 'common', 'supplier', 'lead', 'contact-us', 'role'],
    defaultNS,
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage'],
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
      // Cache translations for 1 hour in production
      requestOptions: {
        cache: 'default',
      },
    },
    // Load translations asynchronously
    load: 'languageOnly',
    // Preload languages on init
    preload: ['en', 'th'],
  });

export default i18n;
