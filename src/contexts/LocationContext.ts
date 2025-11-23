import { createContext } from 'react';
import type { LocationContextValue } from '../types/locationApi';

export const LocationContext = createContext<LocationContextValue>([
  null,
  () => {},
  null,
]);
