import { useContext } from 'react';
import LocationItem from '../../LocationItem/LocationItem';
import SectionHeading from '../../SectionHeading/SectionHeading';
import styles from './FavoriteLocations.module.scss';
import { FavoriteLocationsContext } from '../../../contexts/ApiContext';

const FavoriteLocations = () => {
	const [favoriteLocations] = useContext(FavoriteLocationsContext);

	return (
		<div className='division'>
			<SectionHeading iconID='heart' text='Favorite locations' />
			<ul>
				{favoriteLocations &&
					favoriteLocations.map(location => (
						<LocationItem key={location.id} location={location} />
					))}
			</ul>
		</div>
	);
};

export default FavoriteLocations;
