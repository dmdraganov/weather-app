import type { Coordinates } from '../models/coordinates.model';

export const buildYandexApiUrl = (
  geocode: Coordinates | string,
  language: string
): string => {
  const baseUrl = 'https://geocode-maps.yandex.ru/v1';

  if (typeof geocode === 'object') {
    geocode = `${geocode.longitude}, ${geocode.latitude}`;
  }

  const params = new URLSearchParams({
    apikey: import.meta.env.VITE_GEOSUGGEST_API_KEY,
    geocode,
    lang: language,
    format: 'json',
  });

  return `${baseUrl}?${params.toString()}`;
};
