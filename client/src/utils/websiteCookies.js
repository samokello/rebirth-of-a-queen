// Comprehensive Website Cookie Management System
// Tracks all user activities, preferences, and provides personalized experiences

// Cookie utility functions
export const setCookie = (name, value, days = 30, options = {}) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));

  const isSecureContext = typeof window !== 'undefined' && window.location && window.location.protocol === 'https:';

  const cookieOptions = {
    expires: expires.toUTCString(),
    path: '/',
    SameSite: 'Lax',
    secure: isSecureContext,
    // domain: undefined, // optionally pass a domain in options.domain if needed
    ...options
  };

  let stringifiedValue;
  try {
    stringifiedValue = JSON.stringify(value);
  } catch (_) {
    stringifiedValue = String(value);
  }

  // Enforce a conservative size limit to avoid exceeding ~4KB per cookie
  // 3800 bytes leaves room for name and attributes
  const maxBytes = 3800;
  let encodedValue = encodeURIComponent(stringifiedValue);
  if (encodedValue.length > maxBytes) {
    // Truncate safely
    encodedValue = encodedValue.slice(0, maxBytes);
  }

  let cookieString = `${name}=${encodedValue};expires=${cookieOptions.expires};path=${cookieOptions.path};SameSite=${cookieOptions.SameSite}`;

  if (cookieOptions.secure) {
    cookieString += ';secure';
  }

  if (cookieOptions.domain) {
    cookieString += `;domain=${cookieOptions.domain}`;
  }

  // Note: httpOnly cannot be set from client-side JavaScript; it must be set by the server.

  try {
    document.cookie = cookieString;
  } catch (error) {
    console.error('Failed to set cookie:', error);
  }
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

