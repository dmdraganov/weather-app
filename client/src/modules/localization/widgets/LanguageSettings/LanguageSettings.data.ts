import type { Language } from '../../localization.model';

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
