import { request } from '../../../../shared/api/request';
import type { Location } from '../../models/location.model';
import { GeocodeLocationSchema } from './geocode-location.dto';
import { mapLocation } from './location.mapper';
import type { Language } from '../../../localization/localization.model';
import type { Coordinates } from '../../models/coordinates.model';

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
  const baseUrl = 'https://geocode-maps.yandex.ru/v1?';
  const params = new URLSearchParams({
    apikey: import.meta.env.VITE_YANDEX_API_KEY,
    lang: language,
    format: 'json',
    results: '1',
    kind: 'locality',
  });
  if (locationId) {
    params.append('locationId', locationId);
  } else if (geocode) {
    params.append('geocode', geocode);
  } else {
    throw new Error('Either geocode or locationId must be provided.');
  }
  const url = baseUrl + params.toString();
  const data = await request(url);

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
