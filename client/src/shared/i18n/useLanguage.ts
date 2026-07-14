import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import type { Language } from './language';

export const useLanguage = () => {
  const { i18n } = useTranslation();
  const language = i18n.language as Language;

  const setLanguage = useCallback(
    (nextLanguage: Language) => {
      void i18n.changeLanguage(nextLanguage);
    },
    [i18n]
  );

  return [language, setLanguage] as const;
};
