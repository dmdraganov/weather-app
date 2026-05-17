import { useQuery } from '@tanstack/react-query';
import { useLocationStore } from '../../location/models/store';
import { getWeather } from '../api/weather.api';
import { useLanguage } from '../../localization/hooks/useLanguage';

export const useWeather = () => {
  const { currentLocation } = useLocationStore();
  const [language] = useLanguage();

  return useQuery({
    queryKey: ['weather', currentLocation?.id, language],
    queryFn: () => getWeather(currentLocation!.name, language),
    enabled: !!currentLocation,
  });
};
