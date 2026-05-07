import formatTime from '../../../../shared/utils/time-formatter';
import type { DailyWeather } from '../../models';
import type { DailyForecastDto } from '../dtos/forecast.dto';
import { mapHourlyWeather } from './hourly-weather.mapper';
import { mapWeatherCondition } from './weather-condition.mapper';

export const mapDailyWeather = (dto: DailyForecastDto): DailyWeather => ({
  date: new Date(dto.date_epoch * 1000),
  temperature: {
    min: { celsius: dto.day.mintemp_c },
    max: { celsius: dto.day.maxtemp_c },
  },
  wind: { speedKph: dto.day.maxwind_kph },
  precipitation: {
    rainChance: dto.day.daily_chance_of_rain,
    snowChance: dto.day.daily_chance_of_snow,
  },
  avgHumidity: dto.day.avghumidity,
  uvIndex: dto.day.uv,
  condition: mapWeatherCondition(dto.day.condition),
  astro: {
    sunrise: formatTime(dto.astro.sunrise),
    sunset: formatTime(dto.astro.sunset),
    moonPhase: dto.astro.moon_phase,
    moonIllumination: dto.astro.moon_illumination,
  },
  hourly: dto.hour.map(mapHourlyWeather),
});
