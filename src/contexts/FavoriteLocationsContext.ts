import { createContext } from 'react';
import type { FavoriteLocationsContextValue } from '../types/contexts';

export const FavoriteLocationsContext =
  createContext<FavoriteLocationsContextValue>([[], () => {}]);
