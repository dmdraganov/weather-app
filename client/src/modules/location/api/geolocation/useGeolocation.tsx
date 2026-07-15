import { useCallback, useState } from 'react';
import type { Coordinates } from '../../../../shared/model/coordinates';
import { requestGeolocation } from './geolocation.api';

export const useGeolocation = () => {
  const [position, setPosition] = useState<Coordinates | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestPosition = useCallback(async (): Promise<Coordinates | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const coordinates = await requestGeolocation();
      setPosition(coordinates);
      return coordinates;
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Unknown geolocation error');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { geolocationPos: position, error, isLoading, requestPosition };
};
