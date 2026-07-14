import { useEffect } from 'react';
import { useCurrentLocation } from '../model/store/useCurrentLocation';
import { useGeolocation } from '../api/geolocation/useGeolocation';
import { useReverseGeocodeLocation } from '../api/geocode/hooks/useReverseGeocodeLocation';

export const useCurrentLocationInit = (): void => {
  const [currentLocation, setCurrentLocation] = useCurrentLocation();
  const { geolocationPos } = useGeolocation();
  const coordinates = currentLocation ? null : geolocationPos;
  const { data: geolocationData } = useReverseGeocodeLocation(coordinates);

  useEffect(() => {
    if (geolocationData && !currentLocation) {
      setCurrentLocation(geolocationData);
    }
  }, [geolocationData, currentLocation, setCurrentLocation]);
};
