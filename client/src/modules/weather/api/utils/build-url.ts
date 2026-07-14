import { API_CONFIG } from '../../../../shared/config/api';
import { buildUrl } from '../../../../shared/lib/build-url';
import type { Coordinates } from '../../../../shared/model/coordinates';

type ApiType = 'current' | 'forecast';

export const buildWeatherApiUrl = (
  type: ApiType,
  query: string | Coordinates,
  language: string
): URL => {
  if (typeof query === 'object') {
    query = `${query.latitude}, ${query.longitude}`;
  }
  const searchParams: Record<string, string> = {
    q: query,
    lang: language,
  };
  if (type === 'forecast') searchParams.days = '7';

  return buildUrl(`${API_CONFIG.weather.url}/weather/${type}`, searchParams);
};
