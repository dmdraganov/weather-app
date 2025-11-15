import { createContext } from 'react';
import type { FavoriteLocationsContextValue } from '../types/locationApi';

export const FavoriteLocationsContext =
  createContext<FavoriteLocationsContextValue>([[], () => {}]);
