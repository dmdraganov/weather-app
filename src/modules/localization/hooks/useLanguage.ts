import { useTranslation } from 'react-i18next';
import type { Language } from '../localization.model';

export const useLanguage = () => {
  const { i18n } = useTranslation();

  const language = i18n.language as Language;

  const setLanguage = (language: Language) => {
    void i18n.changeLanguage(language);
  };

  return [language, setLanguage] as const;
};
