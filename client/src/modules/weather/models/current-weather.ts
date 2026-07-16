import type { Temperature, Wind, WeatherCondition } from './shared';

export interface CurrentWeather {
  temperature: Temperature;
  feelsLike: Temperature;
  condition: WeatherCondition;
  wind: Wind;
  humidity: number;
  uvIndex: number;
  cloudCover: number;
  isDay: boolean;
}
