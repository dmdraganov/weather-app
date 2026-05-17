import type { HourlyWeather } from '../../models';
import type { HourlyWeatherDto } from '../dtos/forecast.dto';
import { mapWeatherCondition } from './weather-condition.mapper';

export const mapHourlyWeather = (dto: HourlyWeatherDto): HourlyWeather => {
  const isDay = dto.is_day === 1;
  return {
    time: new Date(dto.time),
    temperature: { celsius: dto.temp_c },
    condition: mapWeatherCondition(dto.condition, isDay),
    wind: { speedKph: dto.wind_kph },
    isDay,
  };
};
