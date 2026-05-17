import type { Coordinates } from '../../modules/location/models/coordinates.model';

type ApiType = 'current' | 'forecast' | 'search' | 'astronomy';

export const buildApiUrl = (
  type: ApiType,
  query: string | Coordinates,
  language: string
): string => {
  if (typeof query === 'object') {
    query = `${query.latitude}, ${query.longitude}`;
  }
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
  return `${baseUrl}/weather/${type}?q=${query}&days=7&lang=${language}`;
};
