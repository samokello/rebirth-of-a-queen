import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { API_MAIN } from '../api';
import { useNotification } from './NotificationContext';

const FavoritesContext = createContext();

// Helper functions for localStorage management
const getFavoritesStorageKey = (userId) => `favorites_${userId}`;
const getGuestFavoritesStorageKey = () => 'favorites_guest';

const isFavoritesDataExpired = (timestamp) => {
  const now = Date.now();
  const twentyDaysInMs = 20 * 24 * 60 * 60 * 1000; // 20 days in milliseconds
  return (now - timestamp) > twentyDaysInMs;
};

const saveFavoritesToLocalStorage = (userId, favoritesData) => {
  try {
    const storageKey = userId ? getFavoritesStorageKey(userId) : getGuestFavoritesStorageKey();
    const dataToSave = {
      items: favoritesData,
      timestamp: Date.now(),
      userId: userId || 'guest'
    };
    localStorage.setItem(storageKey, JSON.stringify(dataToSave));
  } catch (error) {
    console.error('Error saving favorites to localStorage:', error);
  }
};

const loadFavoritesFromLocalStorage = (userId) => {
  try {
    const storageKey = userId ? getFavoritesStorageKey(userId) : getGuestFavoritesStorageKey();
    const savedData = localStorage.getItem(storageKey);
    
    if (savedData) {
      const parsed = JSON.parse(savedData);
      
      // Check if data is expired
      if (isFavoritesDataExpired(parsed.timestamp)) {
        localStorage.removeItem(storageKey);
        return [];
      }
      
      // Verify the data belongs to the current user
      if (parsed.userId === (userId || 'guest')) {
        return parsed.items || [];
      }
    }
  } catch (error) {
    console.error('Error loading favorites from localStorage:', error);
  }
  return [];
};

const clearUserFavoritesFromStorage = (userId) => {
  try {
    const storageKey = userId ? getFavoritesStorageKey(userId) : getGuestFavoritesStorageKey();
    localStorage.removeItem(storageKey);
  } catch (error) {
    console.error('Error clearing favorites from localStorage:', error);
  }
};

const favoritesReducer = (state, action) => {
  console.log('FavoritesReducer: Action:', action.type, 'Payload:', action.payload);
  switch (action.type) {
    case 'ADD_TO_FAVORITES':
      if (state.items.find(item => item._id === action.payload._id)) {
        console.log('FavoritesReducer: Product already in favorites, returning current state');
        return state; // Already in favorites
      }
      console.log('FavoritesReducer: Adding new product to favorites');
      return {
        ...state,
        items: [...state.items, action.payload]
      };

    case 'REMOVE_FROM_FAVORITES':
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload)
      };

    case 'CLEAR_FAVORITES':
      return {
        ...state,
        items: []
      };

    case 'LOAD_FAVORITES':
      return {
        ...state,
        items: action.payload || []
      };

    default:
      return state;
  }
};

