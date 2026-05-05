import type { Coordinates } from './coordinates.model';

export interface Location {
  id: number;
  name: string;
  region?: string;
  country: string;
  coordinates: Coordinates;
}
