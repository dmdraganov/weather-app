import type { Language } from '../localization.model';

const mapLocale: Record<Language, string> = {
  en: 'en_US',
  ru: 'ru_RU',
};

export const mapLanguageToLocale = (language: Language) => {
  return mapLocale[language];
};
