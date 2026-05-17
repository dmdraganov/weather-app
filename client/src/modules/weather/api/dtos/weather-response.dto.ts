import z from 'zod';
import { CurrentWeatherSchema } from './current-weather.dto';
import { ForecastSchema } from './forecast.dto';

export const WeatherResponseSchema = z.object({
  current: CurrentWeatherSchema,
  forecast: ForecastSchema,
});

export type WeatherResponseDto = z.infer<typeof WeatherResponseSchema>;
