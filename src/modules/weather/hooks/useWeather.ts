import { useQuery } from '@tanstack/react-query';
import { useLocationStore } from '../../location/models/store';
import { getWeather } from '../api/weather.api';

export const useWeather = () => {
  const { currentLocation } = useLocationStore();

  return useQuery({
    queryKey: ['weather', currentLocation?.id],
    queryFn: () => getWeather(currentLocation!.name),
    enabled: !!currentLocation,
  });
};
