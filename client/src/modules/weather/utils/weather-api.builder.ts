import type { Coordinates } from '../../location/models/coordinates.model';

type ApiType = 'current' | 'forecast' | 'search' | 'astronomy';

export const buildWeatherApiUrl = (
  type: ApiType,
  query: string | Coordinates,
  language: string
): string => {
  if (typeof query === 'object') {
    query = `${query.latitude}, ${query.longitude}`;
  }
  const params = new URLSearchParams({
    q: query,
    days: '7',
    lang: language,
  });
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
  return `${baseUrl}/weather/${type}?${params.toString()}`;
};
