import styles from './LocationItem.module.scss';
import sprite from '/src/assets/icons/sprite.svg';
import type { Location } from '../../types/locationApi';
import { useContext } from 'react';
import { CurrentLocationContext } from '../../contexts/CurrentLocationContext';
import { FavoriteLocationsContext } from '../../contexts/FavoriteLocationsContext';

interface LocationItemProps {
	location: Location;
	isFirst?: boolean;
}

const LocationItem = ({ location, isFirst = false }: LocationItemProps) => {
	const [, setCurrentLocation] = useContext(CurrentLocationContext);
	const [favoriteLocations, setFavoriteLocations] = useContext(
		FavoriteLocationsContext
	);

	const isFavorite = favoriteLocations.some(
		favoriteLocation => favoriteLocation.id === location.id
	);

	const handleAddToFavorites = () => {
		setFavoriteLocations(prev =>
			!isFavorite
				? [...prev, location]
				: prev.filter(elem => elem.id != location.id)
		);
	};

	return (
		<li className={styles.item} style={isFirst ? { marginTop: 44 } : undefined}>
			<div
				className={styles.itemText}
				onClick={() => setCurrentLocation(location)}
			>
				<h3 className={styles.itemHeading}>{location.name}</h3>
				<span className={styles.itemAddition}>
					{location.country + (location.region ? ', ' + location.region : '')}
				</span>
			</div>
			<button
				className={styles.favoriteButton}
				onClick={handleAddToFavorites}
				style={isFavorite ? { opacity: 1 } : undefined}
			>
				<svg
					className={styles.favoriteIcon}
					style={isFavorite ? { color: 'white' } : undefined}
				>
					<use xlinkHref={sprite + '#heart'} />
				</svg>
			</button>
		</li>
	);
};

export default LocationItem;
