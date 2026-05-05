import { request } from '../../../shared/api/request';
import { buildApiUrl } from '../../../shared/api/url-builder';
import type { Coordinates } from '../models/coordinates.model';
import type { Location } from '../models/location.model';
import { LocationSchema, type LocationDto } from './location.dto';
import { mapLocation } from './location.mapper';

export const findLocationsByQuery = async (
  query: string
): Promise<Location[]> => {
  const url = buildApiUrl('search', query);
  const data = await request(url);
  const validated = LocationSchema.array().parse(data);
  return validated.map(mapLocation);
};

export const findLocationByCoordinates = async (
  coordinates: Coordinates
): Promise<Location> => {
  const url = buildApiUrl('search', coordinates);
  const data = await request(url);
  const [validated] = LocationSchema.array().parse(data);
  return mapLocation(validated);
};
