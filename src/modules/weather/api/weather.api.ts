import type { Coordinates } from '../../location/models/coordinates.model';
import type { WeatherData } from '../models';
import { request } from '../../../shared/api/request';
import { buildApiUrl } from '../../../shared/api/url-builder';
import { WeatherResponseSchema } from './dtos/weather-response.dto';
import { mapWeatherResponse } from './mappers/weather.mapper';

export const getWeather = async (
  location: string | Coordinates
): Promise<WeatherData> => {
  const url = buildApiUrl('forecast', location);
  const data = await request(url);
  const validated = WeatherResponseSchema.parse(data);
  return mapWeatherResponse(validated);
};
