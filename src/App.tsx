import { useFetch } from './hooks/useFetch';
import type { IWeatherData } from './types/weatherAPI';
import Home from './pages/Home';
import ApiContext from './contexts/ApiContext';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Location from './pages/Location';
import getUrl from './utilities/urlBuilder';

const API = 'forecast';
const location = 'Lobnya';

const Url = getUrl({ API, location });

const ApiProviderLayout = ({ value }: { value: IWeatherData }) => {
	return (
		<ApiContext.Provider value={value}>
			<Outlet />
		</ApiContext.Provider>
	);
};

function App() {
	const weatherData = useFetch<IWeatherData>(Url);

	return (
		<>
			{weatherData && (
				<BrowserRouter>
					<Routes>
						<Route element={<ApiProviderLayout value={weatherData} />}>
							<Route path='/' element={<Home />} />
							<Route path='/location' element={<Location />} />
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
