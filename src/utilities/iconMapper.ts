import sprite from '/src/assets/icons/sprite.svg';

const rainThunderCodes = [1273, 1276];
const snowThunderNightCodes = [1279, 1282];
const thunderNightCodes = [1087];

const getWeatherIcon = (code: number, isDay: boolean = true): string => {
	let iconID: string;

	if (code === 1000) {
		iconID = isDay ? 'sunny' : 'clear';
	} else if (code === 1003 || code === 1006) {
		iconID = isDay ? 'partly-cloudy-day' : 'partly-cloudy-night';
	} else if (code >= 1150 && code <= 1189) {
		iconID = 'heavy-rain';
	} else if (rainThunderCodes.includes(code)) {
		iconID = 'rain-thunder';
	} else if (snowThunderNightCodes.includes(code)) {
		iconID = 'snow-thunder-night';
	} else if (thunderNightCodes.includes(code)) {
		iconID = 'thunder-night';
	} else if (code >= 1252 && code <= 1279) {
		iconID = 'rain-day';
	} else {
		iconID = isDay ? 'partly-cloudy-day' : 'partly-cloudy-night';
	}
	return sprite + '#' + iconID;
};

export default getWeatherIcon;
