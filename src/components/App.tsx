import { useFetch } from '../hooks/useFetch';
import type { IWeatherData } from '../types/weatherAPI';
import Header from './sections/Header/Header';
import Main from './sections/Main/Main';
import APIContext from '../contexts/APIContext';

const API_KEY = 'd2269f3a17594db4a68213744252005';
const location = 'Lobnya';
const URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=7&lang=en`;

function App() {
	const weatherData = useFetch<IWeatherData>(URL);
	console.log(weatherData);

	return (
		<>
			{weatherData && (
				<APIContext.Provider value={weatherData}>
					<Header />
					<Main />
				</APIContext.Provider>
			)}
		</>
	);
}

export default App;
