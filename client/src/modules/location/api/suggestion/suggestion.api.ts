import { request } from '../../../../shared/lib/request';
import type { Language } from '../../../localization/localization.model';
import type { LocationSuggestion } from '../../models/location-suggestion.model';
import { SuggestLocationsSchema } from './suggestion.dto';
import { mapSuggestion } from './suggestion.mapper';

export const suggestLocations = async (
  query: string,
  language: Language
): Promise<LocationSuggestion[] | null> => {
  const baseUrl = 'https://suggest-maps.yandex.ru/v1/suggest?';
  const params = new URLSearchParams({
    apikey: import.meta.env.VITE_GEOSUGGEST_API_KEY,
    text: query,
    lang: language,
    types: 'locality',
    highlight: '0',
    attrs: 'uri',
    results: '5',
  });
  const url = baseUrl + params.toString();
  const data = await request(url);
  const validated = await SuggestLocationsSchema.parse(data);
  if (!validated) return null;
  return validated.map(mapSuggestion);
};
