import AstroForecast from '../../modules/weather/widgets/AstroForecast/AstroForecast';
import DayForecast from '../../modules/weather/widgets/DayForecast/DayForecast';
import ForecastMetrics from '../../modules/weather/widgets/ForecastMetrics/ForecastMetrics';
import Header from '../../modules/weather/widgets/WeatherHeader/Header';
import styles from './HomePage.module.scss';

const HomePage = () => {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.verticalFlexContainer}>
            <DayForecast />
            <AstroForecast />
          </div>
          <ForecastMetrics />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
