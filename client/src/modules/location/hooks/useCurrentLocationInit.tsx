import { useEffect } from 'react';
import { useCurrentLocation } from './useCurrentLocation';
import { useGeolocation } from './useGeolocation';
import { useReverseGeocodeLocation } from './useReverseGeocodeLocation';

export const useCurrentLocationInit = (): void => {
  const [currentLocation, setCurrentLocation] = useCurrentLocation();
  const { data: geoCoordinates } = useGeolocation();
  const { setCoordinates, data: geolocationData } = useReverseGeocodeLocation();

  useEffect(() => {
    if (geoCoordinates && !currentLocation) setCoordinates(geoCoordinates);
  }, [geoCoordinates, currentLocation, setCoordinates]);

  useEffect(() => {
    if (geolocationData && !currentLocation) {
      setCurrentLocation(geolocationData);
    }
  }, [geolocationData, currentLocation, setCurrentLocation]);
};
