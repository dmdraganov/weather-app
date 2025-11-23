import sprite from '/src/assets/icons/sprite.svg';

const rainThunderCodes = [1273, 1276];
const snowThunderNightCodes = [1279, 1282];
const thunderNightCodes = [1087];

const getWeatherIcon = (code: number, isDay: boolean = true): string => {
  let iconId: string;

  if (code === 1000) {
    iconId = isDay ? 'sunny' : 'clear';
  } else if (code === 1003 || code === 1006) {
    iconId = isDay ? 'partly-cloudy-day' : 'partly-cloudy-night';
  } else if (code >= 1150 && code <= 1189) {
    iconId = 'heavy-rain';
  } else if (rainThunderCodes.includes(code)) {
    iconId = 'rain-thunder';
  } else if (snowThunderNightCodes.includes(code)) {
    iconId = 'snow-thunder-night';
  } else if (thunderNightCodes.includes(code)) {
    iconId = 'thunder-night';
  } else if (code >= 1252 && code <= 1279) {
    iconId = 'rain-day';
  } else {
    iconId = isDay ? 'partly-cloudy-day' : 'partly-cloudy-night';
  }
  return sprite + '#' + iconId;
};

export default getWeatherIcon;
