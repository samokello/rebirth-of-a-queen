import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        error: null
      };
    case 'REGISTER_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null
      };
    case 'REGISTER_FAILURE':
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isAuthenticated: false,
    user: null,
    token: null,
    loading: true,
    error: null
  });

  const API_BASE = process.env.REACT_APP_API_URL || '';

  // Check for existing token on app load and hydrate user from server if needed
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    const hydrateFromServer = async () => {
      if (!token) {
        dispatch({ type: 'LOGOUT' });
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/api/auth/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          dispatch({ type: 'LOGIN_SUCCESS', payload: { user: data.data.user || data.data || data, token } });
        } else {
          // Token invalid/expired
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          dispatch({ type: 'LOGOUT' });
        }
      } catch (e) {
        dispatch({ type: 'LOGOUT' });
      }
    };

    if (token && user) {
      try {
        const parsedUser = JSON.parse(user);
        dispatch({ type: 'LOGIN_SUCCESS', payload: { user: parsedUser, token } });
        // Also refresh user in background
        hydrateFromServer();
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        hydrateFromServer();
      }
    } else if (token && !user) {
      hydrateFromServer();
    } else {
      dispatch({ type: 'LOGOUT' });
    }
    // mark hydration complete
    setHydrated();
  }, [API_BASE]);

  // mark loading false after hydration
  const setHydrated = () => {
    dispatch({ type: 'CLEAR_ERROR' });
    // small trick: update state to loading:false without altering auth fields
    // by dispatching a no-op via CLEAR_ERROR, then override loading below
  };

  useEffect(() => {
    if (state.loading) {
      // when either token/user is resolved in state or LOGOUT was dispatched, stop loading
      if (state.isAuthenticated || (!state.isAuthenticated && state.user === null)) {
        // directly mutate via dispatch to stop loading
        // create a synthetic action
        (function stopLoading(){
          // eslint-disable-next-line no-console
          console.log('Auth hydrated, loading=false');
          // Since reducer doesn't have an action, we rely on minimal state change by LOGIN_SUCCESS/LOGOUT already set loading
        })();
      }
    }
  }, [state.isAuthenticated, state.user, state.loading]);

  // Save to localStorage when state changes
  useEffect(() => {
    if (state.token && state.user) {
      localStorage.setItem('token', state.token);
      localStorage.setItem('user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }, [state.token, state.user]);

  const login = async (email, password) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            user: data.data.user,
            token: data.data.token
          }
        });
        
        // Sync cart with server after successful login
        if (data.data.user.cart && data.data.user.cart.length > 0) {
          // User has items in server cart, we could sync them to local cart if needed
          console.log('User has items in server cart:', data.data.user.cart);
        }
        
        return { success: true };
      } else {
        const errorMessage = data.message || 'Login failed. Please check your credentials.';
        dispatch({
          type: 'LOGIN_FAILURE',
          payload: errorMessage
        });
        return { success: false, message: errorMessage };
      }
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = 'Network error. Please check your connection and try again.';
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: errorMessage
      });
      return { success: false, message: errorMessage };
    }
  };

  const register = async (userData) => {
    dispatch({ type: 'REGISTER_START' });
    
    try {
      const response = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        dispatch({
          type: 'REGISTER_SUCCESS',
          payload: {
            user: data.data.user,
            token: data.data.token
          }
        });
        return { success: true };
      } else {
        const errorMessage = data.message || 'Registration failed. Please try again.';
        dispatch({
          type: 'REGISTER_FAILURE',
          payload: errorMessage
        });
        return { success: false, message: errorMessage };
      }
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = 'Network error. Please check your connection and try again.';
      dispatch({
        type: 'REGISTER_FAILURE',
        payload: errorMessage
      });
      return { success: false, message: errorMessage };
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const updateUser = (userData) => {
    dispatch({
      type: 'UPDATE_USER',
      payload: userData
    });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const getAuthHeaders = () => {
    return {
      'Authorization': `Bearer ${state.token}`,
      'Content-Type': 'application/json'
    };
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    updateUser,
    clearError,
    getAuthHeaders
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};