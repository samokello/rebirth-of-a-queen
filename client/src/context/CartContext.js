import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { API_MAIN } from '../api';
import { useNotification } from './NotificationContext';

const CartContext = createContext();

// Helper functions for localStorage management
const getStorageKey = (userId) => `cart_${userId}`;
const getGuestStorageKey = () => 'cart_guest';

const isDataExpired = (timestamp) => {
  const now = Date.now();
  const twentyDaysInMs = 20 * 24 * 60 * 60 * 1000; // 20 days in milliseconds
  return (now - timestamp) > twentyDaysInMs;
};

const saveToLocalStorage = (userId, cartData) => {
  try {
    const storageKey = userId ? getStorageKey(userId) : getGuestStorageKey();
    const dataToSave = {
      items: cartData,
      timestamp: Date.now(),
      userId: userId || 'guest'
    };
    localStorage.setItem(storageKey, JSON.stringify(dataToSave));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

const loadFromLocalStorage = (userId) => {
  try {
    const storageKey = userId ? getStorageKey(userId) : getGuestStorageKey();
    const savedData = localStorage.getItem(storageKey);
    
    if (savedData) {
      const parsed = JSON.parse(savedData);
      
      // Check if data is expired
      if (isDataExpired(parsed.timestamp)) {
        localStorage.removeItem(storageKey);
        return [];
      }
      
      // Verify the data belongs to the current user
      if (parsed.userId === (userId || 'guest')) {
        return parsed.items || [];
      }
    }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
  }
  return [];
};

const clearUserCartFromStorage = (userId) => {
  try {
    const storageKey = userId ? getStorageKey(userId) : getGuestStorageKey();
    localStorage.removeItem(storageKey);
  } catch (error) {
    console.error('Error clearing cart from localStorage:', error);
  }
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item.product._id === action.payload.product._id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.product._id === action.payload.product._id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
        };
      } else {
        return {
          ...state,
          items: [...state.items, action.payload]
        };
      }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.product._id !== action.payload)
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.product._id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };

    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload || []
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: []
  });
  const { isAuthenticated, user } = useAuth();
  const { showSuccess } = useNotification();

  // Load cart from localStorage and server when user changes
  useEffect(() => {
    const loadCart = async () => {
      const userId = user?._id;
      
      if (isAuthenticated && userId) {
        // For authenticated users: if guest cart exists, merge it into server first
        const guestItems = loadFromLocalStorage(null);
        if (guestItems && guestItems.length > 0) {
          try {
            for (const gi of guestItems) {
              const productId = gi.product?._id;
              const quantity = gi.quantity || 1;
              if (productId) {
                await API_MAIN.post('/auth/cart/add', { productId, quantity });
              }
            }
            // Clear guest storage after merge
            clearUserCartFromStorage(null);
            showSuccess('Synced your cart', { duration: 3000 });
          } catch (mergeErr) {
            // Best-effort merge; continue to load server cart regardless
          }
        }

        // Then load server cart (source of truth)
        try {
          const res = await API_MAIN.get('/auth/cart');
          if (res.data?.success) {
            const serverItems = (res.data.data?.cart || []).map((ci) => ({ product: ci.product, quantity: ci.quantity }));
            dispatch({ type: 'LOAD_CART', payload: serverItems });
            // Save to localStorage for offline access
            saveToLocalStorage(userId, serverItems);
            return;
          }
          
          // Fallback: try /auth/me
          const me = await API_MAIN.get('/auth/me');
          const meCart = me.data?.data?.user?.cart || [];
          if (meCart.length) {
            const items = meCart.map((ci) => ({ product: ci.product, quantity: ci.quantity }));
            dispatch({ type: 'LOAD_CART', payload: items });
            saveToLocalStorage(userId, items);
            return;
          }
        } catch (error) {
          console.log('Server cart unavailable, loading from localStorage');
        }
        
        // If server fails, load from localStorage
        const localItems = loadFromLocalStorage(userId);
        if (localItems.length > 0) {
          dispatch({ type: 'LOAD_CART', payload: localItems });
        }
      } else {
        // For guests: load from localStorage only
        const localItems = loadFromLocalStorage(null);
        dispatch({ type: 'LOAD_CART', payload: localItems });
      }
    };
    
    loadCart();
  }, [isAuthenticated, user?._id, showSuccess]);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    const userId = user?._id;
    if (state.items.length > 0) {
      saveToLocalStorage(userId, state.items);
    }
  }, [state.items, user?._id]);

  const addToCart = async (product, quantity = 1) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } });
    if (isAuthenticated) {
      try {
        await API_MAIN.post('/auth/cart/add', { productId: product._id, quantity });
      } catch (_) { /* best-effort */ }
    }
  };

  const removeFromCart = async (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    if (isAuthenticated) {
      try { await API_MAIN.delete(`/auth/cart/remove/${productId}`); } catch (_) {}
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: { productId, quantity }
      });
      if (isAuthenticated) {
        try { await API_MAIN.post('/auth/cart/add', { productId, quantity }); } catch (_) {}
      }
    }
  };

  const clearCart = async () => {
    dispatch({ type: 'CLEAR_CART' });
    const userId = user?._id;
    clearUserCartFromStorage(userId);
    // Optionally call server to clear cart if endpoint exists
  };

  const getCartTotal = () => {
    return state.items.reduce((total, item) => {
      const price = item.product?.price || 0;
      const quantity = item.quantity || 0;
      return total + (price * quantity);
    }, 0);
  };

  const getCartItemCount = () => {
    return state.items.reduce((count, item) => count + (item.quantity || 0), 0);
  };

  const value = {
    items: state.items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 