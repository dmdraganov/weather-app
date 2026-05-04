type ApiType = 'current' | 'forecast' | 'search' | 'astronomy';

export const buildApiUrl = (
  type: ApiType,
  query: string,
  language = 'en'
): string => {
  return `http://api.weatherapi.com/v1/${type}.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${query}&days=7&lang=${language}`;
};
