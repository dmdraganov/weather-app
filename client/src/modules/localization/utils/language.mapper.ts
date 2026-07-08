import type { Language } from '../localization.model';

const localeMap: Record<Language, string> = {
  en: 'en_US',
  ru: 'ru_RU',
};

export const mapLanguageToLocale = (language: Language) => {
  return localeMap[language];
};
