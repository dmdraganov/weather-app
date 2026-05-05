import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { skipToken, useQueryClient } from '@tanstack/react-query';
import { useLocationStore } from '../models/store';
import { useGeolocation } from './useGeolocation';
import { useLocationByCoordinates } from './useLocationByCoordinates';
import { findLocationByCoordinates } from '../api/location.api';
import type { Coordinates } from '../models/coordinates.model';
import type { Location } from '../models/location.model';

export const useCurrentLocation = () => {
  const { currentLocation, setCurrentLocation } = useLocationStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: geoCoords, isLoading: geoLoading } = useGeolocation();

  const { data: geolocationData } = useLocationByCoordinates(
    !currentLocation ? (geoCoords ?? skipToken) : skipToken
  );

  useEffect(() => {
    if (geolocationData && !currentLocation) {
      setCurrentLocation(geolocationData);
    }
  }, [geolocationData, currentLocation, setCurrentLocation]);

  useEffect(() => {
    if (!currentLocation && !geoLoading && !geoCoords) {
      void navigate('/location');
    }
  }, [currentLocation, geoLoading, geoCoords, navigate]);

  const setLocation = async (location: Location | Coordinates) => {
    if ('id' in location) {
      setCurrentLocation(location);
    } else {
      const data = await queryClient.fetchQuery({
        queryKey: [
          'location-by-coordinates',
          location.latitude,
          location.longitude,
        ],
        queryFn: () => findLocationByCoordinates(location),
      });
      setCurrentLocation(data);
    }
  };

  return {
    currentLocation,
    setCurrentLocation: setLocation,
  };
};
