import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import sharedEn from '../locales/en/shared.json';
import sharedRu from '../locales/ru/shared.json';
import locationEn from '../locales/en/location.json';
import locationRu from '../locales/ru/location.json';
import weatherEn from '../locales/en/weather.json';
import weatherRu from '../locales/ru/weather.json';
import settingsEn from '../locales/en/settings.json';
import settingsRu from '../locales/ru/settings.json';
import type { Language } from '../../modules/localization/localization.model';

const supportedLngs: Language[] = ['en', 'ru'];

const initI18n = async () => {
  await i18n
    .use(I18nextBrowserLanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        en: {
          shared: sharedEn,
          location: locationEn,
          weather: weatherEn,
          settings: settingsEn,
        },
        ru: {
          shared: sharedRu,
          location: locationRu,
          weather: weatherRu,
          settings: settingsRu,
        },
      },
      load: 'languageOnly',
      nonExplicitSupportedLngs: true,
      supportedLngs,
      detection: {
        order: ['localStorage', 'navigator'],
        lookupLocalStorage: 'language',
        caches: ['localStorage'],
        convertDetectedLanguage: (lng) => lng.split('-')[0],
      },
      fallbackLng: 'ru',
      ns: ['shared', 'location', 'weather', 'settings'],
      defaultNS: 'shared',
      debug: true,
      interpolation: {
        escapeValue: false,
      },
    });
};

await initI18n();

export { i18n };
