import type { Language } from '../../modules/localization/localization.model';

const formatUnit = (value: number, unit: string, locale: Language): string => {
  return new Intl.NumberFormat(locale, { style: 'unit', unit }).format(value);
};

export const formatKmPerHour = (kph: number, locale: Language): string => {
  return formatUnit(kph, 'kilometer-per-hour', locale);
};

export const formatTemperature = (
  celsius: number,
  locale: Language
): string => {
  return formatUnit(celsius, 'celsius', locale);
};
