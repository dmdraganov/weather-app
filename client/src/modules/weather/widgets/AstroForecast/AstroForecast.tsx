import styles from './AstroForecast.module.scss';
import SectionHeading from '../../../../shared/ui/SectionHeading/SectionHeading';
import { useContext } from 'react';
import { WeatherContext } from '../../contexts/WeatherContext';
import ListItem from '../../../../shared/ui/ListItem/ListItem';
import { useTranslation } from 'react-i18next';

import { IconName } from '../../../../shared/ui/Icon/icon-map';

const AstroForecast = () => {
  const weatherData = useContext(WeatherContext);
  const { t } = useTranslation('weather');

  if (!weatherData) return null;

  const { sunrise, sunset, moonPhase, moonIllumination } =
    weatherData.daily[0].astro;

  const conditionsList: { name: IconName; title: string; value: string | number }[] = [
    {
      name: IconName.Sunny,
      title: t('sunrise'),
      value: sunrise,
    },
    {
      name: IconName.Wind,
      title: t('sunset'),
      value: sunset,
    },
    {
      name: IconName.Clear,
      title: t('moon_phase'),
      value: moonPhase,
    },
    {
      name: IconName.Blob,
      title: t('moon_illumination'),
      value: moonIllumination + '%',
    },
  ];

  return (
    <section className={`${styles.container} division`}>
      <SectionHeading name={IconName.Clear} text={t('astro_forecast')} />
      <ul className={styles.list}>
        {conditionsList.map((element) => (
          <ListItem key={element.title} {...element} isVertical={true} />
        ))}
      </ul>
    </section>
  );
};

export default AstroForecast;
