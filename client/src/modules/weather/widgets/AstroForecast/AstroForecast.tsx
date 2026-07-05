import styles from './AstroForecast.module.scss';
import SectionHeading from '../../../../shared/ui/SectionHeading/SectionHeading';
import ListItem from '../../../../shared/ui/ListItem/ListItem';
import { useTranslation } from 'react-i18next';

import { IconName } from '../../../../shared/ui/Icon/icon-map';
import type { AstroData } from '../../models';

interface AstroForecastProps {
  astroData: AstroData;
}

const AstroForecast = ({ astroData }: AstroForecastProps) => {
  const { t } = useTranslation('weather');
  const { sunrise, sunset, moonPhase, moonIllumination } = astroData;

  const conditionsList: {
    iconName: IconName;
    title: string;
    value: string | number;
  }[] = [
    {
      iconName: IconName.Sunny,
      title: t('sunrise'),
      value: sunrise,
    },
    {
      iconName: IconName.Wind,
      title: t('sunset'),
      value: sunset,
    },
    {
      iconName: IconName.Clear,
      title: t('moon_phase'),
      value: moonPhase,
    },
    {
      iconName: IconName.Blob,
      title: t('moon_illumination'),
      value: moonIllumination + '%',
    },
  ];

  return (
    <section className={`${styles.container} division`}>
      <SectionHeading iconName={IconName.Clear} text={t('astro_forecast')} />
      <ul className={styles.list}>
        {conditionsList.map((element) => (
          <ListItem key={element.title} {...element} isVertical={true} />
        ))}
      </ul>
    </section>
  );
};

export default AstroForecast;
