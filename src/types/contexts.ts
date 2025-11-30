import type { Dispatch, SetStateAction } from 'react';
import type { Coords, Location } from './locationApi';

export type LocationContextValue = {
  selectedLocation: Location | null;
  setLocation: (location: Location | Coords) => void;
  currentLocation: Location | null;
};

export type FavoriteLocationsContextValue = [
  Location[],
  Dispatch<SetStateAction<Location[]>>,
];

export type ThemeContextValue = [Theme, Dispatch<SetStateAction<Theme>>];

export type Theme = 'light' | 'dark' | 'system';
