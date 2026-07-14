import { useMutation, useQuery } from '@tanstack/react-query';
import { geocodeLocation, type GeocodeBy } from '../geocode.api';
import { useState } from 'react';
import { useLanguage } from '../../../../../shared/i18n/useLanguage';

const useGeocodeLocation = (geocodeBy: GeocodeBy, geocode: string) => {
  const [language] = useLanguage();

  return useQuery({
    queryKey: ['geocode-location', geocode, language],
    queryFn: () => geocodeLocation({ geocode, geocodeBy, language }),
    staleTime: Infinity,
    enabled: geocode.length > 0,
  });
};

export const useGeocodeLocationByAddress = (initialAddress?: string) => {
  const [address, setAddress] = useState<string>(initialAddress ?? '');
  const queryResult = useGeocodeLocation('address', address);

  return {
    address,
    setAddress,
    ...queryResult,
  };
};

export const useGeocodeLocationById = () => {
  const [language] = useLanguage();

  return useMutation({
    mutationKey: ['geocode-location-by-id', language],
    mutationFn: (locationId: string) =>
      geocodeLocation({
        geocode: locationId,
        geocodeBy: 'id',
        language,
      }),
  });
};
