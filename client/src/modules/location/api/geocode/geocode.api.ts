import { request } from '../../../../shared/lib/request';
import type { Location } from '../../model/entities/location';
import { GeocodeLocationSchema } from './geocode-location.dto';
import { mapLocation } from './location.mapper';
import type { Language } from '../../../localization/localization.model';
import type { Coordinates } from '../../model/entities/coordinates';
import { API_URLS } from '../../../../shared/config/api';
import { getEnv } from '../../../../shared/config/get-env';
import { buildUrl } from '../../../../shared/lib/build-url';

type GeocodeLocationOptions = {
  language: Language;
} & (
  | { geocode: string; locationId?: never }
  | { geocode?: never; locationId: string }
);

export const geocodeLocation = async ({
  geocode,
  locationId,
  language,
}: GeocodeLocationOptions): Promise<Location> => {
  const apiUrl = buildUrl(API_URLS.geocode, {
    apikey: getEnv('VITE_YANDEX_API_KEY'),
    lang: language,
    format: 'json',
    results: '1',
    kind: 'locality',
  });

  if (locationId) {
    apiUrl.searchParams.set('locationId', locationId);
  } else if (geocode) {
    apiUrl.searchParams.set('geocode', geocode);
  } else {
    throw new Error('Either geocode or locationId must be provided.');
  }
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
  });
};
