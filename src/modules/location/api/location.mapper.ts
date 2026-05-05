import type { Location } from '../models/location.model';
import type { LocationDto } from './location.dto';

export const mapLocation = (dto: LocationDto): Location => {
  return {
    id: dto.id,
    name: dto.name,
    region: dto.region,
    country: dto.country,
    coordinates: { latitude: dto.lat, longitude: dto.lon },
  };
};
