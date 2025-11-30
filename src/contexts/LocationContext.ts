import { createContext } from 'react';
import type { LocationContextValue } from '../types/contexts';

export const LocationContext = createContext<LocationContextValue>({
  selectedLocation: null,
  setLocation: () => {},
  currentLocation: null,
});
