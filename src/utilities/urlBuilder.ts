import type { Coords } from '../types/locationApi';

const getUrl = (
  api: string,
  location: string | Coords,
  language = 'en'
): string => {
  return `http://api.weatherapi.com/v1/${api}.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${location}&days=7&lang=${language}`;
};
export default getUrl;
