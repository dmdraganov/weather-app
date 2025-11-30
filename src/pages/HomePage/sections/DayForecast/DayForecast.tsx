import styles from './DayForecast.module.scss';
import SectionHeading from '../../../../components/SectionHeading/SectionHeading';
import Chart from '../../../../components/Chart/Chart';

const DayForecast = () => {
  return (
    <section className={styles.container + ' division'}>
      <SectionHeading iconId='clock' text='24-hours forecast' />
      <Chart />
    </section>
  );
};

export default DayForecast;
