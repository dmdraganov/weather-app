import z from 'zod';

export const LocationSchema = z.object({
  name: z.string(),
  description: z.string(),
  Point: z.object({
    pos: z.string().transform((str) => {
      const [longitude, latitude] = str.split(' ').map(Number);
      return { latitude, longitude };
    }),
  }),
  uri: z.string(),
});

export const GeocodeLocationSchema = z
  .object({
    response: z.object({
      GeoObjectCollection: z.object({
        featureMember: z.array(
          z.object({
            GeoObject: LocationSchema,
          })
        ),
      }),
    }),
  })
  .transform(
    (data) => data.response.GeoObjectCollection.featureMember[0].GeoObject
  );

export type LocationDto = z.infer<typeof LocationSchema>;
export type GeocodeLocationDto = z.infer<typeof GeocodeLocationSchema>;
