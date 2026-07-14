import { useSearchParams } from 'react-router-dom';
import { useReverseGeocodeLocation } from '../api/geocode/hooks/useReverseGeocodeLocation';
import { useCurrentLocation } from '../model/store/useCurrentLocation';
import { useEffect, useMemo } from 'react';
import {
  areSameCoordinates,
  canonicalizeLocationSearchParams,
  parseLocationSearchParams,
} from '../lib/location-url';

export const useSearchParamsLocation = () => {
  const [currentLocation, setCurrentLocation] = useCurrentLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchState = useMemo(
    () => parseLocationSearchParams(searchParams),
    [searchParams]
  );
  const coordinates =
    searchState.status === 'valid' ? searchState.coordinates : null;
  const { data, error, isPending } = useReverseGeocodeLocation(coordinates);

  useEffect(() => {
    if (!coordinates) return;

    const canonicalSearchParams = canonicalizeLocationSearchParams(
      searchParams,
      coordinates
    );
    if (canonicalSearchParams.toString() !== searchParams.toString()) {
      setSearchParams(canonicalSearchParams, { replace: true });
    }
  }, [coordinates, searchParams, setSearchParams]);

  useEffect(() => {
    if (data) setCurrentLocation(data);
  }, [data, setCurrentLocation]);

  const isCurrentLocationSynchronized =
    !!data && areSameCoordinates(currentLocation?.coordinates, data.coordinates);

  return {
    status: searchState.status,
    isLoading: isPending || (!error && !isCurrentLocationSynchronized),
    error,
  };
};
