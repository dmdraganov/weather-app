import './Header.scss';
import formatDate from '../../../utilities/dateFormatter';
import sprite from '/src/assets/icons/sprite.svg';
import ApiContext from '../../../contexts/ApiContext';
import { useContext } from 'react';
import getWeatherIcon from '../../../utilities/iconMapper';

const Header = () => {
	const weatherData = useContext(ApiContext);
	const currentWeather = weatherData!.current;
	const condition = currentWeather.condition;
	const location = weatherData!.location.name;
	const temp = currentWeather.temp_c;
	const currentDate = new Date();
	const [weekday, ...rest] = formatDate(currentDate, 'long');

	return (
		<header className='header'>
			<div className='container'>
				<div className='header__container flex-container flex-container--space-between'>
					<div className='header__info'>
						<a className='header__locations-button' href='#'>
							<svg className='header__location-icon'>
								<use xlinkHref={sprite + '#location'} />
							</svg>
							<span>{location}</span>
							<svg className='header__arrow-icon'>
								<use xlinkHref={sprite + '#arrow'} />
							</svg>
						</a>
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
