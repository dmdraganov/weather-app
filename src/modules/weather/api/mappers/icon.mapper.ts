import { IconName } from '../../../../shared/ui/Icon/icon-map';

const rainThunderCodes = [1273, 1276];
const snowThunderNightCodes = [1279, 1282];
const thunderNightCodes = [1087];

export const mapCodeToIcon = (code: number, isDay: boolean = true): IconName => {
  if (code === 1000) {
    return isDay ? IconName.Sunny : IconName.Clear;
  } else if (code === 1003 || code === 1006) {
    return isDay ? IconName.PartlyCloudyDay : IconName.PartlyCloudyNight;
  } else if (code >= 1150 && code <= 1189) {
    return IconName.HeavyRain;
  } else if (rainThunderCodes.includes(code)) {
    return IconName.RainThunder;
  } else if (snowThunderNightCodes.includes(code)) {
    return IconName.SnowThunderNight;
  } else if (thunderNightCodes.includes(code)) {
    return IconName.ThunderNight;
  } else if (code >= 1252 && code <= 1279) {
    return IconName.RainDay;
  } else {
    return isDay ? IconName.PartlyCloudyDay : IconName.PartlyCloudyNight;
  }
};
