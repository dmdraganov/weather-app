import { useEffect } from 'react';
import { useCurrentLocation } from '../model/store/useCurrentLocation';
import { useGeolocation } from '../api/geolocation/useGeolocation';
import { useReverseGeocodeLocation } from '../api/geocode/hooks/useReverseGeocodeLocation';

export const useCurrentLocationInit = (): void => {
  const [currentLocation, setCurrentLocation] = useCurrentLocation();
  const { geolocationPos } = useGeolocation();
  const { setCoordinates, data: geolocationData } = useReverseGeocodeLocation();

  useEffect(() => {
    if (geolocationPos && !currentLocation) setCoordinates(geolocationPos);
  }, [geolocationPos, currentLocation, setCoordinates]);

  useEffect(() => {
    if (geolocationData && !currentLocation) {
      setCurrentLocation(geolocationData);
    }
  }, [geolocationData, currentLocation, setCurrentLocation]);
};
