import { useRef } from 'react';
import SectionHeading from '../../SectionHeading/SectionHeading';
import './SearchLocation.scss';
import { useFetch } from '../../../hooks/useFetch';

const SearchLocation = () => {
	const searchInputRef = useRef<HTMLInputElement>(null);

	return (
		<div className='division'>
			<SectionHeading iconID='location' text='Search location' />
			<input ref={searchInputRef} type='text' placeholder='Choose' />
		</div>
	);
};

export default SearchLocation;
