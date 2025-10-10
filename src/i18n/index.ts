import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enAuth from '@src/locales/en/auth.json';
import thAuth from '@src/locales/th/auth.json';
import enUser from '@src/locales/en/user.json';
import thUser from '@src/locales/th/user.json';
import enCommon from '@src/locales/en/common.json';
import thCommon from '@src/locales/th/common.json';
import enSupplier from '@src/locales/en/supplier.json';
import thSupplier from '@src/locales/th/supplier.json';
import enLead from '@src/locales/en/lead.json';
import thLead from '@src/locales/th/lead.json';

export const defaultNS = 'common';

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'th'],
    ns: ['auth', 'user', 'common', 'supplier', 'lead'],
    defaultNS,
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage'],
    },
    resources: {
      en: {
        auth: enAuth,
        user: enUser,
        common: enCommon,
        supplier: enSupplier,
        lead: enLead,
      },
      th: {
        auth: thAuth,
        user: thUser,
        common: thCommon,
        supplier: thSupplier,
        lead: thLead,
      },
    },
  });

export default i18n;
