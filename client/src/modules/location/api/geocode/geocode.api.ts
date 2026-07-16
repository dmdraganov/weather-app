import { request } from '../../../../shared/lib/request';
import type { Location } from '../../model/entities/location';
import { GeocodeLocationSchema } from './geocode-location.dto';
import { mapLocation } from './location.mapper';
import type { Language } from '../../../../shared/i18n/language';
import type { Coordinates } from '../../../../shared/model/coordinates';
import { API_CONFIG } from '../../../../shared/config/api';
import { buildUrl } from '../../../../shared/lib/build-url';

export type GeocodeBy = 'id' | 'address' | 'coordinates';

export interface GeocodeLocationOptions {
  geocode: string;
  geocodeBy: GeocodeBy;
  language: Language;
}

export const geocodeLocation = async ({
  geocode,
  geocodeBy,
  language,
}: GeocodeLocationOptions): Promise<Location> => {
  const apiUrl = buildUrl(API_CONFIG.geocode.url, {
    apikey: API_CONFIG.geocode.key,
    lang: language,
    format: 'json',
    results: 1,
    kind: 'locality',
  });

  apiUrl.searchParams.set(geocodeBy === 'id' ? 'uri' : 'geocode', geocode);

  const data = await request(apiUrl);
  const validated = GeocodeLocationSchema.parse(data);
  return mapLocation(validated);
};

export const reverseGeocodeLocation = async (
  coordinates: Coordinates,
  language: Language
): Promise<Location> => {
  return geocodeLocation({
    geocode: `${coordinates.longitude}, ${coordinates.latitude}`,
    language,
    geocodeBy: 'coordinates',
  });
};
