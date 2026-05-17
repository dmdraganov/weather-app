import z from 'zod';
import {
  WeatherBaseSchema,
  WeatherConditionSchema,
} from './weather-condition.dto';

export const HourlyWeatherSchema = WeatherBaseSchema.extend({
  time: z.string(),
  is_day: z.number().int().min(0).max(1),
});

const AstroSchema = z.object({
  sunrise: z.string(),
  sunset: z.string(),
  moon_phase: z.string(),
  moon_illumination: z.coerce.number(),
});

const DayStatsSchema = z.object({
  maxtemp_c: z.number(),
  mintemp_c: z.number(),
  maxwind_kph: z.number(),
  avghumidity: z.number(),
  daily_chance_of_rain: z.number(),
  daily_chance_of_snow: z.number(),
  condition: WeatherConditionSchema,
  uv: z.number(),
});

export const DailyForecastSchema = z.object({
  date_epoch: z.number(),
  astro: AstroSchema,
  day: DayStatsSchema,
  hour: HourlyWeatherSchema.array(),
});

export const ForecastSchema = z.object({
  forecastday: DailyForecastSchema.array(),
});

export type HourlyWeatherDto = z.infer<typeof HourlyWeatherSchema>;
export type DailyForecastDto = z.infer<typeof DailyForecastSchema>;
export type ForecastDto = z.infer<typeof ForecastSchema>;
