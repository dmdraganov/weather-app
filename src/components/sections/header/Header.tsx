import './Header.scss';
import formatDate from '../../../utilities/dateFormatter';
import sprite from '/src/assets/icons/sprite.svg';
import { WeatherContext } from '../../../contexts/ApiContext';
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
		<header className='header'>
			<div className='container'>
				<div className='header__container'>
					<div className='header__info'>
						<Link className='header__locations-button' to='/location'>
							<svg className='header__location-icon'>
								<use xlinkHref={sprite + '#location'} />
							</svg>
							<span>{location}</span>
							<svg className='header__arrow-icon'>
								<use xlinkHref={sprite + '#arrow'} />
							</svg>
						</Link>
						<span className='header__weather-condition'>{condition.text}</span>
						<span className='header__weather-temp'>{temp} &deg;C</span>
						<time dateTime={''}>
							{weekday} | {rest.join(' ')}
						</time>
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
