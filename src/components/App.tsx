import { useEffect, useState } from 'react';
import type { IWeatherData } from '../types/weatherAPI';
import Header from './sections/Header/Header';
import Main from './sections/Main/Main';
import APIContext from '../contexts/APIContext';
import { fetchData } from '../utilities/fetchAPI';

const API_KEY = 'd2269f3a17594db4a68213744252005';

function App() {
	const [weatherData, setWeatherData] = useState<IWeatherData | null>(null);

	//variables for API request
	const [location, setLocation] = useState('Lobnya');
	const URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=7&lang=en`;

	//API Request
	useEffect(() => {
		const abortController = new AbortController();

		fetchData(URL, { signal: abortController.signal }).then(data => {
			setWeatherData(data);
		});

		return () => abortController.abort('abort reason: component unmount');
	}, [location]);

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
