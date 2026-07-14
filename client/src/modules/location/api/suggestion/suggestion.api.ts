import { API_CONFIG } from '../../../../shared/config/api';
import { buildUrl } from '../../../../shared/lib/build-url';
import { request } from '../../../../shared/lib/request';
import type { Language } from '../../../../shared/i18n/language';
import type { LocationSuggestion } from '../../model/entities/location-suggestion';
import { SuggestLocationsSchema } from './suggestion.dto';
import { mapSuggestion } from './suggestion.mapper';

export const suggestLocations = async (
  query: string,
  language: Language
): Promise<LocationSuggestion[]> => {
  const apiUrl = buildUrl(API_CONFIG.geosuggest.url, {
    apikey: API_CONFIG.geosuggest.key,
    text: query,
    lang: language,
    types: 'locality',
    highlight: 0,
    attrs: 'uri',
    results: 5,
  });
  const data = await request(apiUrl);
  const validated = SuggestLocationsSchema.parse(data);
  return validated.results.map(mapSuggestion);
};
