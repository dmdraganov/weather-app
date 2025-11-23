export type LocationContextValue = [
  Location | null,
  (location: Location | Coords) => void,
  Location | null,
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
