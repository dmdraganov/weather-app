import AstroForecast from '../../modules/weather/widgets/AstroForecast/AstroForecast';
import ForecastMetrics from '../../modules/weather/widgets/ForecastMetrics/ForecastMetrics';
import Header from '../../modules/weather/widgets/WeatherHeader/Header';
import styles from './HomePage.module.scss';
import { useWeather } from '../../modules/weather/api/useWeather';
import ForecastChart from '../../modules/weather/widgets/ForecastChart/ForecastChart';
import Spinner from '../../shared/ui/Spinner/Spinner';

const HomePage = () => {
  const { data, error, isLoading } = useWeather();

  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  if (data)
    return (
      <div className={styles.page}>
        <Header currentWeather={data.current} />
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
