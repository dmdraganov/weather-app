import { useContext, useState } from 'react';
import styles from './ForecastMetrics.module.scss';
import { WeatherContext } from '../../../../contexts/WeatherContext';
import formatDate from '../../../../utilities/dateFormatter';
import getWeatherIcon from '../../../../utilities/iconMapper';
import Slider from '../../../../components/Slider/Slider';
import ListItem from '../../../../components/ListItem/ListItem';

const ForecastMetrics = () => {
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const forecasts = useContext(WeatherContext)!.forecast.forecastday;
  const dayForecast = forecasts[selectedDay].day;

  const sliderDaysList = forecasts.map(({ date_epoch, day }) => {
    return {
      dayName: formatDate(new Date(date_epoch * 1000))[0],
      iconCode: day.condition.code,
    };
  });

  const conditionsList = [
    {
      iconId: 'thermometer',
      title: 'Temp',
      value: `${dayForecast.mintemp_c}\u00B0 / ${dayForecast.maxtemp_c}\u00B0`,
    },
    {
      iconId: 'wind',
      title: 'Wind',
      value: dayForecast.maxwind_kph + ' km/h',
    },
    {
      iconId: 'blob',
      title: 'Chance of rain',
      value: dayForecast.daily_chance_of_rain + '%',
    },
    {
      iconId: 'blob',
      title: 'Average humidity',
      value: dayForecast.avghumidity + '%',
    },
    {
      iconId: 'sunny',
      title: 'UV index',
      value: dayForecast.uv,
    },
  ];

  return (
    <section className={`${styles.container} division`}>
      <Slider
        selectedSlide={selectedDay}
        setSelectedSlide={setSelectedDay}
        visibleSlides={3}
        slidesAmount={sliderDaysList.length}
      >
        {sliderDaysList.map((day, i) => (
          <div
            key={i}
            className={`${styles.slide} ${
              i === selectedDay ? styles.active : ''
            }`}
          >
            <span>{day.dayName}</span>
            <svg className={styles.icon}>
              <use xlinkHref={getWeatherIcon(day.iconCode)} />
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
