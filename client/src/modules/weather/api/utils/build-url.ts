import { API_CONFIG } from '../../../../shared/config/api';
import { buildUrl } from '../../../../shared/lib/build-url';
import type { Coordinates } from '../../../location/model/entities/coordinates';

type ApiType = 'current' | 'forecast' | 'search' | 'astronomy';

export const buildWeatherApiUrl = (
  type: ApiType,
  query: string | Coordinates,
  language: string
): URL => {
  if (typeof query === 'object') {
    query = `${query.latitude}, ${query.longitude}`;
  }
  const searchParams = {
    q: query,
    days: '7',
    lang: language,
  };
  return buildUrl(`${API_CONFIG.weather.url}/weather/${type}`, searchParams);
};
