import { IconName } from '../../../../shared/ui/Icon/icon-map';
import type { AstroData } from '../../models';

interface AstroForecastItem {
  iconName: IconName;
  titleKey: string;
  value: string | number;
}

export const mapAstroForecast = (astroData: AstroData): AstroForecastItem[] => [
  {
    iconName: IconName.Sunny,
    titleKey: 'sunrise',
    value: astroData.sunrise,
  },
  {
    iconName: IconName.Wind,
    titleKey: 'sunset',
    value: astroData.sunset,
  },
  {
    iconName: IconName.Clear,
    titleKey: 'moon_phase',
    value: astroData.moonPhase,
  },
  {
    iconName: IconName.Blob,
    titleKey: 'moon_illumination',
    value: astroData.moonIllumination + '%',
  },
];
