import styles from './Activities.module.scss';
import SectionHeading from '../../SectionHeading/SectionHeading';

const Activities = () => {
	return (
		<section
			className={`${styles.container} division flex-container__flex-item`}
		>
			<SectionHeading iconID='heart' text='Activities in your area' />
		</section>
	);
};

export default Activities;
