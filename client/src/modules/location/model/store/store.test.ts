/** @vitest-environment jsdom */

import { beforeEach, describe, expect, it } from 'vitest';
import type { Location } from '../entities/location';
import { useLocationStore } from './store';

const moscow: Location = {
  id: 'moscow',
  name: 'Moscow',
  description: 'Russia',
  coordinates: { latitude: 55.7558, longitude: 37.6173 },
};

const london: Location = {
  id: 'london',
  name: 'London',
  description: 'United Kingdom',
  coordinates: { latitude: 51.5072, longitude: -0.1276 },
};

describe('location store', () => {
  beforeEach(() => {
    localStorage.clear();
    useLocationStore.setState(useLocationStore.getInitialState(), true);
  });

  it('updates current and recent locations atomically', () => {
    let notifications = 0;
    const unsubscribe = useLocationStore.subscribe(() => {
      notifications += 1;
    });

    useLocationStore.getState().setCurrentLocation(moscow);
    unsubscribe();

    expect(notifications).toBe(1);
    expect(useLocationStore.getState().currentLocation).toEqual(moscow);
    expect(useLocationStore.getState().recentLocations).toEqual([moscow]);
  });

  it('moves a selected location to the front without duplicates', () => {
    const { setCurrentLocation } = useLocationStore.getState();

    setCurrentLocation(moscow);
    setCurrentLocation(london);
    setCurrentLocation(moscow);

    expect(useLocationStore.getState().recentLocations).toEqual([
      moscow,
      london,
    ]);
  });

  it('persists only location data', () => {
    useLocationStore.getState().setCurrentLocation(moscow);

    const persistedState = JSON.parse(
      localStorage.getItem('location-storage') ?? '{}'
    ) as {
      state?: Record<string, unknown>;
    };

    expect(Object.keys(persistedState.state ?? {})).toEqual([
      'currentLocation',
      'favoriteLocations',
      'recentLocations',
    ]);
  });
});
