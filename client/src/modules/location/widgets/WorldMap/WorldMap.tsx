import {
  YMap,
  YMapComponentsProvider,
  YMapDefaultFeaturesLayer,
  YMapDefaultSchemeLayer,
  YMapDefaultMarker,
  YMapListener,
} from 'ymap3-components';
import type {
  YMapLocationRequest,
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

const DEFAULT_CENTER: LngLat = [40.52, 34.34];
const DEFAULT_LOCATION: YMapLocationRequest = {
  center: DEFAULT_CENTER,
  zoom: 2,
};
const ZOOM = 10;

const WorldMap = () => {
  const [currentLocation, setCurrentLocation] = useCurrentLocation();
  const { setCoordinates, data } = useReverseGeocodeLocation();
  const [language] = useLanguage();
  const locale = useMemo(() => mapLanguageToLocale(language), [language]);

  useEffect(() => {
    if (data) {
      setCurrentLocation(data);
    }
  }, [data, currentLocation, setCurrentLocation]);

  const center = useMemo<LngLat>(() => {
    if (!currentLocation) return DEFAULT_CENTER;
    return [
      currentLocation.coordinates.longitude,
      currentLocation.coordinates.latitude,
    ];
  }, [currentLocation]);

  const location = useMemo<YMapLocationRequest>(
    () => ({
      center,
      zoom: ZOOM,
    }),
    [center]
  );

  const handleClick = useCallback(
    (_object: DomEventHandlerObject, e: DomEvent) => {
      const [lon, lat] = e.coordinates;
      setCoordinates({ latitude: lat, longitude: lon });
    },
    [setCoordinates]
  );

  return (
    <YMapComponentsProvider apiKey={getEnv('VITE_MAPS_API_KEY')} lang={locale}>
      <YMap location={location} className={styles.map}>
        <YMapDefaultSchemeLayer />
        <YMapDefaultFeaturesLayer />
        <YMapListener layer='any' onClick={handleClick} />
        <YMapDefaultMarker coordinates={center} />
      </YMap>
    </YMapComponentsProvider>
  );
};

export default WorldMap;
