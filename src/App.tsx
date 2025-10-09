import { useFetch } from './hooks/useFetch';
import type { IWeatherData } from './types/weatherAPI';
import HomePage from './pages/HomePage';
import { WeatherContext } from './contexts/ApiContext';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import LocationPage from './pages/LocationPage';
import getUrl from './utilities/urlBuilder';
import type { TCurrentLocationContext, ILocation } from './types/locationApi';
import { CurrentLocationContext } from './contexts/ApiContext';
import { useEffect, useState } from 'react';

const API = 'forecast';

const CurrentLocationContextLayout = ({
	value,
}: {
	value: TCurrentLocationContext;
}) => (
	<CurrentLocationContext.Provider value={value}>
		<Outlet />
	</CurrentLocationContext.Provider>
);

function App() {
	const [currentLocation, setCurrentLocation] = useState<ILocation>({
		id: 519690,
		name: 'Lobnya',
		region: 'Moscow City',
		country: 'Russia',
		lat: 56.011,
		lon: 37.483,
		url: 'lobnya-russia',
	});
	const [weatherUrl, setWeatherUrl] = useState(
		getUrl(API, currentLocation?.name || 'Lobnya')
	);

	useEffect(() => {
		if (currentLocation) {
			setWeatherUrl(getUrl(API, currentLocation.name));
		}
	}, [currentLocation]);

	const weatherData = useFetch<IWeatherData>(weatherUrl);

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route
						element={
							<CurrentLocationContextLayout
								value={[currentLocation, setCurrentLocation]}
							/>
						}
					>
						{weatherData && (
							<Route
								path='/'
								element={
									<WeatherContext.Provider value={weatherData}>
										<HomePage />
									</WeatherContext.Provider>
								}
							/>
						)}
						<Route path='/location' element={<LocationPage />} />
					</Route>
					<Route path='/explore' />
					<Route path='/settings' />
					<Route path='*' />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
