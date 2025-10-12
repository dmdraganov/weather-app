import { useContext } from 'react';
import FavoriteLocations from '../../components/sections/FavoriteLocations/FavoriteLocations';
import RecentLocations from '../../components/sections/RecentLocations/RecentLocations';
import SearchLocation from '../../components/sections/SearchLocation/SearchLocation';
import styles from './LocationPage.module.scss';
import { CurrentLocationContext } from '../../contexts/CurrentLocationContext';
import sprite from '/src/assets/icons/sprite.svg';
import { Link } from 'react-router-dom';
import { FavoriteLocationsProvider } from '../../contexts/FavoriteLocationsContext';

const LocationPage = () => {
	const [currentLocation] = useContext(CurrentLocationContext);

	return (
		<>
			<header>
				<div className='container'>
					<div className={styles.headerContainer}>
						<Link to='/' className={styles.backButton}>
							<svg className={styles.arrowIcon}>
								<use xlinkHref={sprite + '#arrow'} />
							</svg>
							<svg className={styles.locationIcon}>
								<use xlinkHref={sprite + '#location'} />
							</svg>
							{currentLocation && (
								<h1 className={styles.currentLocation}>
									{currentLocation.name}
								</h1>
							)}
						</Link>
					</div>
				</div>
			</header>
			<main>
				<div className={'container ' + styles.mainContainer}>
					<div className={styles.textContainer}>
						<FavoriteLocationsProvider>
							<SearchLocation />
							<FavoriteLocations />
							<RecentLocations />
						</FavoriteLocationsProvider>
					</div>
					<div className={styles.mapContainer}></div>
				</div>
			</main>
		</>
	);
};

export default LocationPage;
