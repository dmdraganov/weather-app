import styles from './AstroForecast.module.scss';
import SectionHeading from '../../../../shared/ui/SectionHeading/SectionHeading';
import { useContext } from 'react';
import { WeatherContext } from '../../contexts/WeatherContext';
import ListItem from '../../../../shared/ui/ListItem/ListItem';
import formatTime from '../../../../shared/utils/time-formatter';

const AstroForecast = () => {
  const { sunrise, sunset, moonPhase, moonIllumination } =
    useContext(WeatherContext)!.daily[0].astro;

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
      value: moonPhase,
    },
    {
      iconId: 'blob',
      title: 'Moon illumination',
      value: moonIllumination + '%',
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
