import styles from './DayForecast.module.scss';
import SectionHeading from '../../../../shared/ui/SectionHeading/SectionHeading';
import HourlyChart from '../HourlyChart/HourlyChart';
import { useTranslation } from 'react-i18next';

import { IconName } from '../../../../shared/ui/Icon/icon-map';

const DayForecast = () => {
  const { t } = useTranslation('weather');
  return (
    <section className={styles.container + ' division'}>
      <SectionHeading name={IconName.Clock} text={t('day_forecast')} />
      <HourlyChart />
    </section>
  );
};

export default DayForecast;
