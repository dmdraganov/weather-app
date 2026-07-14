import {
  YMap,
  YMapComponentsProvider,
  YMapDefaultFeaturesLayer,
  YMapDefaultSchemeLayer,
  YMapDefaultMarker,
  YMapListener,
} from 'ymap3-components';
import type {
  DomEvent,
  DomEventHandlerObject,
  LngLat,
} from '@yandex/ymaps3-types';
import styles from './WorldMap.module.scss';
import { useCurrentLocation } from '../../model/store/useCurrentLocation';
import { useReverseGeocodeLocationMutation } from '../../api/geocode/hooks/useReverseGeocodeLocation';
import { useMemo, useCallback } from 'react';
import { useLanguage } from '../../../../shared/i18n/useLanguage';
import { mapLanguageToLocale } from '../../../../shared/i18n/map-language-to-locale';
import { getEnv } from '../../../../shared/config/get-env';
import type { Coordinates } from '../../../../shared/model/coordinates';
import type { YMapLocation } from '@yandex/ymaps3-types/imperative/YMap';
import { useTheme } from '../../../../shared/theme/useTheme';
import { useChangeCurrentLocation } from '../../hooks/useChangeLocation';

const DEFAULT_CENTER: LngLat = [40.52, 34.34];
const ZOOM = 10;

const mapToLngLatArray = (coordinates: Coordinates): LngLat => {
  return [coordinates.longitude, coordinates.latitude];
};

const WorldMap = () => {
  const [currentLocation] = useCurrentLocation();
  const changeCurrentLocation = useChangeCurrentLocation();
  const { mutate: reverseGeocodeLocation } =
    useReverseGeocodeLocationMutation();
  const { resolvedTheme } = useTheme();
  const [language] = useLanguage();
  const locale = mapLanguageToLocale(language);

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
      reverseGeocodeLocation(
        { latitude: lat, longitude: lon },
        { onSuccess: changeCurrentLocation }
      );
    },
    [changeCurrentLocation, reverseGeocodeLocation]
  );

  return (
    <YMapComponentsProvider apiKey={getEnv('VITE_MAPS_API_KEY')} lang={locale}>
      <YMap
        location={yMapLocation}
        theme={resolvedTheme}
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
