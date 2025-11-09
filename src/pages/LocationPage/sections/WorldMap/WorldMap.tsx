import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { useContext, useRef } from 'react';
import { CurrentLocationContext } from '../../../../contexts/CurrentLocationContext';
import styles from './WorldMap.module.scss';
import type { Map as MapInstance, MapEvent } from 'yandex-maps';
import type { Coords } from '../../../../types/locationApi';

const DEFAULT_COORDS = [40.52, 34.34];
const DEFAULT_ZOOM = 1;
const ZOOM = 10;

const WorldMap = () => {
	const mapRef = useRef<MapInstance | null>(null);
	const [currentLocation, , setCoords] = useContext(CurrentLocationContext);
	const coords = currentLocation
		? [currentLocation?.lat, currentLocation?.lon]
		: undefined;

	return (
		<YMaps
			enterprise={false}
			query={{
				lang: 'ru_RU',
			}}
		>
			<Map
				state={
					currentLocation
						? { center: coords, zoom: ZOOM }
						: { center: DEFAULT_COORDS, zoom: DEFAULT_ZOOM }
				}
				className={styles.map}
				instanceRef={ref => {
					mapRef.current = ref;
				}}
				onClick={(e: MapEvent) => {
					const coords: Coords = e.get('coords');
					if (coords) setCoords(coords);
					if (mapRef.current) mapRef.current.setCenter(coords, ZOOM);
				}}
				options={{
					suppressMapOpenBlock: true,
					yandexMapDisablePoiInteractivity: true,
				}}
			>
				<Placemark geometry={coords} />
			</Map>
		</YMaps>
	);
};

export default WorldMap;
