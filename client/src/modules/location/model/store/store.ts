import { create } from 'zustand';
import {
  createJSONStorage,
  persist,
  type StateStorage,
} from 'zustand/middleware';
import type { Location } from '../entities/location';

interface LocationState {
  currentLocation: Location | null;
  favoriteLocations: Location[];
  recentLocations: Location[];
  setCurrentLocation: (location: Location) => void;
  toggleFavorite: (location: Location) => void;
}

const MAX_RECENT_LOCATIONS = 5;

type PersistedLocationState = Pick<
  LocationState,
  'currentLocation' | 'favoriteLocations' | 'recentLocations'
>;

const safeLocalStorage: StateStorage<void> = {
  getItem: (name) => {
    try {
      return window.localStorage.getItem(name);
    } catch {
      return null;
    }
  },
  setItem: (name, value) => {
    try {
      window.localStorage.setItem(name, value);
    } catch {
      // Persistence is best-effort; in-memory state remains available.
    }
  },
  removeItem: (name) => {
    try {
      window.localStorage.removeItem(name);
    } catch {
      // Persistence is best-effort; in-memory state remains available.
    }
  },
};

const addToRecentLocations = (
  recentLocations: Location[],
  location: Location
): Location[] => {
  const withoutSelectedLocation = recentLocations.filter(
    (recentLocation) => recentLocation.id !== location.id
  );

  return [location, ...withoutSelectedLocation].slice(0, MAX_RECENT_LOCATIONS);
};

export const useLocationStore = create<LocationState>()(
  persist<LocationState, [], [], PersistedLocationState>(
    (set) => ({
      currentLocation: null,
      favoriteLocations: [],
      recentLocations: [],
      setCurrentLocation: (location) =>
        set((state) => ({
          currentLocation: location,
          recentLocations: addToRecentLocations(
            state.recentLocations,
            location
          ),
        })),
      toggleFavorite: (location) =>
        set((state) => {
          const isFavorite = state.favoriteLocations.some(
            (l) => l.id === location.id
          );
          const newFavorites = isFavorite
            ? state.favoriteLocations.filter((l) => l.id !== location.id)
            : [...state.favoriteLocations, location];

          return { favoriteLocations: newFavorites };
        }),
    }),
    {
      name: 'location-storage',
      storage: createJSONStorage(() => safeLocalStorage),
      partialize: ({
        currentLocation,
        favoriteLocations,
        recentLocations,
      }) => ({ currentLocation, favoriteLocations, recentLocations }),
    }
  )
);
