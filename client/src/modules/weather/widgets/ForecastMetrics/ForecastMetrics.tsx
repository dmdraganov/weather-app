import { useState } from 'react';
import styles from './ForecastMetrics.module.scss';
import Slider from '../../../../shared/ui/Slider/Slider';
import ListItem from '../../../../shared/ui/ListItem/ListItem';
import { formatDate } from '../../../../shared/utils/format-date';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../../localization/hooks/useLanguage';
import Icon from '../../../../shared/ui/Icon/Icon';
import type { DailyWeather } from '../../models';
import { mapForecastMetrics } from './ForecastMetrics.data';

interface ForecastMetricsProps {
  dailyWeatherList: DailyWeather[];
}

const ForecastMetrics = ({ dailyWeatherList }: ForecastMetricsProps) => {
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [language] = useLanguage();
  const { t } = useTranslation(['weather', 'shared']);

  if (dailyWeatherList.length === 0) {
    return (
      <section className={`${styles.container} division`}>
        <h2 className={styles.heading}>{t('air_conditions')}</h2>
        <p className={styles.noData}>{t('no_data', { ns: 'shared' })}</p>
      </section>
    );
  }

  const metricsList = mapForecastMetrics(
    dailyWeatherList[selectedDay],
    language
  );

  return (
    <section className={`${styles.container} division`}>
      <Slider
        selectedSlide={selectedDay}
        setSelectedSlide={setSelectedDay}
        visibleSlides={3}
        slidesAmount={dailyWeatherList.length}
      >
        {dailyWeatherList.map((day, i) => (
          <div
            key={i}
            className={`${styles.slide} ${
              i === selectedDay ? styles.active : ''
            }`}
          >
            <span>
              {
                formatDate(day.date, { weekday: 'short', locale: language })
                  .weekday
              }
            </span>
            <Icon name={day.condition.icon} className={styles.icon} />
          </div>
        ))}
      </Slider>
      <h2 className={styles.heading}>{t('air_conditions')}</h2>
      <ul className={styles.conditionsList}>
        {metricsList.map(({ iconName, titleKey, value }) => (
          <ListItem
            key={titleKey}
            iconName={iconName}
            title={t(titleKey)}
            value={value}
          />
        ))}
      </ul>
    </section>
  );
};

export default ForecastMetrics;
