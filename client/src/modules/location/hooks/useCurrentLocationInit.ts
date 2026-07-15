import { useCallback, useEffect, useState } from 'react';
import type { Coordinates } from '../../../shared/model/coordinates';
import { useCurrentLocation } from '../model/store/useCurrentLocation';
import { useGeolocation } from '../api/geolocation/useGeolocation';
import { useReverseGeocodeLocation } from '../api/geocode/hooks/useReverseGeocodeLocation';

export const useCurrentLocationInit = () => {
  const [currentLocation, setCurrentLocation] = useCurrentLocation();
  const { error: geolocationError, isLoading: isGeolocationLoading, requestPosition } =
    useGeolocation();
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const {
    data: geolocationData,
    error: reverseGeocodingError,
    isLoading: isReverseGeocodingLoading,
  } = useReverseGeocodeLocation(currentLocation ? null : coordinates);

  const requestCurrentLocation = useCallback(async () => {
    if (currentLocation) return;

    const position = await requestPosition();
    if (position) setCoordinates(position);
  }, [currentLocation, requestPosition]);

  useEffect(() => {
    if (geolocationData && !currentLocation) {
      setCurrentLocation(geolocationData);
    }
  }, [geolocationData, currentLocation, setCurrentLocation]);

  return {
    requestCurrentLocation,
    isLoading: isGeolocationLoading || isReverseGeocodingLoading,
    error: geolocationError || reverseGeocodingError?.message || null,
  };
};
