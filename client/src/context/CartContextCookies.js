import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { API_MAIN } from '../api';
import { 
  saveCartToCookie, 
  loadCartFromCookie, 
  clearCartFromCookie 
} from '../utils/cookieManager';

const CartContext = createContext();

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

  // Load cart from cookies and server when user changes
  useEffect(() => {
    const loadCart = async () => {
      const userId = user?._id;
      
      if (isAuthenticated && userId) {
        // For authenticated users: try server first, then cookies
        try {
          const res = await API_MAIN.get('/auth/cart');
          if (res.data?.success) {
            const serverItems = (res.data.data?.cart || []).map((ci) => ({ product: ci.product, quantity: ci.quantity }));
            dispatch({ type: 'LOAD_CART', payload: serverItems });
            // Save to cookies for offline access
            saveCartToCookie(userId, serverItems);
            return;
          }
          
          // Fallback: try /auth/me
          const me = await API_MAIN.get('/auth/me');
          const meCart = me.data?.data?.user?.cart || [];
          if (meCart.length) {
            const items = meCart.map((ci) => ({ product: ci.product, quantity: ci.quantity }));
            dispatch({ type: 'LOAD_CART', payload: items });
            saveCartToCookie(userId, items);
            return;
          }
        } catch (error) {
          console.log('Server cart unavailable, loading from cookies');
        }
        
        // If server fails, load from cookies
        const cookieItems = loadCartFromCookie(userId);
        if (cookieItems.length > 0) {
          dispatch({ type: 'LOAD_CART', payload: cookieItems });
        }
      } else {
        // For guests: load from cookies only
        const cookieItems = loadCartFromCookie(null);
        dispatch({ type: 'LOAD_CART', payload: cookieItems });
      }
    };
    
    loadCart();
  }, [isAuthenticated, user?._id]);

  // Save to cookies whenever cart changes
  useEffect(() => {
    const userId = user?._id;
    if (state.items.length > 0) {
      saveCartToCookie(userId, state.items);
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
    clearCartFromCookie(userId);
    // Optionally call server to clear cart if endpoint exists
  };

  const getCartTotal = () => {
    return state.items.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  const getCartItemCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
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
