const getUrl = (
	API: string,
	location: string | number,
	language = 'en'
): string => {
	const API_KEY = 'd2269f3a17594db4a68213744252005';
	return `http://api.weatherapi.com/v1/${API}.json?key=${API_KEY}&q=${location}&days=7&lang=${language}`;
};
export default getUrl;
