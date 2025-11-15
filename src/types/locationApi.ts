import type { Dispatch, SetStateAction } from 'react';

export type CurrentLocationContextValue = [
  Location | null,
  Dispatch<SetStateAction<Location | null>>,
  Dispatch<SetStateAction<Coords | null>>,
];

export type FavoriteLocationsContextValue = [
  Location[],
  React.Dispatch<React.SetStateAction<Location[]>>,
];

export interface Location {
  id: number;
  name: string;
  region?: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}

export type Coords = [number, number];
