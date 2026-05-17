import type { WeatherData } from '../../models';
import type { WeatherResponseDto } from '../dtos/weather-response.dto';
import { mapCurrentWeather } from './current-weather.mapper';
import { mapDailyWeather } from './daily-weather.mapper';

export const mapWeatherResponse = (dto: WeatherResponseDto): WeatherData => ({
  current: mapCurrentWeather(dto.current),
  daily: dto.forecast.forecastday.map(mapDailyWeather),
});
