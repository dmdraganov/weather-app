import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Location } from './location.model';

interface LocationState {
  currentLocation: Location | null;
  favoriteLocations: Location[];
  recentLocations: Location[];
  setCurrentLocation: (location: Location | null) => void;
  toggleFavorite: (location: Location) => void;
  addRecentLocation: (locations: Location) => void;
}

const MAX_RECENT_LOCATIONS = 5;

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      currentLocation: null,
      favoriteLocations: [],
      recentLocations: [],
      setCurrentLocation: (location) =>
        set((state) => {
          if (!location) return { currentLocation: null };
          state.addRecentLocation(location);
          return {
            currentLocation: location,
          };
        }),
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
      addRecentLocation: (location) =>
        set((state) => {
          const isAlreadyRecent = state.recentLocations.some(
            (l) => l.id === location.id
          );
          const newRecent = isAlreadyRecent
            ? state.recentLocations
            : [location, ...state.recentLocations].slice(
                0,
                MAX_RECENT_LOCATIONS
              );
          return { recentLocations: newRecent };
        }),
    }),
    {
      name: 'location-storage',
    }
  )
);
