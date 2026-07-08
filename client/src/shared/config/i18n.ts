export const LANGUAGES = ['en', 'ru'] as const;

export const I18N_NAMESPACES = {
  shared: 'shared',
  location: 'location',
  weather: 'weather',
  localization: 'localization',
  theme: 'theme',
} as const;

export type I18nNamespace =
  (typeof I18N_NAMESPACES)[keyof typeof I18N_NAMESPACES];
