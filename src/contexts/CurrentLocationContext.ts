import { createContext } from 'react';
import type { CurrentLocationContextValue } from '../types/locationApi';

export const CurrentLocationContext =
  createContext<CurrentLocationContextValue>([null, () => {}, () => {}]);
