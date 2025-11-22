import HomePage from './pages/HomePage/HomePage';
import { SelectedLocationProvider } from './contexts/SelectedLocationProvider';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import LocationPage from './pages/LocationPage/LocationPage';
import { WeatherProvider } from './contexts/WeatherProvider';
import SettingsPage from './pages/SettingsPage/SettingsPage';

const SelectedLocationProviderLayout = () => (
  <SelectedLocationProvider>
    <Outlet />
  </SelectedLocationProvider>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SelectedLocationProviderLayout />}>
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
