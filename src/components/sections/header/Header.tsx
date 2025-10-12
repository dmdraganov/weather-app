import styles from './Header.module.scss';
import formatDate from '../../../utilities/dateFormatter';
import sprite from '/src/assets/icons/sprite.svg';
import { WeatherContext } from '../../../contexts/WeatherContext';
import { useContext } from 'react';
import getWeatherIcon from '../../../utilities/iconMapper';
import { Link } from 'react-router-dom';

const Header = () => {
	const weatherData = useContext(WeatherContext);
	const currentWeather = weatherData!.current;
	const condition = currentWeather.condition;
	const location = weatherData!.location.name;
	const temp = currentWeather.temp_c;
	const currentDate = new Date();
	const [weekday, ...rest] = formatDate(currentDate, 'long');

	return (
		<header className={styles.header}>
			<div className='container'>
				<div className={styles.container}>
					<div className={styles.info}>
						<Link className={styles.locationsButton} to='/location'>
							<svg className={styles.locationIcon}>
								<use xlinkHref={sprite + '#location'} />
							</svg>
							<span>{location}</span>
							<svg className={styles.arrowIcon}>
								<use xlinkHref={sprite + '#arrow'} />
							</svg>
						</Link>
						<span className={styles.weatherCondition}>{condition.text}</span>
						<div className={styles.flexContainer}>
							<span className={styles.weatherTemp}>{temp} &deg;C</span>
							<time dateTime={''}>
								{weekday} | {rest.join(' ')}
							</time>
						</div>
					</div>
					<svg>
						<use
							xlinkHref={getWeatherIcon(
								condition.code,
								!!currentWeather.is_day
							)}
						/>
					</svg>
				</div>
			</div>
		</header>
	);
};

export default Header;
