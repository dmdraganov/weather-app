import { request } from '../../../shared/api/request';
import { buildApiUrl } from '../../../shared/api/url-builder';
import type { Coordinates, Location } from '../models/models';
import { LocationSchema } from './location.dto';
import { mapLocation } from './location.mapper';

export const getLocations = async (query: string): Promise<Location[]> => {
  const url = buildApiUrl('search', query);
  const data = await request(url);
  const validated = LocationSchema.array().parse(data);
  return validated.map(mapLocation);
};

export const getLocationByCoordinates = async (
  coordinates: Coordinates
): Promise<Location> => {
  const query = `${coordinates.latitude},${coordinates.longitude}`;
  const url = buildApiUrl('search', query);
  const data = await request(url);
  const [validated] = LocationSchema.array().parse(data);
  return mapLocation(validated);
};
