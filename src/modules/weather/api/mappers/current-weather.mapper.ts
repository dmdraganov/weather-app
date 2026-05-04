import type { CurrentWeather } from '../../models';
import type { CurrentWeatherDto } from '../dtos/current-weather.dto';
import { mapWeatherCondition } from './weather-condition.mapper';

export const mapCurrentWeather = (dto: CurrentWeatherDto): CurrentWeather => ({
  temperature: { celsius: dto.temp_c },
  feelsLike: { celsius: dto.feelslike_c },
  condition: mapWeatherCondition(dto.condition, dto.is_day === 1),
  wind: { speedKph: dto.wind_kph },
  humidity: dto.humidity,
  uvIndex: dto.uv,
  cloudCover: dto.cloud,
  isDay: dto.is_day === 1,
});
