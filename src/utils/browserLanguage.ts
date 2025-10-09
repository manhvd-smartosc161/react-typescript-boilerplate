import { LANGUAGE_CODES } from '@src/constants';

export const getBrowserLanguage = (): string => {
  const browserLang = navigator.language || navigator.languages?.[0] || 'en';

  if (browserLang.toLowerCase().startsWith('th')) {
    return LANGUAGE_CODES.TH;
  }

  return LANGUAGE_CODES.EN;
};

export const isThaiLanguage = (): boolean => {
  return getBrowserLanguage() === LANGUAGE_CODES.TH;
};
