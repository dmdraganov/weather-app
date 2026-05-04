import {
  YMap,
  YMapMarker,
  YMapDefaultFeaturesLayer,
  YMapDefaultSchemeLayer,
  YMapDefaultMarker,
  YMapListener,
  reactify,
} from '../../../../shared/lib/ymaps';
import styles from './WorldMap.module.scss';

import type { YMapLocation } from '@yandex/ymaps3-types/imperative/YMap';
import type { DomEvent, DomEventHandlerObject } from 'ymaps3';
import { useCurrentLocation } from '../../hooks/useCurrentLocation';

const DEFAULT_LOCATION: YMapLocation = { center: [40.52, 34.34], zoom: 2 };
const ZOOM = 10;

const WorldMap = () => {
  const { currentLocation, setCurrentLocation } = useCurrentLocation();

  const location: YMapLocation = currentLocation
    ? {
        center: [
          currentLocation.coordinates.longitude,
          currentLocation.coordinates.latitude,
        ],
        zoom: ZOOM,
      }
    : DEFAULT_LOCATION;

  const handleClick = (_object: DomEventHandlerObject, e: DomEvent) => {
    const [lon, lat] = e.coordinates;
    void setCurrentLocation({ latitude: lat, longitude: lon });
  };

  return (
    YMap &&
    YMapDefaultFeaturesLayer &&
    YMapDefaultSchemeLayer &&
    YMapMarker &&
    YMapDefaultMarker &&
    YMapListener &&
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
        <YMapListener layer='any' onClick={handleClick} />
        <YMapDefaultMarker
          coordinates={reactify.useDefault(location.center, [
            location.center[0],
            location.center[1],
          ])}
        ></YMapDefaultMarker>
      </YMap>
    )
  );
};

export default WorldMap;
