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
import { useLocationByCoordinates } from '../../hooks/useLocationByCoordinates';
import { useEffect, useMemo } from 'react';

const DEFAULT_LOCATION: YMapLocation = { center: [40.52, 34.34], zoom: 2 };
const ZOOM = 10;

const WorldMap = () => {
  const [currentLocation, setCurrentLocation] = useCurrentLocation();
  const { setCoordinates, data } = useLocationByCoordinates();

  useEffect(() => {
    if (data) {
      setCurrentLocation(data);
    }
  }, [data, currentLocation, setCurrentLocation]);

  const location = useMemo<YMapLocation>(() => {
    if (!currentLocation) return DEFAULT_LOCATION;
    return {
      center: [
        currentLocation.coordinates.longitude,
        currentLocation.coordinates.latitude,
      ],
      zoom: ZOOM,
    };
  }, [currentLocation]);

  const handleClick = (_object: DomEventHandlerObject, e: DomEvent) => {
    const [lon, lat] = e.coordinates;
    setCoordinates({ latitude: lat, longitude: lon });
  };

  if (
    YMap &&
    YMapDefaultFeaturesLayer &&
    YMapDefaultSchemeLayer &&
    YMapMarker &&
    YMapDefaultMarker &&
    YMapListener &&
    reactify
  ) {
    return (
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
    );
  }
};

export default WorldMap;
