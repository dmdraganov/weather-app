import { getEnv } from './get-env';

export const API_URLS = {
  weather: getEnv('VITE_APP_API_URL'),
  geocode: getEnv('VITE_GEOCODE_API_URL'),
  geosuggest: getEnv('VITE_GEOSUGGEST_API_URL'),
  maps: getEnv('VITE_MAPS_API_KEY'),
} as const;
