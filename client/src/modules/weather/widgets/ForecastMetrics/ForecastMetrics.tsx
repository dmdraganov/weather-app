import { useContext, useState } from 'react';
import styles from './ForecastMetrics.module.scss';
import { WeatherContext } from '../../contexts/WeatherContext';
import Slider from '../../../../shared/ui/Slider/Slider';
import ListItem from '../../../../shared/ui/ListItem/ListItem';
import { formatDate } from '../../../../shared/utils/date-formatter';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../../localization/hooks/useLanguage';
import { formatKmPerHour } from '../../../../shared/utils/units-formatter';
import Icon from '../../../../shared/ui/Icon/Icon';

import { IconName } from '../../../../shared/ui/Icon/icon-map';

const ForecastMetrics = () => {
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const weatherData = useContext(WeatherContext);
  const [language] = useLanguage();
  const { t } = useTranslation('weather');

  if (!weatherData) return null;

  const daily = weatherData.daily;
  const dayForecast = daily[selectedDay];

  const conditionsList: { name: IconName; title: string; value: string | number }[] = [
    {
      name: IconName.Thermometer,
      title: t('temp'),
      value: `${dayForecast.temperature.min.celsius}° / ${dayForecast.temperature.max.celsius}°`,
    },
    {
      name: IconName.Wind,
      title: t('wind'),
      value: formatKmPerHour(dayForecast.wind.speedKph, language),
    },
    {
      name: IconName.Blob,
      title: t('chance_of_rain'),
      value: dayForecast.precipitation.rainChance + '%',
    },
    {
      name: IconName.Blob,
      title: t('avg_humidity'),
      value: dayForecast.avgHumidity + '%',
    },
    {
      name: IconName.Sunny,
      title: t('uv_index'),
      value: dayForecast.uvIndex,
    },
  ];

  return (
    <section className={`${styles.container} division`}>
      <Slider
        selectedSlide={selectedDay}
        setSelectedSlide={setSelectedDay}
        visibleSlides={3}
        slidesAmount={daily.length}
      >
        {daily.map((day, i) => (
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
        {conditionsList.map(({ name, title, value }) => (
          <ListItem key={title} name={name} title={title} value={value} />
        ))}
      </ul>
    </section>
  );
};

export default ForecastMetrics;
