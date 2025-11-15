import styles from './Main.module.scss';
import ForecastMetrics from '../sections/ForecastMetrics/ForecastMetrics';
import DayForecast from '../sections/DayForecast/DayForecast';
import AstroForecast from '../sections/AstroForecast/AstroForecast';
import NavMenu from '../sections/NavMenu/NavMenu';

const Main = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container + ' container'}>
        <NavMenu />
        <div className={styles.verticalFlexContainer}>
          <AstroForecast />
          <DayForecast />
        </div>
        <ForecastMetrics />
      </div>
    </main>
  );
};

export default Main;
