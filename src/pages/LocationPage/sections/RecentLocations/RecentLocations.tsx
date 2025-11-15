import SectionHeading from '../../../../components/SectionHeading/SectionHeading';
import { useContext, useEffect } from 'react';
import type { Location } from '../../../../types/locationApi';
import LocationItem from '../../../../components/LocationItem/LocationItem';
import { CurrentLocationContext } from '../../../../contexts/CurrentLocationContext';
import { useLocalStorage } from '../../../../hooks/useLocalStorage';

const MAX_LOCATIONS_AMOUNT = 3;

const RecentLocations = () => {
	const [currentLocation] = useContext(CurrentLocationContext);
	const [recentLocations, setRecentLocations] = useLocalStorage<Location[]>(
		'recentLocations',
		[]
	);

	useEffect(() => {
		if (currentLocation) {
			setRecentLocations(prev => {
				if (prev.some(location => location.id === currentLocation.id))
					return [...prev];
				if (prev.length >= MAX_LOCATIONS_AMOUNT)
					return [...prev.slice(1), currentLocation];
				else return [...prev, currentLocation];
			});
		}
	}, [currentLocation]);

	return (
		<section className='division'>
			<SectionHeading iconID='clock' text='Recent locations' />
			<ul>
				{!!recentLocations.length &&
					recentLocations.map(location => (
						<LocationItem key={location.id} location={location} />
					))}
			</ul>
		</section>
	);
};

export default RecentLocations;
