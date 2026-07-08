import { useQuery } from '@tanstack/react-query';
import { useLocationStore } from '../../location/model/store/store';
import { getWeather } from './weather.api';
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
