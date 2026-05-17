import type { IconName } from '../../../shared/ui/Icon/Icon';

export interface ChartPointData {
  time: string;
  temp: number;
  conditionIcon: IconName;
  windSpeed: number;
  x: number;
  y: number;
}

export const POINTS_DISTANCE = 130;
export const CANVAS_WIDTH = 25 * POINTS_DISTANCE;
export const POINT_RADIUS = 3;
