import { IconName } from '../../../../shared/ui/Icon/icon-map';
import { formatKmPerHour } from '../../../../shared/utils/format-units';
import type { Language } from '../../../../shared/i18n/language';
import type { DailyWeather } from '../../models';

interface ForecastMetricItem {
  iconName: IconName;
  titleKey: string;
  value: string | number;
}

export const mapForecastMetrics = (
  dailyWeather: DailyWeather,
  language: Language
): ForecastMetricItem[] => [
  {
    iconName: IconName.Thermometer,
    titleKey: 'temp',
    value: `${dailyWeather.temperature.min.celsius}° / ${dailyWeather.temperature.max.celsius}°`,
  },
  {
    iconName: IconName.Wind,
    titleKey: 'wind',
    value: formatKmPerHour(dailyWeather.wind.speedKph, language),
  },
  {
    iconName: IconName.Blob,
    titleKey: 'chance_of_rain',
    value: dailyWeather.precipitation.rainChance + '%',
  },
  {
    iconName: IconName.Blob,
    titleKey: 'avg_humidity',
    value: dailyWeather.avgHumidity + '%',
  },
  {
    iconName: IconName.Sunny,
    titleKey: 'uv_index',
    value: dailyWeather.uvIndex,
  },
];
