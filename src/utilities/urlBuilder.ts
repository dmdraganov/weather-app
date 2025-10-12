const getUrl = (
	api: string,
	location: string | { lat: number; lon: number },
	language = 'en'
): string => {
	const API_KEY = 'd2269f3a17594db4a68213744252005';
	return `http://api.weatherapi.com/v1/${api}.json?key=${API_KEY}&q=${
		typeof location === 'string' ? location : location.lat + ',' + location.lon
	}&days=7&lang=${language}`;
};
export default getUrl;
