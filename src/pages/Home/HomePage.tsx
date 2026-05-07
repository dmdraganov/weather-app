import Header from '../../modules/weather/widgets/WeatherHeader/Header';
import Main from '../../modules/weather/widgets/WeatherMain/Main';
import styles from './HomePage.module.scss';

const HomePage = () => {
  return (
    <div className={styles.page}>
      <Header />
      <Main />
    </div>
  );
};

export default HomePage;
