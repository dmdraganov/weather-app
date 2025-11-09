import type { Coords } from '../types/locationApi';

const getUrl = (
	api: string,
	location: string | Coords,
	language = 'en'
): string => {
	const API_KEY = 'd2269f3a17594db4a68213744252005';
	return `http://api.weatherapi.com/v1/${api}.json?key=${API_KEY}&q=${location}&days=7&lang=${language}`;
};
export default getUrl;
