import styles from './AstroForecast.module.scss';
import SectionHeading from '../../../../shared/ui/SectionHeading/SectionHeading';
import { useContext } from 'react';
import { WeatherContext } from '../../contexts/WeatherContext';
import ListItem from '../../../../shared/ui/ListItem/ListItem';
import { useTranslation } from 'react-i18next';

const AstroForecast = () => {
  const { sunrise, sunset, moonPhase, moonIllumination } =
    useContext(WeatherContext)!.daily[0].astro;
  const { t } = useTranslation('weather');

  const conditionsList = [
    {
      iconId: 'sunny',
      title: t('sunrise'),
      value: sunrise,
    },
    {
      iconId: 'wind',
      title: t('sunset'),
      value: sunset,
    },
    {
      iconId: 'clear',
      title: t('moon_phase'),
      value: moonPhase,
    },
    {
      iconId: 'blob',
      title: t('moon_illumination'),
      value: moonIllumination + '%',
    },
  ];

  return (
    <section className={`${styles.container} division`}>
      <SectionHeading iconId='clear' text={t('astro_forecast')} />
      <ul className={styles.list}>
        {conditionsList.map((element) => (
          <ListItem key={element.title} {...element} isVertical={true} />
        ))}
      </ul>
    </section>
  );
};

export default AstroForecast;
