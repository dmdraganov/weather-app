import { useState, useEffect } from 'react';
import type { Coordinates } from '../models/coordinates.model';
import { requestGeolocation } from '../api/geolocation.api';

export const useGeolocation = () => {
  const [position, setPosition] = useState<Coordinates | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void requestGeolocation()
      .then(setPosition)
      .catch((e: unknown) => {
        setError(e instanceof Error ? e.message : 'Unknown geolocation error');
      })
      .finally(() => setIsLoading(false));
  }, []);

  return { data: position, error, isLoading };
};
