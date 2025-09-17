// Cookie management utility for user-specific cart and favorites
// This provides the same functionality as localStorage but using cookies

// Cookie helper functions
export const setCookie = (name, value, days = 20) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${encodeURIComponent(JSON.stringify(value))};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

export const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      try {
        return JSON.parse(decodeURIComponent(c.substring(nameEQ.length, c.length)));
      } catch (error) {
        console.error('Error parsing cookie:', error);
        return null;
      }
    }
  }
  return null;
};

export const deleteCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

export const getAllCookies = () => {
  const cookies = {};
  document.cookie.split(';').forEach(cookie => {
    const [name, value] = cookie.trim().split('=');
    if (name && value) {
      try {
        cookies[name] = JSON.parse(decodeURIComponent(value));
      } catch (error) {
        cookies[name] = decodeURIComponent(value);
      }
    }
  });
  return cookies;
};

// Cart and Favorites specific cookie functions
export const getCartStorageKey = (userId) => `cart_${userId}`;
export const getGuestCartStorageKey = () => 'cart_guest';
export const getFavoritesStorageKey = (userId) => `favorites_${userId}`;
export const getGuestFavoritesStorageKey = () => 'favorites_guest';

export const saveCartToCookie = (userId, cartData, days = 20) => {
  try {
    const storageKey = userId ? getCartStorageKey(userId) : getGuestCartStorageKey();
    const dataToSave = {
      items: cartData,
      timestamp: Date.now(),
      userId: userId || 'guest'
    };
    setCookie(storageKey, dataToSave, days);
    console.log(`✅ Cart saved to cookie: ${storageKey}`);
  } catch (error) {
    console.error('Error saving cart to cookie:', error);
  }
};

export const loadCartFromCookie = (userId) => {
  try {
    const storageKey = userId ? getCartStorageKey(userId) : getGuestCartStorageKey();
    const savedData = getCookie(storageKey);
    
    if (savedData) {
      // Check if data is expired (20 days)
      const now = Date.now();
      const twentyDaysInMs = 20 * 24 * 60 * 60 * 1000;
      if ((now - savedData.timestamp) > twentyDaysInMs) {
        deleteCookie(storageKey);
        console.log(`⏰ Cart cookie expired: ${storageKey}`);
        return [];
      }
      
      // Verify the data belongs to the current user
      if (savedData.userId === (userId || 'guest')) {
        console.log(`📦 Cart loaded from cookie: ${storageKey} (${savedData.items?.length || 0} items)`);
        return savedData.items || [];
      }
    }
  } catch (error) {
    console.error('Error loading cart from cookie:', error);
  }
  return [];
};

export const clearCartFromCookie = (userId) => {
  try {
    const storageKey = userId ? getCartStorageKey(userId) : getGuestCartStorageKey();
    deleteCookie(storageKey);
    console.log(`🗑️ Cart cookie deleted: ${storageKey}`);
  } catch (error) {
    console.error('Error clearing cart from cookie:', error);
  }
};

export const saveFavoritesToCookie = (userId, favoritesData, days = 20) => {
  try {
    const storageKey = userId ? getFavoritesStorageKey(userId) : getGuestFavoritesStorageKey();
    const dataToSave = {
      items: favoritesData,
      timestamp: Date.now(),
      userId: userId || 'guest'
    };
    setCookie(storageKey, dataToSave, days);
    console.log(`✅ Favorites saved to cookie: ${storageKey}`);
  } catch (error) {
    console.error('Error saving favorites to cookie:', error);
  }
};

export const loadFavoritesFromCookie = (userId) => {
  try {
    const storageKey = userId ? getFavoritesStorageKey(userId) : getGuestFavoritesStorageKey();
    const savedData = getCookie(storageKey);
    
    if (savedData) {
      // Check if data is expired (20 days)
      const now = Date.now();
      const twentyDaysInMs = 20 * 24 * 60 * 60 * 1000;
      if ((now - savedData.timestamp) > twentyDaysInMs) {
        deleteCookie(storageKey);
        console.log(`⏰ Favorites cookie expired: ${storageKey}`);
        return [];
      }
      
      // Verify the data belongs to the current user
      if (savedData.userId === (userId || 'guest')) {
        console.log(`❤️ Favorites loaded from cookie: ${storageKey} (${savedData.items?.length || 0} items)`);
        return savedData.items || [];
      }
    }
  } catch (error) {
    console.error('Error loading favorites from cookie:', error);
  }
  return [];
};

export const clearFavoritesFromCookie = (userId) => {
  try {
    const storageKey = userId ? getFavoritesStorageKey(userId) : getGuestFavoritesStorageKey();
    deleteCookie(storageKey);
    console.log(`🗑️ Favorites cookie deleted: ${storageKey}`);
  } catch (error) {
    console.error('Error clearing favorites from cookie:', error);
  }
};

// Utility function to check all cart/favorites cookies
export const checkAllCartFavoritesCookies = () => {
  console.log('🍪 Checking all Cart & Favorites Cookies:');
  console.log('==========================================');
  
  const allCookies = getAllCookies();
  const cartCookies = Object.keys(allCookies).filter(key => key.startsWith('cart_'));
  const favoritesCookies = Object.keys(allCookies).filter(key => key.startsWith('favorites_'));
  
  console.log(`📦 Cart Cookies (${cartCookies.length}):`);
  cartCookies.forEach(key => {
    const data = allCookies[key];
    if (data && data.timestamp) {
      const age = Date.now() - data.timestamp;
      const daysOld = Math.floor(age / (24 * 60 * 60 * 1000));
      const isExpired = age > (20 * 24 * 60 * 60 * 1000);
      console.log(`  - ${key}: ${data.items?.length || 0} items, ${daysOld} days old, ${isExpired ? 'EXPIRED' : 'VALID'}`);
    }
  });
  
  console.log(`❤️ Favorites Cookies (${favoritesCookies.length}):`);
  favoritesCookies.forEach(key => {
    const data = allCookies[key];
    if (data && data.timestamp) {
      const age = Date.now() - data.timestamp;
      const daysOld = Math.floor(age / (24 * 60 * 60 * 1000));
      const isExpired = age > (20 * 24 * 60 * 60 * 1000);
      console.log(`  - ${key}: ${data.items?.length || 0} items, ${daysOld} days old, ${isExpired ? 'EXPIRED' : 'VALID'}`);
    }
  });
  
  return {
    cartCookies: cartCookies.length,
    favoritesCookies: favoritesCookies.length,
    totalCookies: cartCookies.length + favoritesCookies.length
  };
};

// Function to clean up expired cookies
export const cleanupExpiredCookies = () => {
  console.log('🧹 Cleaning up expired cookies...');
  
  const allCookies = getAllCookies();
  const cartFavoritesKeys = Object.keys(allCookies).filter(key => 
    key.startsWith('cart_') || key.startsWith('favorites_')
  );
  
  let cleanedCount = 0;
  cartFavoritesKeys.forEach(key => {
    const data = allCookies[key];
    if (data && data.timestamp) {
      const age = Date.now() - data.timestamp;
      const twentyDaysInMs = 20 * 24 * 60 * 60 * 1000;
      if (age > twentyDaysInMs) {
        deleteCookie(key);
        cleanedCount++;
        console.log(`🗑️ Deleted expired cookie: ${key}`);
      }
    }
  });
  
  console.log(`✅ Cleaned up ${cleanedCount} expired cookies`);
  return cleanedCount;
};
