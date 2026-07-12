import { getEnv } from './get-env';

export const API_CONFIG = {
  weather: {
    url: getEnv('VITE_APP_API_URL'),
  },
  geocode: {
    url: getEnv('VITE_GEOCODE_API_URL'),
    key: getEnv('VITE_GEOCODE_API_KEY'),
  },
  geosuggest: {
    url: getEnv('VITE_GEOSUGGEST_API_URL'),
    key: getEnv('VITE_GEOSUGGEST_API_KEY'),
  },
  maps: {
    key: getEnv('VITE_MAPS_API_KEY'),
  },
} as const;
