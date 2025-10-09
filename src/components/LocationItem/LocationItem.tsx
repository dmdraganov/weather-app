import styles from './LocationItem.module.scss';
import sprite from '/src/assets/icons/sprite.svg';
import type { ILocation } from '../../types/locationApi';
import { useContext, useState } from 'react';
import {
	CurrentLocationContext,
	FavoriteLocationsContext,
} from '../../contexts/ApiContext';

interface ILocationItemProps {
	location: ILocation;
	isFirst?: boolean;
}

const LocationItem = ({ location, isFirst = false }: ILocationItemProps) => {
	const [, setCurrentLocation] = useContext(CurrentLocationContext);
	const [favoriteLocations, setFavoriteLocations] = useContext(
		FavoriteLocationsContext
	);
	const [isHovered, setIsHovered] = useState(false);
	const isFavorite = favoriteLocations?.includes(location);

	const handleAddToFavorites = () => {
		if (!favoriteLocations?.includes(location)) {
			setFavoriteLocations(prev => [...prev, location]);
		} else {
			setFavoriteLocations(prev => prev.filter(elem => elem != location));
		}
	};

	return (
		<li
			className={styles.item}
			style={isFirst ? { marginTop: 44 } : undefined}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
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
				style={!isHovered && !isFavorite ? { opacity: 0 } : undefined}
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
