import styles from './RecentLocations.module.scss';
import SectionHeading from '../../SectionHeading/SectionHeading';
import { useContext, useEffect, useState } from 'react';
import type { ILocation } from '../../../types/locationApi';
import LocationItem from '../../LocationItem/LocationItem';
import { CurrentLocationContext } from '../../../contexts/ApiContext';

const RecentLocations = () => {
	const [currentLocation] = useContext(CurrentLocationContext);
	const [recentLocations, setRecentLocations] = useState<ILocation[]>([]);

	useEffect(() => {
		setRecentLocations(prev =>
			prev.length < 3 && !prev.includes(currentLocation)
				? [...prev, currentLocation]
				: [...prev.slice(1), currentLocation]
		);
	}, [currentLocation]);

	return (
		<div className='division'>
			<SectionHeading iconID='clock' text='Recent locations' />
			<ul>
				{recentLocations &&
					recentLocations.map(location => (
						<LocationItem key={location.id} location={location} />
					))}
			</ul>
		</div>
	);
};

export default RecentLocations;
