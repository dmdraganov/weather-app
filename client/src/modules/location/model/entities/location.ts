import type { Coordinates } from '../../../../shared/model/coordinates';

export interface Location {
  id: string;
  name: string;
  description: string;
  coordinates: Coordinates;
}
