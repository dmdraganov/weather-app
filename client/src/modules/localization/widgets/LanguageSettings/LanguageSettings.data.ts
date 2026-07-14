import type { Language } from '../../../../shared/i18n/language';

interface LanguageSetting {
  value: Language;
  labelKey: string;
}

export const LANGUAGE_SETTINGS: LanguageSetting[] = [
  {
    value: 'en',
    labelKey: 'english',
  },
  {
    value: 'ru',
    labelKey: 'russian',
  },
] as const;