export const deleteCookie = (name, options = {}) => {
  const isSecureContext = typeof window !== 'undefined' && window.location && window.location.protocol === 'https:';
  const cookieOptions = {
    path: '/',
    SameSite: 'Lax',
    secure: isSecureContext,
    ...options
  };

  let cookieString = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=${cookieOptions.path};SameSite=${cookieOptions.SameSite}`;

  if (cookieOptions.secure) {
    cookieString += ';secure';
  }
  if (cookieOptions.domain) {
    cookieString += `;domain=${cookieOptions.domain}`;
  }

  try {
    document.cookie = cookieString;
  } catch (error) {
    console.error('Failed to delete cookie:', error);
  }
};

export const getAllCookies = () => {
  const cookies = {};
  if (document.cookie) {
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
  }
  return cookies;
};

// User Activity Tracking
export const trackUserActivity = (activity, data = {}) => {
  // Check if user has consented to analytics cookies
  const consent = getCookieConsent();
  if (!consent || !consent.accepted || !consent.settings?.analytics) {
    console.log('Analytics tracking disabled - user has not consented');
    return null;
  }
  
  const userId = getCookie('user_id') || 'guest';
  const sessionId = getCookie('session_id') || generateSessionId();
  
  const activityData = {
    activity,
    data,
    timestamp: Date.now(),
    userId,
    sessionId,
    userAgent: navigator.userAgent,
    url: window.location.href,
    referrer: document.referrer
  };
  
  // Store in session cookie (expires when browser closes)
  const sessionActivities = getCookie('session_activities') || [];
  sessionActivities.push(activityData);
  
  // Keep only last 50 activities to prevent cookie size issues
  if (sessionActivities.length > 50) {
    sessionActivities.splice(0, sessionActivities.length - 50);
  }
  
  setCookie('session_activities', sessionActivities, 0); // Session cookie
  
  // Store in persistent cookie for analytics
  const persistentActivities = getCookie('user_activities') || [];
  persistentActivities.push(activityData);
  
  // Keep only last 100 activities
  if (persistentActivities.length > 100) {
    persistentActivities.splice(0, persistentActivities.length - 100);
  }
  
  setCookie('user_activities', persistentActivities, 30);
  
  return activityData;
};

// Welcome Back System
export const setWelcomeBackData = (userData) => {
  const welcomeData = {
    lastVisit: Date.now(),
    visitCount: getVisitCount() + 1,
    userData,
    preferences: getUserPreferences(),
    lastPage: window.location.pathname
  };
  
  setCookie('welcome_back', welcomeData, 365); // Keep for 1 year
  trackUserActivity('welcome_back_set', { visitCount: welcomeData.visitCount });
};

export const getWelcomeBackData = () => {
  return getCookie('welcome_back') || {
    lastVisit: null,
    visitCount: 0,
    userData: null,
    preferences: {},
    lastPage: null
  };
};

export const shouldShowWelcomeBack = () => {
  const welcomeData = getWelcomeBackData();
  const now = Date.now();
  const lastVisit = welcomeData.lastVisit;
  
  if (!lastVisit) return false;
  
  // Show welcome back if:
  // 1. More than 1 hour since last visit
  // 2. More than 1 day since last visit
  // 3. First visit of the day
  const oneHour = 60 * 60 * 1000;
  const oneDay = 24 * 60 * 60 * 1000;
  
  return (now - lastVisit) > oneHour || (now - lastVisit) > oneDay;
};

export const getVisitCount = () => {
  const welcomeData = getWelcomeBackData();
  return welcomeData.visitCount || 0;
};

// User Preferences Management
export const setUserPreference = (key, value) => {
  // Check if user has consented to preferences cookies
  const consent = getCookieConsent();
  if (!consent || !consent.accepted || !consent.settings?.preferences) {
    console.log('Preferences cookies disabled - user has not consented');
    return;
  }
  
  const preferences = getUserPreferences();
  preferences[key] = {
    value,
    timestamp: Date.now()
  };
  
  setCookie('user_preferences', preferences, 365);
  trackUserActivity('preference_set', { key, value });
};

export const getUserPreference = (key, defaultValue = null) => {
  const preferences = getUserPreferences();
  return preferences[key]?.value || defaultValue;
};

export const getUserPreferences = () => {
  return getCookie('user_preferences') || {};
};

// Theme and UI Preferences
export const setThemePreference = (theme) => {
  setUserPreference('theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
};

export const getThemePreference = () => {
  return getUserPreference('theme', 'light');
};

export const setLanguagePreference = (language) => {
  setUserPreference('language', language);
};

export const getLanguagePreference = () => {
  return getUserPreference('language', 'en');
};

// Shopping Behavior Tracking
export const trackProductView = (product) => {
  // Check if user has consented to analytics cookies
  const consent = getCookieConsent();
  if (!consent || !consent.accepted || !consent.settings?.analytics) {
    console.log('Product tracking disabled - user has not consented');
    return;
  }
  
  const viewData = {
    productId: product._id,
    productName: product.name,
    category: product.category,
    price: product.price,
    timestamp: Date.now()
  };
  
  trackUserActivity('product_view', viewData);
  
  // Store in recently viewed products
  const recentlyViewed = getCookie('recently_viewed') || [];
  const existingIndex = recentlyViewed.findIndex(item => item.productId === product._id);
  
  if (existingIndex !== -1) {
    recentlyViewed.splice(existingIndex, 1);
  }
  
  recentlyViewed.unshift(viewData);
  
  // Keep only last 20 products
  if (recentlyViewed.length > 20) {
    recentlyViewed.splice(20);
  }
  
  setCookie('recently_viewed', recentlyViewed, 30);
};

export const getRecentlyViewed = () => {
  return getCookie('recently_viewed') || [];
};

export const trackSearchQuery = (query, results = []) => {
  const searchData = {
    query,
    resultsCount: results.length,
    timestamp: Date.now()
  };
  
  trackUserActivity('search', searchData);
  
  // Store in search history
  const searchHistory = getCookie('search_history') || [];
  searchHistory.unshift(searchData);
  
  // Keep only last 50 searches
  if (searchHistory.length > 50) {
    searchHistory.splice(50);
  }
  
  setCookie('search_history', searchHistory, 30);
};

export const getSearchHistory = () => {
  return getCookie('search_history') || [];
};

// User Engagement Tracking
export const trackPageView = (page) => {
  const pageData = {
    page,
    timestamp: Date.now(),
    timeOnPage: getTimeOnPage(),
    scrollDepth: getScrollDepth()
  };
  
  trackUserActivity('page_view', pageData);
  
  // Update page visit count
  const pageVisits = getCookie('page_visits') || {};
  pageVisits[page] = (pageVisits[page] || 0) + 1;
  setCookie('page_visits', pageVisits, 30);
};

export const trackTimeOnPage = () => {
  const startTime = getCookie('page_start_time') || Date.now();
  const timeOnPage = Date.now() - startTime;
  
  setCookie('page_start_time', Date.now(), 0); // Session cookie
  
  if (timeOnPage > 5000) { // Only track if more than 5 seconds
    trackUserActivity('time_on_page', { timeOnPage });
  }
};

export const trackScrollDepth = (depth) => {
  const maxDepth = getCookie('max_scroll_depth') || 0;
  if (depth > maxDepth) {
    setCookie('max_scroll_depth', depth, 0); // Session cookie
    trackUserActivity('scroll_depth', { depth });
  }
};

// Newsletter and Communication Preferences
export const setNewsletterPreference = (subscribed, frequency = 'weekly') => {
  setUserPreference('newsletter', { subscribed, frequency });
  trackUserActivity('newsletter_preference', { subscribed, frequency });
};

export const getNewsletterPreference = () => {
  return getUserPreference('newsletter', { subscribed: false, frequency: 'weekly' });
};

export const setNotificationPreference = (enabled, types = []) => {
  setUserPreference('notifications', { enabled, types });
  trackUserActivity('notification_preference', { enabled, types });
};

export const getNotificationPreference = () => {
  return getUserPreference('notifications', { enabled: true, types: ['email', 'browser'] });
};

// Session Management
export const generateSessionId = () => {
  return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

export const getSessionId = () => {
  let sessionId = getCookie('session_id');
  if (!sessionId) {
    sessionId = generateSessionId();
    setCookie('session_id', sessionId, 0); // Session cookie
  }
  return sessionId;
};

export const setUserId = (userId) => {
  setCookie('user_id', userId, 365);
  trackUserActivity('user_login', { userId });
};

export const getUserId = () => {
  return getCookie('user_id');
};

// Analytics and Insights
export const getUserInsights = () => {
  const activities = getCookie('user_activities') || [];
  const preferences = getUserPreferences();
  const recentlyViewed = getRecentlyViewed();
  const searchHistory = getSearchHistory();
  const pageVisits = getCookie('page_visits') || {};
  
  return {
    totalActivities: activities.length,
    preferences,
    recentlyViewed: recentlyViewed.length,
    searchHistory: searchHistory.length,
    mostVisitedPages: Object.entries(pageVisits)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5),
    lastActivity: activities[activities.length - 1],
    userEngagement: calculateEngagementScore(activities)
  };
};

export const calculateEngagementScore = (activities) => {
  if (!activities.length) return 0;
  
  const engagementActivities = ['product_view', 'search', 'page_view', 'time_on_page'];
  const engagementCount = activities.filter(activity => 
    engagementActivities.includes(activity.activity)
  ).length;
  
  return Math.min(100, Math.round((engagementCount / activities.length) * 100));
};

// Cookie Consent Management
export const setCookieConsent = (consent) => {
  setCookie('cookie_consent', consent, 365);
  // Don't track consent setting to avoid circular dependency
  console.log('Cookie consent updated:', consent);
};

export const getCookieConsent = () => {
  return getCookie('cookie_consent') || { accepted: false, timestamp: null };
};

export const hasCookieConsent = () => {
  const consent = getCookieConsent();
  return consent && consent.accepted === true;
};

// Utility functions
export const getTimeOnPage = () => {
  const startTime = getCookie('page_start_time') || Date.now();
  return Date.now() - startTime;
};

export const getScrollDepth = () => {
  return getCookie('max_scroll_depth') || 0;
};

// Cleanup functions
export const cleanupExpiredCookies = () => {
  const cookiesToCheck = [
    'user_activities',
    'recently_viewed',
    'search_history',
    'page_visits'
  ];
  
  cookiesToCheck.forEach(cookieName => {
    const data = getCookie(cookieName);
    if (data && Array.isArray(data)) {
      // Remove activities older than 30 days
      const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
      const filteredData = data.filter(item => item.timestamp > thirtyDaysAgo);
      
      if (filteredData.length !== data.length) {
        setCookie(cookieName, filteredData, 30);
        console.log(`Cleaned up ${data.length - filteredData.length} expired items from ${cookieName}`);
      }
    }
  });
};

// Initialize website cookies
export const initializeWebsiteCookies = () => {
  const consent = getCookieConsent();
  
  // Always set session ID (necessary for basic functionality)
  getSessionId();
  
  // Set page start time (necessary for basic functionality)
  setCookie('page_start_time', Date.now(), 0);
  
  // Only track analytics if user has consented
  if (consent && consent.accepted && consent.settings?.analytics) {
    trackPageView(window.location.pathname);
    console.log('🍪 Analytics cookies initialized');
  } else {
    console.log('🍪 Basic cookies initialized (analytics disabled)');
  }
  
  // Cleanup expired cookies
  cleanupExpiredCookies();
};

// Export all functions for easy access
const websiteCookies = {
  // Core cookie functions
  setCookie,
  getCookie,
  deleteCookie,
  getAllCookies,
  
  // Activity tracking
  trackUserActivity,
  trackProductView,
  trackSearchQuery,
  trackPageView,
  trackTimeOnPage,
  trackScrollDepth,
  
  // Welcome back system
  setWelcomeBackData,
  getWelcomeBackData,
  shouldShowWelcomeBack,
  getVisitCount,
  
  // User preferences
  setUserPreference,
  getUserPreference,
  getUserPreferences,
  setThemePreference,
  getThemePreference,
  setLanguagePreference,
  getLanguagePreference,
  
  // Shopping behavior
  getRecentlyViewed,
  getSearchHistory,
  
  // Communication preferences
  setNewsletterPreference,
  getNewsletterPreference,
  setNotificationPreference,
  getNotificationPreference,
  
  // Session management
  generateSessionId,
  getSessionId,
  setUserId,
  getUserId,
  
  // Analytics
  getUserInsights,
  calculateEngagementScore,
  
  // Cookie consent
  setCookieConsent,
  getCookieConsent,
  hasCookieConsent,
  
  // Utilities
  getTimeOnPage,
  getScrollDepth,
  cleanupExpiredCookies,
  initializeWebsiteCookies
};

export default websiteCookies;
