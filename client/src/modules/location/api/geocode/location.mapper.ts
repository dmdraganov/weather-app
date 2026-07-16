import type { Location } from '../../model/entities/location';
import type { LocationDto } from './geocode-location.dto';

export const mapLocation = (dto: LocationDto): Location => {
  return {
    id: dto.uri,
    name: dto.name,
    description: dto.description,
    coordinates: dto.Point.pos,
  };
};
