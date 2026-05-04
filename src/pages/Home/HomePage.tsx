import Header from '../../modules/weather/widgets/WeatherHeader/Header';
import Main from '../../modules/weather/widgets/WeatherMain/Main';
import styles from './HomePage.module.scss';
import { useCurrentLocation } from '../../modules/location/hooks/useCurrentLocation';

const HomePage = () => {
  useCurrentLocation();

  return (
    <div className={styles.page}>
      <Header />
      <Main />
    </div>
  );
};

export default HomePage;