export const FavoritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, {
    items: []
  });
  const { isAuthenticated, user } = useAuth();
  const { showSuccess } = useNotification();
  
  // Debug: Log authentication status
  console.log('FavoritesContext: isAuthenticated:', isAuthenticated);
  console.log('FavoritesContext: user:', user);
  console.log('FavoritesContext: token in localStorage:', localStorage.getItem('token'));

  // Load favorites from localStorage and server when user changes
  useEffect(() => {
    const loadFavorites = async () => {
      const userId = user?._id;
      
      if (isAuthenticated && userId) {
        // Merge any guest favorites into server
        const guestFavs = loadFavoritesFromLocalStorage(null);
        if (guestFavs && guestFavs.length > 0) {
          try {
            for (const pf of guestFavs) {
              if (pf?._id) {
                await API_MAIN.post('/auth/favorites/add', { productId: pf._id });
              }
            }
            clearUserFavoritesFromStorage(null);
            showSuccess('Synced your favorites', { duration: 3000 });
          } catch (_) {
            // best-effort merge
          }
        }

        // Then load server favorites
        try {
          console.log('FavoritesContext: Loading favorites from server...');
          const response = await API_MAIN.get('/auth/favorites');
          if (response.data.success) {
            const serverFavorites = response.data.data.favorites || [];
            // Normalize to array of Product objects for the UI/state
            const normalized = serverFavorites
              .map((fav) => fav && (fav.product || fav))
              .filter(Boolean);
            console.log('FavoritesContext: Loaded favorites (normalized):', normalized);
            dispatch({ type: 'LOAD_FAVORITES', payload: normalized });
            // Save to localStorage for offline access
            saveFavoritesToLocalStorage(userId, normalized);
            return;
          }
        } catch (error) {
          console.error('Error loading favorites from server:', error);
          console.log('Server favorites unavailable, loading from localStorage');
        }
        
        // If server fails, load from localStorage
        const localFavorites = loadFavoritesFromLocalStorage(userId);
        if (localFavorites.length > 0) {
          dispatch({ type: 'LOAD_FAVORITES', payload: localFavorites });
        }
      } else {
        // For guests: load from localStorage only
        const localFavorites = loadFavoritesFromLocalStorage(null);
        dispatch({ type: 'LOAD_FAVORITES', payload: localFavorites });
      }
    };

    loadFavorites();
  }, [isAuthenticated, user?._id, showSuccess]);

  const addToFavorites = async (product) => {
    console.log('FavoritesContext: Adding to favorites:', product.name, product._id);
    
    // Update local state immediately for better UX
    dispatch({
      type: 'ADD_TO_FAVORITES',
      payload: product
    });

    // Sync with server if authenticated
    if (isAuthenticated) {
      try {
        const response = await API_MAIN.post('/auth/favorites/add', {
          productId: product._id
        });

        if (!response.data.success) {
          console.error('Failed to add to favorites on server');
          // Revert local state if server call failed
          dispatch({
            type: 'REMOVE_FROM_FAVORITES',
            payload: product._id
          });
        }
      } catch (error) {
        console.error('Error adding to favorites:', error);
        console.error('Error response:', error.response?.data);
        console.error('Error status:', error.response?.status);
        // Revert local state if server call failed
        dispatch({
          type: 'REMOVE_FROM_FAVORITES',
          payload: product._id
        });
      }
    }
  };

  const removeFromFavorites = async (productId) => {
    // Update local state immediately
    dispatch({
      type: 'REMOVE_FROM_FAVORITES',
      payload: productId
    });

    // Sync with server if authenticated
    if (isAuthenticated) {
      try {
        const response = await API_MAIN.delete(`/auth/favorites/remove/${productId}`);

        if (!response.data.success) {
          console.error('Failed to remove from favorites on server');
        }
      } catch (error) {
        console.error('Error removing from favorites:', error);
      }
    }
  };

  // Save to localStorage whenever favorites change
  useEffect(() => {
    const userId = user?._id;
    if (state.items.length > 0) {
      saveFavoritesToLocalStorage(userId, state.items);
    }
  }, [state.items, user?._id]);

  const clearFavorites = () => {
    dispatch({ type: 'CLEAR_FAVORITES' });
    const userId = user?._id;
    clearUserFavoritesFromStorage(userId);
  };

  const isFavorite = (productId) => {
    return state.items.some(item => item._id === productId);
  };

  const toggleFavorite = async (product) => {
    console.log('FavoritesContext: Toggling favorite for:', product.name, 'Current favorites count:', state.items.length);
    if (isFavorite(product._id)) {
      console.log('FavoritesContext: Removing from favorites');
      await removeFromFavorites(product._id);
    } else {
      console.log('FavoritesContext: Adding to favorites');
      await addToFavorites(product);
    }
  };

  const value = {
    items: state.items,
    addToFavorites,
    removeFromFavorites,
    clearFavorites,
    isFavorite,
    toggleFavorite
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
