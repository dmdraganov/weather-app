import { useContext } from 'react';
import LocationItem from '../../../../components/LocationItem/LocationItem';
import SectionHeading from '../../../../components/SectionHeading/SectionHeading';
import styles from './FavoriteLocations.module.scss';
import { FavoriteLocationsContext } from '../../../../contexts/FavoriteLocationsContext';

const FavoriteLocations = () => {
	const [favoriteLocations] = useContext(FavoriteLocationsContext);

	return (
		<section className='division'>
			<SectionHeading iconID='heart' text='Favorite locations' />
			<ul>
				{favoriteLocations.map(location => (
					<LocationItem key={location.id} location={location} />
				))}
			</ul>
		</section>
	);
};

export default FavoriteLocations;
