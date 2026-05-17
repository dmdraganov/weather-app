import type {
  Temperature,
  Wind,
  Precipitation,
  WeatherCondition,
} from './shared';

export interface AstroData {
  sunrise: string;
  sunset: string;
  moonPhase: string;
  moonIllumination: number;
}

export interface HourlyWeather {
  time: Date;
  temperature: Temperature;
  condition: WeatherCondition;
  wind: Wind;
  isDay: boolean;
}

export interface DailyWeather {
  date: Date;
  temperature: { min: Temperature; max: Temperature };
  wind: Wind;
  precipitation: Precipitation;
  avgHumidity: number;
  uvIndex: number;
  condition: WeatherCondition;
  astro: AstroData;
  hourly: HourlyWeather[];
}
