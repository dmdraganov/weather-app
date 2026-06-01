import z from 'zod';

const titleSchema = z.object({
  text: z.string(),
  hl: z.array(
    z.object({
      begin: z.number(),
      end: z.number(),
    })
  ),
});

const SuggestionSchema = z.object({
  title: titleSchema,
  subtitle: titleSchema,
  tags: z.array(z.string()),
  uri: z.string(),
});

export const SuggestLocationsSchema = z
  .object({
    results: z.array(SuggestionSchema),
  })
  .transform((data) => data.results);

export type SuggestionDto = z.infer<typeof SuggestionSchema>;

export type SuggestLocationsDto = z.infer<typeof SuggestLocationsSchema>;
