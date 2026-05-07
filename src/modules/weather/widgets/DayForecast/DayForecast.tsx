import styles from './DayForecast.module.scss';
import SectionHeading from '../../../../shared/ui/SectionHeading/SectionHeading';
import Chart from '../../../../shared/ui/Chart/Chart';
import { useTranslation } from 'react-i18next';

const DayForecast = () => {
  const { t } = useTranslation('weather');
  return (
    <section className={styles.container + ' division'}>
      <SectionHeading iconId='clock' text={t('day_forecast')} />
      <Chart />
    </section>
  );
};

export default DayForecast;
