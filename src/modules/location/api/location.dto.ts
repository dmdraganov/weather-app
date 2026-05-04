import z from 'zod';

export const LocationSchema = z.object({
  id: z.number(),
  name: z.string(),
  region: z.string().optional(),
  country: z.string(),
  lat: z.number(),
  lon: z.number(),
});

export type LocationDto = z.infer<typeof LocationSchema>;
