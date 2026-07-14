import type { HourlyWeather } from '../../models';
import {
  CANVAS_WIDTH,
  POINT_RADIUS,
  POINTS_DISTANCE,
  type ChartPointData,
} from './ForecastChart.model';
import { formatHourTime } from '../../../../shared/utils/format-time';
import type { Language } from '../../../../shared/i18n/language';
import type { TFunction } from 'i18next';

export const calculateChartData = (
  hourlyForecast: HourlyWeather[],
  canvasHeight: number,
  language: Language,
  t: TFunction
): ChartPointData[] => {
  const realTimeHour = new Date().getHours();

  const hourlyPoints = hourlyForecast
    .slice(realTimeHour, realTimeHour + 24)
    .map(({ time, temperature, condition, wind }, index) => ({
      time: index ? formatHourTime(time, language) : t('now'),
      temp: temperature.celsius,
      conditionIcon: condition.icon,
      windSpeed: wind.speedKph,
    }));

  if (!hourlyPoints.length || canvasHeight <= 0) return [];

  const temps = hourlyPoints.map(({ temp }) => temp);
  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);
  const tempDiff = maxTemp - minTemp;
  const areaHeight = canvasHeight - POINT_RADIUS * 2;

  return hourlyPoints.map((point, index, arr) => {
    const y =
      tempDiff === 0
        ? canvasHeight / 2
        : areaHeight * ((maxTemp - point.temp) / tempDiff) + POINT_RADIUS;
    const x = CANVAS_WIDTH * ((index + 1) / arr.length) - POINTS_DISTANCE / 2;

    return {
      ...point,
      x,
      y,
    };
  });
};
