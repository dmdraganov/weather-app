import z from 'zod';

export const WeatherConditionSchema = z.object({
  text: z.string(),
  code: z.number(),
});

export const WeatherBaseSchema = z.object({
  temp_c: z.number(),
  condition: WeatherConditionSchema,
  wind_kph: z.number(),
});

export type WeatherConditionDto = z.infer<typeof WeatherConditionSchema>;
export type WeatherBaseDto = z.infer<typeof WeatherBaseSchema>;
