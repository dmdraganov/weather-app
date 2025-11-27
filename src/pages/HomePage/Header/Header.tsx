import styles from './Header.module.scss';
import formatDate from '../../../utilities/dateFormatter';
import { WeatherContext } from '../../../contexts/WeatherContext';
import { useContext } from 'react';
import getWeatherIcon from '../../../utilities/iconMapper';
import LocationButton from '../../../components/LocationButton/LocationButton';

const Header = () => {
  const currentWeather = useContext(WeatherContext)!.current;
  const condition = currentWeather.condition;
  const temp = currentWeather.temp_c;
  const currentDate = new Date();
  const [weekday, ...rest] = formatDate(currentDate, 'long');

  return (
    <header className={styles.header}>
      <div className='container'>
        <div className={styles.container}>
          <div className={styles.info}>
            <div className={styles.locationButton}>
              <LocationButton route='forward' />
            </div>
            <span className={styles.weatherCondition}>{condition.text}</span>
            <div className={styles.flexContainer}>
              <span className={styles.weatherTemp}>{temp} &deg;C</span>
              <time dateTime={''}>
                {weekday} | {rest.join(' ')}
              </time>
            </div>
          </div>
          <svg className={styles.weatherIcon}>
            <use
              xlinkHref={getWeatherIcon(
                condition.code,
                !!currentWeather.is_day
              )}
            />
          </svg>
        </div>
      </div>
    </header>
  );
};

export default Header;
