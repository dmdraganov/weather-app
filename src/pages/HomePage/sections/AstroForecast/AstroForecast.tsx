import styles from './AstroForecast.module.scss';
import SectionHeading from '../../../../components/SectionHeading/SectionHeading';
import { useContext } from 'react';
import { WeatherContext } from '../../../../contexts/WeatherContext';
import ListItem from '../../../../components/ListItem/ListItem';
import formatTime from '../../../../utilities/timeFormatter';

const AstroForecast = () => {
  const forecasts = useContext(WeatherContext)!.forecast.forecastday;
  const { sunrise, sunset, moon_phase, moon_illumination } = forecasts[0].astro;

  const conditionsList = [
    {
      iconId: 'sunny',
      title: 'Sunrise',
      value: formatTime(sunrise),
    },
    {
      iconId: 'wind',
      title: 'Sunset',
      value: formatTime(sunset),
    },
    {
      iconId: 'clear',
      title: 'Moon phase',
      value: moon_phase,
    },
    {
      iconId: 'blob',
      title: 'Moon illumination',
      value: moon_illumination + '%',
    },
  ];

  return (
    <section className={`${styles.container} division`}>
      <SectionHeading iconId='clear' text='Astronomical forecast' />
      <ul className={styles.list}>
        {conditionsList.map((element) => (
          <ListItem key={element.title} {...element} isVertical={true} />
        ))}
      </ul>
    </section>
  );
};

export default AstroForecast;
