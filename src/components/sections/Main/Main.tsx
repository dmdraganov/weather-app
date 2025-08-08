import styles from './Main.module.scss';
import Details from '../Details/Details';
import DayForecast from '../DayForecast/DayForecast';
import AstroForecast from '../AstroForecast/AstroForecast';
import NavMenu from '../NavMenu/NavMenu';

const Main = () => {
	return (
		<main className={`${styles.main} flex-container__flex-item`}>
			<div
				className={`${styles.container} ${styles.flexGap} container flex-container`}
			>
				<NavMenu />
				<div
					className={`${styles.verticalFlexContainer} ${styles.flexGap} flex-container flex-container--column`}
				>
					<AstroForecast />
					<DayForecast />
				</div>
				<Details />
			</div>
		</main>
	);
};

export default Main;
