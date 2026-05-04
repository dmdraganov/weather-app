import type { WeatherConditionDto } from '../dtos/weather-condition.dto';
import { mapCodeToIcon } from './icon.mapper';

export const mapWeatherCondition = (
  condition: WeatherConditionDto,
  isDay: boolean = true
) => ({
  text: condition.text,
  icon: mapCodeToIcon(condition.code, isDay),
});
