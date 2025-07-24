import styles from './DayForecast.module.scss';
import SectionHeading from '../../SectionHeading/SectionHeading';

const DayForecast = () => {
	return (
		<section className={`division flex-container__flex-item`}>
			<SectionHeading iconID='clock' text='24-hours forecast' />
		</section>
	);
};

export default DayForecast;
