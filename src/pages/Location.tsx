import FavoriteLocation from '../components/sections/FavoriteLocations/FavoriteLocations';
import RecentLocations from '../components/sections/RecentLocations/RecentLocations';
import SearchLocation from '../components/sections/SearchLocation/SearchLocation';

const Location = () => {
	return (
		<div className='container'>
			<SearchLocation />
			<FavoriteLocation />
			<RecentLocations />
		</div>
	);
};

export default Location;
