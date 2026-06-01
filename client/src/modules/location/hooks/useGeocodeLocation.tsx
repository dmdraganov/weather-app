import { useQuery } from '@tanstack/react-query';
import { geocodeLocation } from '../api/geocode/geocode.api';
import { useState } from 'react';
import { useLanguage } from '../../localization/hooks/useLanguage';

interface GeocodeSource {
  type: 'address' | 'locationId';
  value: string;
}

export const useGeocodeLocation = (initialAddress?: string) => {
  const [source, setSource] = useState<GeocodeSource | null>(
    initialAddress ? { type: 'address', value: initialAddress } : null
  );
  const [language] = useLanguage();

  const setAddress = (address: string) => {
    setSource({ type: 'address', value: address });
  };

  const setLocationId = (locationId: string) => {
    setSource({ type: 'locationId', value: locationId });
  };

  const queryResult = useQuery({
    queryKey: ['geocode-location', source, language],
    queryFn: () => {
      if (!source) {
        throw new Error('Query source is not set');
      }
      if (source.type === 'locationId') {
        return geocodeLocation({ locationId: source.value, language });
      }
      return geocodeLocation({ geocode: source.value, language });
    },
    enabled: !!source && source.value.length > 0,
  });

  const displayValue =
    source?.type === 'address' ? source.value : (queryResult.data?.name ?? '');

  return {
    displayValue,
    setAddress,
    setLocationId,
    ...queryResult,
  };
};
