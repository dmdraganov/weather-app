import z from 'zod';
import { WeatherBaseSchema } from './weather-condition.dto';

export const CurrentWeatherSchema = WeatherBaseSchema.extend({
  is_day: z.number().int().min(0).max(1),
  cloud: z.number(),
  feelslike_c: z.number(),
  humidity: z.number(),
  uv: z.number(),
});

export type CurrentWeatherDto = z.infer<typeof CurrentWeatherSchema>;
