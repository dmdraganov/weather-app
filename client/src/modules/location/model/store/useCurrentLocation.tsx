import { useLocationStore } from './store';

export const useCurrentLocation = () => {
  const currentLocation = useLocationStore((state) => state.currentLocation);
  const setCurrentLocation = useLocationStore(
    (state) => state.setCurrentLocation
  );

  return [currentLocation, setCurrentLocation] as const;
};
