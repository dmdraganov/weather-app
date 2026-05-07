import { useEffect } from 'react';
import { useCurrentLocation } from './useCurrentLocation';
import { useGeolocation } from './useGeolocation';
import { useLocationByCoordinates } from './useLocationByCoordinates';

export const useCurrentLocationInit = (): void => {
  const [currentLocation, setCurrentLocation] = useCurrentLocation();
  const { data: geoCoordinates } = useGeolocation();
  const { setCoordinates, data: geolocationData } = useLocationByCoordinates();

  useEffect(() => {
    if (geoCoordinates && !currentLocation) setCoordinates(geoCoordinates);
  }, [geoCoordinates, currentLocation]);

  useEffect(() => {
    if (geolocationData && !currentLocation) {
      setCurrentLocation(geolocationData);
    }
  }, [geolocationData, currentLocation]);
};
