export interface ChartPointData {
  time: string;
  temp: number;
  conditionIcon: string;
  windSpeed: number;
  x: number;
  y: number;
}

export const POINTS_DISTANCE = 130;
export const CANVAS_WIDTH = 25 * POINTS_DISTANCE;
export const POINT_RADIUS = 3;
