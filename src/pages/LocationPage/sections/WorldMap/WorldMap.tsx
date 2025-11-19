import {
  YMap,
  YMapMarker,
  YMapDefaultFeaturesLayer,
  YMapDefaultSchemeLayer,
  reactify,
} from '../../../../lib/ymaps';
import { useContext } from 'react';
import { CurrentLocationContext } from '../../../../contexts/CurrentLocationContext';
import styles from './WorldMap.module.scss';
import type { YMapLocation } from '@yandex/ymaps3-types/imperative/YMap';

const DEFAULT_LOCATION: YMapLocation = { center: [40.52, 34.34], zoom: 2 };
const ZOOM = 10;

const WorldMap = () => {
  const [currentLocation, ,] = useContext(CurrentLocationContext);
  const location: YMapLocation = currentLocation
    ? { center: [currentLocation?.lon, currentLocation?.lat], zoom: ZOOM }
    : DEFAULT_LOCATION;
  console.log(location);

  return (
    YMap &&
    YMapDefaultFeaturesLayer &&
    YMapDefaultSchemeLayer &&
    YMapMarker &&
    reactify && (
      <YMap
        location={reactify.useDefault(location, [
          location.center[0],
          location.center[1],
        ])}
        className={styles.map}
      >
        <YMapDefaultSchemeLayer />
        <YMapDefaultFeaturesLayer />
        <YMapMarker
          coordinates={reactify.useDefault(location.center, [
            location.center[0],
            location.center[1],
          ])}
        >
          asdasd
        </YMapMarker>
      </YMap>
    )
  );
};

export default WorldMap;

// state={
//           currentLocation
//             ? { center: coords, zoom: ZOOM }
//             : { center: DEFAULT_COORDS, zoom: DEFAULT_ZOOM }
//         }
//         className={styles.map}
//         instanceRef={(ref) => {
//           mapRef.current = ref;
//         }}
//         onClick={(e: MapEvent) => {
//           const coords: Coords = e.get('coords');
//           if (coords) setCoords(coords);
//           if (mapRef.current) mapRef.current.setCenter(coords, ZOOM);
//         }}
//         options={{
//           suppressMapOpenBlock: true,
//           yandexMapDisablePoiInteractivity: true,
//         }}
