import type { Coordinates } from './coordinates';

export interface Location {
  id: string;
  name: string;
  description: string;
  coordinates: Coordinates;
}
