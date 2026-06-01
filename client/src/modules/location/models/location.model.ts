import type { Coordinates } from './coordinates.model';

export interface Location {
  id: string;
  name: string;
  description: string;
  coordinates: Coordinates;
}
