import type { FunctionComponent, SVGProps } from 'react';

// UI Icons
import ArrowIcon from '../../assets/icons/ui/arrow.svg?react';
import BlobIcon from '../../assets/icons/ui/blob.svg?react';
import ClockIcon from '../../assets/icons/ui/clock.svg?react';
import ExploreIcon from '../../assets/icons/ui/explore.svg?react';
import HeartIcon from '../../assets/icons/ui/heart.svg?react';
import LocationIcon from '../../assets/icons/ui/location.svg?react';
import SettingsIcon from '../../assets/icons/ui/settings.svg?react';

// Weather Icons
import ClearIcon from '../../assets/icons/weather/clear.svg?react';
import HeavyRainIcon from '../../assets/icons/weather/heavy-rain.svg?react';
import PartlyCloudyDayIcon from '../../assets/icons/weather/partly-cloudy-day.svg?react';
import PartlyCloudyNightIcon from '../../assets/icons/weather/partly-cloudy-night.svg?react';
import RainDayIcon from '../../assets/icons/weather/rain-day.svg?react';
import RainThunderIcon from '../../assets/icons/weather/rain-thunder.svg?react';
import SnowThunderNightIcon from '../../assets/icons/weather/snow-thunder-night.svg?react';
import SunnyIcon from '../../assets/icons/weather/sunny.svg?react';
import ThermometerIcon from '../../assets/icons/weather/thermometer.svg?react';
import ThunderNightIcon from '../../assets/icons/weather/thunder-night.svg?react';
import WindIcon from '../../assets/icons/weather/wind.svg?react';

export enum IconName {
  // UI
  Arrow = 'arrow',
  Blob = 'blob',
  Clock = 'clock',
  Explore = 'explore',
  Heart = 'heart',
  Location = 'location',
  Settings = 'settings',
  // Weather
  Clear = 'clear',
  HeavyRain = 'heavy-rain',
  PartlyCloudyDay = 'partly-cloudy-day',
  PartlyCloudyNight = 'partly-cloudy-night',
  RainDay = 'rain-day',
  RainThunder = 'rain-thunder',
  SnowThunderNight = 'snow-thunder-night',
  Sunny = 'sunny',
  Thermometer = 'thermometer',
  ThunderNight = 'thunder-night',
  Wind = 'wind',
}

type IconType = FunctionComponent<SVGProps<SVGSVGElement>>;

export const iconMap: Record<IconName, IconType> = {
  // UI
  [IconName.Arrow]: ArrowIcon,
  [IconName.Blob]: BlobIcon,
  [IconName.Clock]: ClockIcon,
  [IconName.Explore]: ExploreIcon,
  [IconName.Heart]: HeartIcon,
  [IconName.Location]: LocationIcon,
  [IconName.Settings]: SettingsIcon,
  // Weather
  [IconName.Clear]: ClearIcon,
  [IconName.HeavyRain]: HeavyRainIcon,
  [IconName.PartlyCloudyDay]: PartlyCloudyDayIcon,
  [IconName.PartlyCloudyNight]: PartlyCloudyNightIcon,
  [IconName.RainDay]: RainDayIcon,
  [IconName.RainThunder]: RainThunderIcon,
  [IconName.SnowThunderNight]: SnowThunderNightIcon,
  [IconName.Sunny]: SunnyIcon,
  [IconName.Thermometer]: ThermometerIcon,
  [IconName.ThunderNight]: ThunderNightIcon,
  [IconName.Wind]: WindIcon,
};
