import HomePage from './pages/HomePage/HomePage';
import { LocationProvider } from './contexts/LocationProvider';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import LocationPage from './pages/LocationPage/LocationPage';
import { WeatherProvider } from './contexts/WeatherProvider';
import SettingsPage from './pages/SettingsPage/SettingsPage';

const LocationProviderLayout = () => (
  <LocationProvider>
    <Outlet />
  </LocationProvider>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LocationProviderLayout />}>
          <Route
            path='/'
            element={
              <WeatherProvider>
                <HomePage />
              </WeatherProvider>
            }
          />
          <Route path='/location' element={<LocationPage />} />
        </Route>
        <Route path='/explore' />
        <Route path='/settings' element={<SettingsPage />} />
        <Route path='*' />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
