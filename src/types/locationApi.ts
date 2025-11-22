export type SelectedLocationContextValue = [
  Location | null,
  (location: Location | Coords) => void,
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
