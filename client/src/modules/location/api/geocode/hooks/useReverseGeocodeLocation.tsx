import { useMutation, useQuery } from '@tanstack/react-query';
import type { Coordinates } from '../../../../../shared/model/coordinates';
import { reverseGeocodeLocation } from '../geocode.api';
import { useLanguage } from '../../../../../shared/i18n/useLanguage';

export const useReverseGeocodeLocation = (coordinates: Coordinates | null) => {
  const [language] = useLanguage();

  return useQuery({
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
};

export const useReverseGeocodeLocationMutation = () => {
  const [language] = useLanguage();

  return useMutation({
    mutationKey: ['reverse-geocode-location', language],
    mutationFn: (coordinates: Coordinates) =>
      reverseGeocodeLocation(coordinates, language),
  });
};
