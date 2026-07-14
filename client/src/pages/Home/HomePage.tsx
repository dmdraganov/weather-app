import AstroForecast from '../../modules/weather/widgets/AstroForecast/AstroForecast';
import ForecastMetrics from '../../modules/weather/widgets/ForecastMetrics/ForecastMetrics';
import Header from '../../modules/weather/widgets/WeatherHeader/Header';
import styles from './HomePage.module.scss';
import { useWeather } from '../../modules/weather/api/useWeather';
import ForecastChart from '../../modules/weather/widgets/ForecastChart/ForecastChart';
import Spinner from '../../shared/ui/Spinner/Spinner';
import LocationButton from '../../modules/location/ui/LocationButton/LocationButton';
import LocationSearch from '../../modules/location/widgets/LocationSearch/LocationSearch';
import { Modal } from '../../shared/ui/Modal/Modal';
import { useState } from 'react';
import { useLocationStore } from '../../modules/location/model/store/store';

const HomePage = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const currentLocation = useLocationStore((state) => state.currentLocation);
  const { data, error, isLoading } = useWeather(
    currentLocation?.coordinates ?? null
  );

  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  if (data)
    return (
      <div className={styles.page}>
        <Header
          currentWeather={data.current}
          locationControl={
            <LocationButton
              onClick={() => setIsSearchOpen(true)}
              arrowDirection='forward'
            />
          }
        />
        {isSearchOpen && (
          <Modal isOpen onClose={() => setIsSearchOpen(false)}>
            <LocationSearch syncUrl />
          </Modal>
        )}
        <main className={styles.main}>
          <div className={styles.container}>
            <div className={styles.verticalFlexContainer}>
              <ForecastChart dailyWeatherList={data.daily} />
              <AstroForecast astroData={data.daily[0].astro} />
            </div>
            <ForecastMetrics dailyWeatherList={data.daily} />
          </div>
        </main>
      </div>
    );
};

export default HomePage;
