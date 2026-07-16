import { useQuery } from '@tanstack/react-query';
import { getWeather } from './weather.api';
import { useLanguage } from '../../../shared/i18n/useLanguage';
import type { Coordinates } from '../../../shared/model/coordinates';

export const useWeather = (coordinates: Coordinates | null) => {
  const [language] = useLanguage();

  return useQuery({
    queryKey: [
      'weather',
      coordinates?.latitude,
      coordinates?.longitude,
      language,
    ],
    queryFn: () => {
      if (!coordinates) throw new Error('Coordinates are not set');
      return getWeather(coordinates, language);
    },
    enabled: coordinates !== null,
    staleTime: 5 * 60 * 1000,
  });
};
