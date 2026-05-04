import { useContext, useState } from 'react';
import styles from './ForecastMetrics.module.scss';
import { WeatherContext } from '../../contexts/WeatherContext';
import Slider from '../../../../shared/ui/Slider/Slider';
import ListItem from '../../../../shared/ui/ListItem/ListItem';
import { formatDate } from '../../../../shared/utils/date-formatter';

const ForecastMetrics = () => {
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const daily = useContext(WeatherContext)!.daily;
  const dayForecast = daily[selectedDay];

  const conditionsList = [
    {
      iconId: 'thermometer',
      title: 'Temp',
      value: `${dayForecast.temperature.min.celsius}° / ${dayForecast.temperature.max.celsius}°`,
    },
    {
      iconId: 'wind',
      title: 'Wind',
      value: dayForecast.wind.speedKph + ' km/h',
    },
    {
      iconId: 'blob',
      title: 'Chance of rain',
      value: dayForecast.precipitation.rainChance + '%',
    },
    {
      iconId: 'blob',
      title: 'Average humidity',
      value: dayForecast.avgHumidity + '%',
    },
    {
      iconId: 'sunny',
      title: 'UV index',
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
            <span>{formatDate(day.date, { weekday: 'short' }).weekday}</span>
            <svg className={styles.icon}>
              <use xlinkHref={day.condition.icon} />
            </svg>
          </div>
        ))}
      </Slider>
      <h2 className={styles.heading}>Air conditions</h2>
      <ul className={styles.conditionsList}>
        {conditionsList.map(({ iconId, title, value }) => (
          <ListItem key={title} iconId={iconId} title={title} value={value} />
        ))}
      </ul>
    </section>
  );
};

export default ForecastMetrics;
