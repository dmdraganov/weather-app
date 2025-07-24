import styles from './Main.module.scss';
import Details from '../Details/Details';
import DayForecast from '../DayForecast/DayForecast';
import Activities from '../Activities/Activities';
import NavMenu from '../NavMenu/NavMenu';

const Main = () => {
	return (
		<main className={`${styles.main} flex-container__flex-item`}>
			<div
				className={`${styles.container} ${styles.flexGap} container flex-container`}
			>
				<NavMenu />
				<div
					className={`${styles.flexGap} flex-container flex-container__flex-item flex-container--column`}
				>
					<Activities />
					<DayForecast />
				</div>
				<Details />
			</div>
		</main>
	);
};

export default Main;
