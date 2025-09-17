import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { 
  getWelcomeBackData, 
  setWelcomeBackData, 
  shouldShowWelcomeBack,
  getVisitCount,
  getUserInsights,
  trackUserActivity
} from '../utils/websiteCookies';
import { FaHeart, FaShoppingBag, FaEye, FaSearch, FaTimes, FaUser, FaClock } from 'react-icons/fa';

const WelcomeBack = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [welcomeData, setWelcomeData] = useState(null);
  const [insights, setInsights] = useState(null);
  const { user, isAuthenticated } = useAuth();
  const { showSuccess } = useNotification();

  useEffect(() => {
    const checkWelcomeBack = () => {
      if (shouldShowWelcomeBack()) {
        const data = getWelcomeBackData();
        const userInsights = getUserInsights();
        
        setWelcomeData(data);
        setInsights(userInsights);
        setIsVisible(true);
        
        // Update welcome back data
        setWelcomeBackData(user);
        
        // Track welcome back display
        trackUserActivity('welcome_back_displayed', {
          visitCount: data.visitCount,
          lastVisit: data.lastVisit,
          isAuthenticated
        });
      }
    };

    // Check after a short delay to ensure page is loaded
    const timer = setTimeout(checkWelcomeBack, 1000);
    return () => clearTimeout(timer);
  }, [user, isAuthenticated]);

  const handleClose = () => {
    setIsVisible(false);
    trackUserActivity('welcome_back_closed', { visitCount: welcomeData?.visitCount });
  };

  const getWelcomeMessage = () => {
    if (!welcomeData) return 'Welcome!';
    
    const visitCount = welcomeData.visitCount;
    const isFirstVisit = visitCount === 1;
    const isReturning = visitCount > 1;
    
    if (isAuthenticated && user) {
      if (isFirstVisit) {
        return `Welcome to Rebirth of a Queen, ${user.firstName}!`;
      } else if (isReturning) {
        return `Welcome back, ${user.firstName}!`;
      }
    } else {
      if (isFirstVisit) {
        return 'Welcome to Rebirth of a Queen!';
      } else if (isReturning) {
        return 'Welcome back!';
      }
    }
    
    return 'Welcome to Rebirth of a Queen!';
  };

  const getPersonalizedMessage = () => {
    if (!insights) return 'We\'re excited to have you here!';
    
    const { recentlyViewed, searchHistory, mostVisitedPages } = insights;
    
    if (recentlyViewed > 0) {
      return 'Continue exploring the products you\'ve been viewing!';
    } else if (searchHistory > 0) {
      return 'Check out our latest collections based on your interests!';
    } else if (mostVisitedPages.length > 0) {
      return 'Explore more of what you love on our website!';
    }
    
    return 'Discover our amazing products and services!';
  };

  const getQuickActions = () => {
    const actions = [];
    
    if (insights?.recentlyViewed > 0) {
      actions.push({
        icon: <FaEye />,
        title: 'Recently Viewed',
        description: `${insights.recentlyViewed} products`,
        action: () => {
          window.location.href = '/recently-viewed';
          trackUserActivity('welcome_back_action', { action: 'recently_viewed' });
        }
      });
    }
    
    if (insights?.searchHistory > 0) {
      actions.push({
        icon: <FaSearch />,
        title: 'Search History',
        description: `${insights.searchHistory} searches`,
        action: () => {
          window.location.href = '/search-history';
          trackUserActivity('welcome_back_action', { action: 'search_history' });
        }
      });
    }
    
    actions.push({
      icon: <FaShoppingBag />,
      title: 'Shop Now',
      description: 'Browse our products',
      action: () => {
        window.location.href = '/shop';
        trackUserActivity('welcome_back_action', { action: 'shop_now' });
      }
    });
    
    if (isAuthenticated) {
      actions.push({
        icon: <FaUser />,
        title: 'My Account',
        description: 'Manage your profile',
        action: () => {
          window.location.href = '/profile';
          trackUserActivity('welcome_back_action', { action: 'my_account' });
        }
      });
    }
    
    return actions;
  };

  if (!isVisible || !welcomeData) return null;

  const quickActions = getQuickActions();

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 10000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '20px',
        padding: '40px',
        maxWidth: '600px',
        width: '100%',
        maxHeight: '80vh',
        overflowY: 'auto',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        animation: 'slideInUp 0.5s ease-out'
      }}>
        {/* Close Button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#666',
            padding: '5px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#f0f0f0';
            e.target.style.color = '#333';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#666';
          }}
        >
          <FaTimes />
        </button>

        {/* Welcome Header */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            backgroundColor: '#e91e63',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            color: 'white',
            fontSize: '32px'
          }}>
            <FaHeart />
          </div>
          
          <h1 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#2c3e50',
            marginBottom: '10px'
          }}>
            {getWelcomeMessage()}
          </h1>
          
          <p style={{
            fontSize: '16px',
            color: '#7f8c8d',
            marginBottom: '20px'
          }}>
            {getPersonalizedMessage()}
          </p>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            fontSize: '14px',
            color: '#95a5a6'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <FaClock />
              <span>Visit #{welcomeData.visitCount}</span>
            </div>
            {welcomeData.lastVisit && (
              <div>
                Last visit: {new Date(welcomeData.lastVisit).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        {quickActions.length > 0 && (
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#2c3e50',
              marginBottom: '15px',
              textAlign: 'center'
            }}>
              Quick Actions
            </h3>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '15px'
            }}>
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  style={{
                    padding: '20px',
                    border: '2px solid #f0f0f0',
                    borderRadius: '12px',
                    background: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = '#e91e63';
                    e.target.style.backgroundColor = '#fdf2f8';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = '#f0f0f0';
                    e.target.style.backgroundColor = 'white';
                  }}
                >
                  <div style={{ fontSize: '24px', color: '#e91e63' }}>
                    {action.icon}
                  </div>
                  <div>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#2c3e50',
                      marginBottom: '5px'
                    }}>
                      {action.title}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: '#7f8c8d'
                    }}>
                      {action.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Personalized Recommendations */}
        {insights && (
          <div style={{
            backgroundColor: '#f8f9fa',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '20px'
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#2c3e50',
              marginBottom: '15px'
            }}>
              Your Activity Summary
            </h3>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: '15px'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#e91e63'
                }}>
                  {insights.recentlyViewed}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#7f8c8d'
                }}>
                  Products Viewed
                </div>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#e91e63'
                }}>
                  {insights.searchHistory}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#7f8c8d'
                }}>
                  Searches Made
                </div>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#e91e63'
                }}>
                  {insights.userEngagement}%
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#7f8c8d'
                }}>
                  Engagement
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '15px',
          justifyContent: 'center'
        }}>
          <button
            onClick={() => {
              window.location.href = '/shop';
              trackUserActivity('welcome_back_action', { action: 'explore_shop' });
            }}
            style={{
              padding: '12px 24px',
              backgroundColor: '#e91e63',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#c2185b';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#e91e63';
            }}
          >
            Explore Shop
          </button>
          
          <button
            onClick={handleClose}
            style={{
              padding: '12px 24px',
              backgroundColor: 'transparent',
              color: '#7f8c8d',
              border: '2px solid #e0e0e0',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#7f8c8d';
              e.target.style.color = '#2c3e50';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = '#e0e0e0';
              e.target.style.color = '#7f8c8d';
            }}
          >
            Continue Browsing
          </button>
        </div>
      </div>

      <style>
        {`
          @keyframes slideInUp {
            from {
              transform: translateY(50px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default WelcomeBack;
