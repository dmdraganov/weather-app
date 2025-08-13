import { useFetch } from './hooks/useFetch';
import type { IWeatherData } from './types/weatherAPI';
import Home from './pages/Home';
import ApiContext from './contexts/ApiContext';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

const API_KEY = 'd2269f3a17594db4a68213744252005';
const location = 'Lobnya';
const URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=7&lang=en`;

const ApiProviderLayout = ({ value }: { value: IWeatherData }) => {
	return (
		<ApiContext.Provider value={value}>
			<Outlet />
		</ApiContext.Provider>
	);
};

function App() {
	const weatherData = useFetch<IWeatherData>(URL);

	return (
		<>
			{weatherData && (
				<BrowserRouter>
					<Routes>
						<Route element={<ApiProviderLayout value={weatherData} />}>
							<Route path='/' element={<Home />} />
							<Route path='/location' />
						</Route>
						<Route path='/settings' />
						<Route path='*' />
					</Routes>
				</BrowserRouter>
			)}
		</>
	);
}

export default App;
