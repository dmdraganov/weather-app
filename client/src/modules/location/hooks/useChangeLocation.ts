import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrentLocation } from '../model/store/useCurrentLocation';
import type { Location } from '../model/entities/location';
import { mapCoordinatesToSearch } from '../lib/location-url';
import { ROUTES } from '../../../shared/config/routes';

interface ChangeCurrentLocationOptions {
  syncUrl?: boolean;
}

export const useChangeCurrentLocation = ({
  syncUrl = false,
}: ChangeCurrentLocationOptions = {}) => {
  const [, setCurrentLocation] = useCurrentLocation();
  const navigate = useNavigate();

  return useCallback(
    (location: Location) => {
      setCurrentLocation(location);
      if (syncUrl) {
        void navigate({
          pathname: ROUTES.home,
          search: mapCoordinatesToSearch(location.coordinates),
        });
      }
    },
    [navigate, setCurrentLocation, syncUrl]
  );
};
