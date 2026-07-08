import { useQuery } from '@tanstack/react-query';
import type { Coordinates } from '../../../model/entities/coordinates';
import { reverseGeocodeLocation } from '../geocode.api';
import { useState } from 'react';
import { useLanguage } from '../../../../localization/hooks/useLanguage';

export const useReverseGeocodeLocation = (
  initialCoordinates?: Coordinates | null
) => {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(
    initialCoordinates ?? null
  );
  const [language] = useLanguage();

  const queryResult = useQuery({
    queryKey: [
      'location-by-coordinates',
      coordinates?.latitude,
      coordinates?.longitude,
      language,
    ],
    queryFn: () => {
      if (!coordinates) throw new Error('Coordinates are not set');
      return reverseGeocodeLocation(coordinates, language);
    },
    enabled: coordinates !== null,
  });
  return { coordinates, setCoordinates, ...queryResult };
};
