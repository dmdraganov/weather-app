export interface Location {
  id: number;
  name: string;
  region?: string;
  country: string;
  coordinates: Coordinates;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}
