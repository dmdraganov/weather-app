import type { Coordinates } from '../../../shared/model/coordinates';
import type { WeatherData } from '../models';
import { request } from '../../../shared/lib/request';
import { buildWeatherApiUrl } from './utils/build-url';
import { WeatherResponseSchema } from './dtos/weather-response.dto';
import { mapWeatherResponse } from './mappers/weather.mapper';
import type { Language } from '../../../shared/i18n/language';

export const getWeather = async (
  location: string | Coordinates,
  language: Language
): Promise<WeatherData> => {
  const url = buildWeatherApiUrl('forecast', location, language);
  const data = await request(url);
  const validated = WeatherResponseSchema.parse(data);
  return mapWeatherResponse(validated);
};
