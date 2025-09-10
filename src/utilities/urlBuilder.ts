type ApiUrl = Record<string, string>;

const getUrl = ({ API, location, language = 'en' }: ApiUrl): string => {
	const API_KEY = 'd2269f3a17594db4a68213744252005';
	return `http://api.weatherapi.com/v1/${API}.json?key=${API_KEY}&q=${location}&days=7&lang=${language}`;
};
export default getUrl;
