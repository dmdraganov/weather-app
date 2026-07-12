import {
  YMap,
  YMapComponentsProvider,
  YMapDefaultFeaturesLayer,
  YMapDefaultSchemeLayer,
  YMapDefaultMarker,
  YMapListener,
} from 'ymap3-components';
import type {
  YMapTheme,
  DomEvent,
  DomEventHandlerObject,
  LngLat,
} from '@yandex/ymaps3-types';
import styles from './WorldMap.module.scss';
import { useCurrentLocation } from '../../model/store/useCurrentLocation';
import { useReverseGeocodeLocation } from '../../api/geocode/hooks/useReverseGeocodeLocation';
import { useEffect, useMemo, useCallback } from 'react';
import { useLanguage } from '../../../localization/hooks/useLanguage';
import { mapLanguageToLocale } from '../../../localization/utils/language.mapper';
import { getEnv } from '../../../../shared/config/get-env';
import type { Coordinates } from '../../model/entities/coordinates';
import type { YMapLocation } from '@yandex/ymaps3-types/imperative/YMap';
import { useTheme } from '../../../../modules/theme/model/context/useTheme';

const DEFAULT_CENTER: LngLat = [40.52, 34.34];
const ZOOM = 10;

const mapToLngLatArray = (coordinates: Coordinates): LngLat => {
  return [coordinates.longitude, coordinates.latitude];
};

const WorldMap = () => {
  const [currentLocation, setCurrentLocation] = useCurrentLocation();
  const { setCoordinates, data } = useReverseGeocodeLocation();
  const { resolvedTheme } = useTheme();
  const [language] = useLanguage();
  const locale = mapLanguageToLocale(language);

  useEffect(() => {
    if (!data) return;
    setCurrentLocation(data);
  }, [data, currentLocation, setCurrentLocation]);

  const yMapLocation = useMemo<YMapLocation>(() => {
    const center = currentLocation
      ? mapToLngLatArray(currentLocation.coordinates)
      : DEFAULT_CENTER;
    return {
      center,
      zoom: ZOOM,
    };
  }, [currentLocation]);

  const handleClick = useCallback(
    (_object: DomEventHandlerObject, e: DomEvent) => {
      const [lon, lat] = e.coordinates;
      setCoordinates({ latitude: lat, longitude: lon });
    },
    [setCoordinates]
  );

  return (
    <YMapComponentsProvider apiKey={getEnv('VITE_MAPS_API_KEY')} lang={locale}>
      <YMap
        location={yMapLocation}
        theme={resolvedTheme as YMapTheme}
        className={styles.map}
      >
        <YMapDefaultSchemeLayer />
        <YMapDefaultFeaturesLayer />
        <YMapListener layer='any' onClick={handleClick} />
        <YMapDefaultMarker coordinates={yMapLocation.center} />
      </YMap>
    </YMapComponentsProvider>
  );
};

export default WorldMap;
