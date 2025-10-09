import styles from './Main.module.scss';
import ForecastMetrics from '../ForecastMetrics/ForecastMetrics';
import DayForecast from '../DayForecast/DayForecast';
import AstroForecast from '../AstroForecast/AstroForecast';
import NavMenu from '../NavMenu/NavMenu';

const Main = () => {
	return (
		<main className={styles.main}>
			<div className={styles.container + ' container'}>
				<NavMenu />
				<div className={styles.verticalFlexContainer}>
					<AstroForecast />
					<DayForecast />
				</div>
				<ForecastMetrics />
			</div>
		</main>
	);
};

export default Main;
