import i18n, { type Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';

import sharedEn from '../../shared/i18n/en.json';
import sharedRu from '../../shared/i18n/ru.json';

import weatherEn from '../../modules/weather/i18n/en.json';
import weatherRu from '../../modules/weather/i18n/ru.json';

import locationEn from '../../modules/location/i18n/en.json';
import locationRu from '../../modules/location/i18n/ru.json';

import localizationEn from '../../modules/localization/i18n/en.json';
import localizationRu from '../../modules/localization/i18n/ru.json';

import themeEn from '../../modules/theme/i18n/en.json';
import themeRu from '../../modules/theme/i18n/ru.json';

import { I18N_NAMESPACES, LANGUAGES } from '../../shared/config/i18n';

const resources: Resource = {
  en: {
    [I18N_NAMESPACES.shared]: sharedEn,
    [I18N_NAMESPACES.location]: locationEn,
    [I18N_NAMESPACES.weather]: weatherEn,
    [I18N_NAMESPACES.localization]: localizationEn,
    [I18N_NAMESPACES.theme]: themeEn,
  },
  ru: {
    [I18N_NAMESPACES.shared]: sharedRu,
    [I18N_NAMESPACES.location]: locationRu,
    [I18N_NAMESPACES.weather]: weatherRu,
    [I18N_NAMESPACES.localization]: localizationRu,
    [I18N_NAMESPACES.theme]: themeRu,
  },
};

const initI18n = async () => {
  await i18n
    .use(I18nextBrowserLanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      load: 'languageOnly',
      nonExplicitSupportedLngs: true,
      supportedLngs: LANGUAGES,
      detection: {
        order: ['localStorage', 'navigator'],
        lookupLocalStorage: 'language',
        caches: ['localStorage'],
        convertDetectedLanguage: (lng) => lng.split('-')[0],
      },
      fallbackLng: 'ru',
      ns: Object.values(I18N_NAMESPACES),
      defaultNS: I18N_NAMESPACES.shared,
      interpolation: {
        escapeValue: false,
      },
    });
};

await initI18n();

export { i18n };
