import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import type { HourlyWeather } from '../models';
import {
  CANVAS_WIDTH,
  POINT_RADIUS,
  POINTS_DISTANCE,
  type ChartPointData,
} from '../models/hourly-chart';
import { formatHourTime } from '../../../shared/utils/time-formatter';
import { useLanguage } from '../../localization/hooks/useLanguage';

export const useChartData = () => {
  const [language] = useLanguage();
  const { t } = useTranslation('shared');
  const realTimeHour = new Date().getHours();

  const toChartData = useCallback(
    (
      hourlyForecast: HourlyWeather[],
      canvasHeight: number
    ): ChartPointData[] => {
      const points: ChartPointData[] = hourlyForecast
        .slice(realTimeHour, realTimeHour + 24)
        .map(({ time, temperature, condition, wind }, index) => ({
          time: index ? formatHourTime(time, language) : t('now'),
          temp: temperature.celsius,
          conditionIcon: condition.icon,
          windSpeed: wind.speedKph,
          x: 0,
          y: 0,
        }));

      const temps = points.map(({ temp }) => temp);
      const minTemp = Math.min(...temps);
      const maxTemp = Math.max(...temps);
      const maxDiff = maxTemp - minTemp;
      const areaHeight = canvasHeight - POINT_RADIUS * 2;

      points.forEach((point, index, arr) => {
        point.y =
          areaHeight * ((maxTemp - point.temp) / maxDiff) + POINT_RADIUS;
        point.x =
          CANVAS_WIDTH * ((index + 1) / arr.length) - POINTS_DISTANCE / 2;
      });

      return points;
    },
    [realTimeHour, t, language]
  );

  return toChartData;
};
