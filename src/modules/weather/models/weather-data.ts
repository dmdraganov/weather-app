import type { CurrentWeather } from './current-weather';
import type { DailyWeather } from './forecast';

export interface WeatherData {
  current: CurrentWeather;
  daily: DailyWeather[];
}
