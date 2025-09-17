import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  trackUserActivity, 
  trackPageView, 
  trackTimeOnPage, 
  trackScrollDepth,
  trackProductView,
  trackSearchQuery,
  setUserId,
  getSessionId
} from '../utils/websiteCookies';
import { useAuth } from '../context/AuthContext';

const UserActivityTracker = () => {
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  const pageStartTime = useRef(Date.now());
  const scrollDepth = useRef(0);
  const maxScrollDepth = useRef(0);
  const timeOnPageInterval = useRef(null);

  // Track page views
  useEffect(() => {
    const currentPath = location.pathname;
    
    // Track page view
    trackPageView(currentPath);
    
    // Reset page tracking variables
    pageStartTime.current = Date.now();
    scrollDepth.current = 0;
    maxScrollDepth.current = 0;
    
    // Track specific page types
    if (currentPath.includes('/product/')) {
      const productId = currentPath.split('/product/')[1];
      trackUserActivity('product_page_view', { productId, path: currentPath });
    } else if (currentPath === '/shop') {
      trackUserActivity('shop_page_view', { path: currentPath });
    } else if (currentPath === '/cart') {
      trackUserActivity('cart_page_view', { path: currentPath });
    } else if (currentPath === '/checkout') {
      trackUserActivity('checkout_page_view', { path: currentPath });
    } else if (currentPath === '/profile') {
      trackUserActivity('profile_page_view', { path: currentPath });
    }
    
    // Set user ID if authenticated
    if (isAuthenticated && user) {
      setUserId(user._id);
    }
    
    console.log('📊 Page tracked:', currentPath);
  }, [location.pathname, isAuthenticated, user]);

  // Track time on page
  useEffect(() => {
    // Start time tracking
    timeOnPageInterval.current = setInterval(() => {
      const timeOnPage = Date.now() - pageStartTime.current;
      if (timeOnPage > 5000) { // Only track if more than 5 seconds
        trackTimeOnPage();
      }
    }, 10000); // Check every 10 seconds

    // Cleanup on unmount
    return () => {
      if (timeOnPageInterval.current) {
        clearInterval(timeOnPageInterval.current);
        // Track final time on page
        const finalTimeOnPage = Date.now() - pageStartTime.current;
        if (finalTimeOnPage > 5000) {
          trackUserActivity('page_exit', { 
            timeOnPage: finalTimeOnPage,
            path: location.pathname 
          });
        }
      }
    };
  }, [location.pathname]);

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      const currentScrollDepth = Math.round((scrollTop / (documentHeight - windowHeight)) * 100);
      scrollDepth.current = currentScrollDepth;
      
      if (currentScrollDepth > maxScrollDepth.current) {
        maxScrollDepth.current = currentScrollDepth;
        trackScrollDepth(currentScrollDepth);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Track user interactions
  useEffect(() => {
    const handleClick = (event) => {
      const target = event.target;
      const tagName = target.tagName.toLowerCase();
      
      // Track different types of clicks
      if (tagName === 'button' || tagName === 'a') {
        const text = target.textContent?.trim() || target.getAttribute('aria-label') || 'Unknown';
        const href = target.getAttribute('href');
        const className = target.className;
        
        trackUserActivity('click', {
          element: tagName,
          text: text.substring(0, 50), // Limit text length
          href: href,
          className: className,
          path: location.pathname
        });
      }
    };

    const handleFormSubmit = (event) => {
      const form = event.target;
      const formId = form.id || form.className || 'unknown';
      
      trackUserActivity('form_submit', {
        formId: formId,
        path: location.pathname
      });
    };

    const handleInputFocus = (event) => {
      const input = event.target;
      const inputType = input.type || 'text';
      const inputName = input.name || input.id || 'unknown';
      
      trackUserActivity('input_focus', {
        inputType: inputType,
        inputName: inputName,
        path: location.pathname
      });
    };

    // Add event listeners
    document.addEventListener('click', handleClick, { passive: true });
    document.addEventListener('submit', handleFormSubmit, { passive: true });
    document.addEventListener('focus', handleInputFocus, { passive: true });
    
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('submit', handleFormSubmit);
      document.removeEventListener('focus', handleInputFocus);
    };
  }, [location.pathname]);

  // Track window events
  useEffect(() => {
    const handleBeforeUnload = () => {
      const timeOnPage = Date.now() - pageStartTime.current;
      trackUserActivity('page_unload', {
        timeOnPage: timeOnPage,
        maxScrollDepth: maxScrollDepth.current,
        path: location.pathname
      });
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        trackUserActivity('page_hidden', {
          timeOnPage: Date.now() - pageStartTime.current,
          path: location.pathname
        });
      } else {
        trackUserActivity('page_visible', {
          path: location.pathname
        });
        pageStartTime.current = Date.now(); // Reset time when page becomes visible
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [location.pathname]);

  // Track search functionality
  useEffect(() => {
    // Override search functions to track searches
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
      const [url] = args;
      
      // Check if this is a search request
      if (url.includes('/api/search') || url.includes('/api/products?search=')) {
        const searchParams = new URLSearchParams(url.split('?')[1]);
        const query = searchParams.get('search') || searchParams.get('q');
        
        if (query) {
          trackSearchQuery(query);
        }
      }
      
      return originalFetch.apply(this, args);
    };
    
    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  // Track product views (when product data is available)
  useEffect(() => {
    // This will be called by components that display products
    window.trackProductView = (product) => {
      trackProductView(product);
    };
    
    return () => {
      delete window.trackProductView;
    };
  }, []);

  // Track user authentication events
  useEffect(() => {
    if (isAuthenticated && user) {
      trackUserActivity('user_authenticated', {
        userId: user._id,
        userEmail: user.email,
        path: location.pathname
      });
    } else if (!isAuthenticated) {
      trackUserActivity('user_unauthenticated', {
        path: location.pathname
      });
    }
  }, [isAuthenticated, user, location.pathname]);

  // Track session information
  useEffect(() => {
    const sessionId = getSessionId();
    trackUserActivity('session_start', {
      sessionId: sessionId,
      userAgent: navigator.userAgent,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language
    });
  }, []);

  // This component doesn't render anything
  return null;
};

export default UserActivityTracker;
