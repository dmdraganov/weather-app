import type { Coordinates } from '../../location/models/coordinates.model';
import type { WeatherData } from '../models';
import { request } from '../../../shared/api/request';
import { buildWeatherApiUrl } from '../utils/weather-api.builder';
import { WeatherResponseSchema } from './dtos/weather-response.dto';
import { mapWeatherResponse } from './mappers/weather.mapper';
import type { Language } from '../../localization/localization.model';

export const getWeather = async (
  location: string | Coordinates,
  language: Language
): Promise<WeatherData> => {
  const url = buildWeatherApiUrl('forecast', location, language);
  const data = await request(url);
  const validated = WeatherResponseSchema.parse(data);
  return mapWeatherResponse(validated);
};
