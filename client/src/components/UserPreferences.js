import React, { useState, useEffect } from 'react';
import { 
  getUserPreferences, 
  setUserPreference, 
  getThemePreference, 
  setThemePreference,
  getLanguagePreference,
  setLanguagePreference,
  getNewsletterPreference,
  setNewsletterPreference,
  getNotificationPreference,
  setNotificationPreference,
  getUserInsights,
  trackUserActivity
} from '../utils/websiteCookies';
import { FaPalette, FaLanguage, FaBell, FaEnvelope, FaCog, FaSave, FaEye } from 'react-icons/fa';

const UserPreferences = ({ isOpen, onClose }) => {
  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'en',
    newsletter: { subscribed: false, frequency: 'weekly' },
    notifications: { enabled: true, types: ['email', 'browser'] }
  });
  
  const [insights, setInsights] = useState(null);
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    if (isOpen) {
      // Load current preferences
      const currentPreferences = {
        theme: getThemePreference(),
        language: getLanguagePreference(),
        newsletter: getNewsletterPreference(),
        notifications: getNotificationPreference()
      };
      
      setPreferences(currentPreferences);
      
      // Load user insights
      const userInsights = getUserInsights();
      setInsights(userInsights);
      
      // Track preferences page view
      trackUserActivity('preferences_page_view');
    }
  }, [isOpen]);

  const handlePreferenceChange = (category, key, value) => {
    setPreferences(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const handleSavePreferences = () => {
    // Save theme preference
    setThemePreference(preferences.theme);
    
    // Save language preference
    setLanguagePreference(preferences.language);
    
    // Save newsletter preference
    setNewsletterPreference(preferences.newsletter.subscribed, preferences.newsletter.frequency);
    
    // Save notification preference
    setNotificationPreference(preferences.notifications.enabled, preferences.notifications.types);
    
    // Track preference changes
    trackUserActivity('preferences_saved', {
      theme: preferences.theme,
      language: preferences.language,
      newsletter: preferences.newsletter,
      notifications: preferences.notifications
    });
    
    // Apply theme immediately
    document.documentElement.setAttribute('data-theme', preferences.theme);
    
    onClose();
  };

  if (!isOpen) return null;

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
        padding: '0',
        maxWidth: '800px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{
          padding: '30px 30px 20px',
          borderBottom: '1px solid #e0e0e0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#2c3e50',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <FaCog />
            User Preferences
          </h2>
          
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#7f8c8d',
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
              e.target.style.color = '#7f8c8d';
            }}
          >
            ×
          </button>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid #e0e0e0',
          padding: '0 30px'
        }}>
          {[
            { id: 'general', label: 'General', icon: <FaCog /> },
            { id: 'appearance', label: 'Appearance', icon: <FaPalette /> },
            { id: 'notifications', label: 'Notifications', icon: <FaBell /> },
            { id: 'insights', label: 'My Activity', icon: <FaEye /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '15px 20px',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                borderBottom: activeTab === tab.id ? '2px solid #e91e63' : '2px solid transparent',
                color: activeTab === tab.id ? '#e91e63' : '#7f8c8d',
                fontWeight: activeTab === tab.id ? '600' : '400',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '30px'
        }}>
          {activeTab === 'general' && (
            <div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#2c3e50',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <FaLanguage />
                General Settings
              </h3>
              
              <div style={{ marginBottom: '25px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#2c3e50',
                  marginBottom: '8px'
                }}>
                  Language
                </label>
                <select
                  value={preferences.language}
                  onChange={(e) => handlePreferenceChange('language', 'language', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    backgroundColor: 'white'
                  }}
                >
                  <option value="en">English</option>
                  <option value="sw">Swahili</option>
                  <option value="fr">French</option>
                </select>
              </div>
              
              <div style={{ marginBottom: '25px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#2c3e50',
                  marginBottom: '8px'
                }}>
                  Newsletter Subscription
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <input
                    type="checkbox"
                    checked={preferences.newsletter.subscribed}
                    onChange={(e) => handlePreferenceChange('newsletter', 'subscribed', e.target.checked)}
                    style={{ transform: 'scale(1.2)' }}
                  />
                  <span style={{ fontSize: '14px', color: '#2c3e50' }}>
                    Subscribe to our newsletter
                  </span>
                </div>
                
                {preferences.newsletter.subscribed && (
                  <div style={{ marginTop: '10px' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '12px',
                      color: '#7f8c8d',
                      marginBottom: '5px'
                    }}>
                      Frequency
                    </label>
                    <select
                      value={preferences.newsletter.frequency}
                      onChange={(e) => handlePreferenceChange('newsletter', 'frequency', e.target.value)}
                      style={{
                        padding: '8px',
                        border: '1px solid #e0e0e0',
                        borderRadius: '6px',
                        fontSize: '12px',
                        backgroundColor: 'white'
                      }}
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#2c3e50',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <FaPalette />
                Appearance
              </h3>
              
              <div style={{ marginBottom: '25px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#2c3e50',
                  marginBottom: '15px'
                }}>
                  Theme
                </label>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                  gap: '15px'
                }}>
                  {[
                    { value: 'light', label: 'Light', preview: '#ffffff' },
                    { value: 'dark', label: 'Dark', preview: '#2c3e50' },
                    { value: 'auto', label: 'Auto', preview: 'linear-gradient(45deg, #ffffff 50%, #2c3e50 50%)' }
                  ].map(theme => (
                    <button
                      key={theme.value}
                      onClick={() => handlePreferenceChange('theme', 'theme', theme.value)}
                      style={{
                        padding: '15px',
                        border: preferences.theme === theme.value ? '2px solid #e91e63' : '2px solid #e0e0e0',
                        borderRadius: '12px',
                        background: 'white',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '10px'
                      }}
                    >
                      <div
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          background: theme.preview,
                          border: '1px solid #e0e0e0'
                        }}
                      />
                      <span style={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#2c3e50'
                      }}>
                        {theme.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#2c3e50',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <FaBell />
                Notifications
              </h3>
              
              <div style={{ marginBottom: '25px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                  <input
                    type="checkbox"
                    checked={preferences.notifications.enabled}
                    onChange={(e) => handlePreferenceChange('notifications', 'enabled', e.target.checked)}
                    style={{ transform: 'scale(1.2)' }}
                  />
                  <span style={{ fontSize: '14px', color: '#2c3e50', fontWeight: '600' }}>
                    Enable Notifications
                  </span>
                </div>
                
                {preferences.notifications.enabled && (
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '12px',
                      color: '#7f8c8d',
                      marginBottom: '10px'
                    }}>
                      Notification Types
                    </label>
                    
                    {[
                      { value: 'email', label: 'Email Notifications' },
                      { value: 'browser', label: 'Browser Notifications' },
                      { value: 'sms', label: 'SMS Notifications' }
                    ].map(type => (
                      <div key={type.value} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                        <input
                          type="checkbox"
                          checked={preferences.notifications.types.includes(type.value)}
                          onChange={(e) => {
                            const types = e.target.checked
                              ? [...preferences.notifications.types, type.value]
                              : preferences.notifications.types.filter(t => t !== type.value);
                            handlePreferenceChange('notifications', 'types', types);
                          }}
                        />
                        <span style={{ fontSize: '12px', color: '#2c3e50' }}>
                          {type.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'insights' && insights && (
            <div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#2c3e50',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <FaEye />
                My Activity Insights
              </h3>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '20px',
                marginBottom: '30px'
              }}>
                <div style={{
                  padding: '20px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '12px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#e91e63',
                    marginBottom: '5px'
                  }}>
                    {insights.totalActivities}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#7f8c8d'
                  }}>
                    Total Activities
                  </div>
                </div>
                
                <div style={{
                  padding: '20px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '12px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#e91e63',
                    marginBottom: '5px'
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
                
                <div style={{
                  padding: '20px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '12px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#e91e63',
                    marginBottom: '5px'
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
                
                <div style={{
                  padding: '20px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '12px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#e91e63',
                    marginBottom: '5px'
                  }}>
                    {insights.userEngagement}%
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#7f8c8d'
                  }}>
                    Engagement Score
                  </div>
                </div>
              </div>
              
              {insights.mostVisitedPages.length > 0 && (
                <div>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#2c3e50',
                    marginBottom: '15px'
                  }}>
                    Most Visited Pages
                  </h4>
                  
                  <div style={{
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                    padding: '15px'
                  }}>
                    {insights.mostVisitedPages.map(([page, visits], index) => (
                      <div key={page} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '8px 0',
                        borderBottom: index < insights.mostVisitedPages.length - 1 ? '1px solid #e0e0e0' : 'none'
                      }}>
                        <span style={{ fontSize: '14px', color: '#2c3e50' }}>
                          {page}
                        </span>
                        <span style={{ fontSize: '12px', color: '#7f8c8d' }}>
                          {visits} visits
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '20px 30px',
          borderTop: '1px solid #e0e0e0',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '15px'
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '12px 24px',
              backgroundColor: 'transparent',
              color: '#7f8c8d',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              fontSize: '14px',
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
            Cancel
          </button>
          
          <button
            onClick={handleSavePreferences}
            style={{
              padding: '12px 24px',
              backgroundColor: '#e91e63',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#c2185b';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#e91e63';
            }}
          >
            <FaSave />
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPreferences;
