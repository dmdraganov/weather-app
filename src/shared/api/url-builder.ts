import type { Coordinates } from '../../modules/location/models/coordinates.model';

type ApiType = 'current' | 'forecast' | 'search' | 'astronomy';

export const buildApiUrl = (
  type: ApiType,
  query: string | Coordinates,
  language = 'en'
): string => {
  if (typeof query === 'object') {
    query = `${query.latitude}, ${query.longitude}`;
  }
  return `http://api.weatherapi.com/v1/${type}.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${query}&days=7&lang=${language}`;
};
