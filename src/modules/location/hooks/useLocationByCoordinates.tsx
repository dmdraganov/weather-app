import { useQuery, skipToken } from '@tanstack/react-query';
import type { Coordinates } from '../models/models';
import { getLocationByCoordinates } from '../api/location.api';

export const useLocationByCoordinates = (
  coordinates: Coordinates | typeof skipToken
) => {
  return useQuery({
    queryKey: [
      'location-by-coordinates',
      coordinates === skipToken ? 'skip' : coordinates.latitude,
      coordinates === skipToken ? 'skip' : coordinates.longitude,
    ],
    queryFn:
      coordinates === skipToken
        ? skipToken
        : () => getLocationByCoordinates(coordinates),
  });
};
