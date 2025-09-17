import React, { useState, useEffect } from 'react';
import { FaCookie, FaCheck, FaTimes, FaCog, FaShieldAlt, FaEye, FaChartBar, FaBullhorn, FaUserCog } from 'react-icons/fa';
import { 
  getCookieConsent, 
  setCookieConsent, 
  hasCookieConsent,
  initializeWebsiteCookies,
  cleanupExpiredCookies
} from '../utils/websiteCookies';

const CookiePreferences = ({ isOpen, onClose }) => {
  const [consentSettings, setConsentSettings] = useState({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
    preferences: false
  });
  const [hasExistingConsent, setHasExistingConsent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const existingConsent = getCookieConsent();
      setHasExistingConsent(existingConsent.accepted);
      
      if (existingConsent.accepted && existingConsent.settings) {
        setConsentSettings(existingConsent.settings);
      }
    }
  }, [isOpen]);

  const handleSettingChange = (setting) => {
    if (setting === 'necessary') return; // Can't disable necessary cookies
    
    setConsentSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSavePreferences = () => {
    const consent = {
      accepted: true,
      timestamp: Date.now(),
      settings: consentSettings
    };
    
    setCookieConsent(consent);
    
    // Reinitialize cookies with new settings
    initializeWebsiteCookies();
    
    onClose();
  };

  const handleAcceptAll = () => {
    const consent = {
      accepted: true,
      timestamp: Date.now(),
      settings: {
        necessary: true,
        analytics: true,
        marketing: true,
        preferences: true
      }
    };
    
    setCookieConsent(consent);
    setConsentSettings(consent.settings);
    
    // Reinitialize cookies with new settings
    initializeWebsiteCookies();
    
    onClose();
  };

  const handleRejectAll = () => {
    const consent = {
      accepted: true,
      timestamp: Date.now(),
      settings: {
        necessary: true,
        analytics: false,
        marketing: false,
        preferences: false
      }
    };
    
    setCookieConsent(consent);
    setConsentSettings(consent.settings);
    
    // Clean up non-necessary cookies
    cleanupExpiredCookies();
    
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
        maxWidth: '700px',
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
            <FaShieldAlt />
            Cookie Preferences
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

        {/* Content */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '30px'
        }}>
          <div style={{
            backgroundColor: '#f8f9fa',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '25px'
          }}>
            <p style={{
              fontSize: '14px',
              color: '#2c3e50',
              margin: 0,
              lineHeight: '1.6'
            }}>
              We use cookies to enhance your browsing experience, provide personalized content, 
              and analyze our traffic. You can choose which types of cookies to accept. 
              <strong> Necessary cookies are required for the website to function properly.</strong>
            </p>
          </div>

          {/* Cookie Types */}
          <div style={{
            display: 'grid',
            gap: '20px',
            marginBottom: '30px'
          }}>
            {/* Necessary Cookies */}
            <div style={{
              border: '1px solid #e0e0e0',
              borderRadius: '12px',
              padding: '20px',
              backgroundColor: consentSettings.necessary ? '#f0f8ff' : '#f8f9fa'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '15px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: '#e91e63',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '16px'
                  }}>
                    <FaCookie />
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#2c3e50',
                      margin: '0 0 5px 0'
                    }}>
                      Necessary Cookies
                    </h3>
                    <p style={{
                      fontSize: '12px',
                      color: '#7f8c8d',
                      margin: 0
                    }}>
                      Always Active
                    </p>
                  </div>
                </div>
                <div style={{
                  width: '24px',
                  height: '24px',
                  backgroundColor: '#e91e63',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '12px'
                }}>
                  <FaCheck />
                </div>
              </div>
              <p style={{
                fontSize: '14px',
                color: '#2c3e50',
                margin: 0,
                lineHeight: '1.5'
              }}>
                Essential for website functionality, user authentication, security, and basic features. 
                These cookies cannot be disabled as they are required for the website to work properly.
              </p>
            </div>

            {/* Analytics Cookies */}
            <div style={{
              border: '1px solid #e0e0e0',
              borderRadius: '12px',
              padding: '20px',
              backgroundColor: consentSettings.analytics ? '#f0f8ff' : '#f8f9fa'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '15px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: consentSettings.analytics ? '#e91e63' : '#95a5a6',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '16px'
                  }}>
                    <FaChartBar />
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#2c3e50',
                      margin: '0 0 5px 0'
                    }}>
                      Analytics Cookies
                    </h3>
                    <p style={{
                      fontSize: '12px',
                      color: '#7f8c8d',
                      margin: 0
                    }}>
                      {consentSettings.analytics ? 'Active' : 'Inactive'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleSettingChange('analytics')}
                  style={{
                    width: '24px',
                    height: '24px',
                    backgroundColor: consentSettings.analytics ? '#e91e63' : '#e0e0e0',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {consentSettings.analytics && <FaCheck style={{ color: 'white', fontSize: '10px' }} />}
                </button>
              </div>
              <p style={{
                fontSize: '14px',
                color: '#2c3e50',
                margin: 0,
                lineHeight: '1.5'
              }}>
                Help us understand how visitors interact with our website by collecting and reporting 
                information anonymously. This helps us improve our website performance and user experience.
              </p>
            </div>

            {/* Marketing Cookies */}
            <div style={{
              border: '1px solid #e0e0e0',
              borderRadius: '12px',
              padding: '20px',
              backgroundColor: consentSettings.marketing ? '#f0f8ff' : '#f8f9fa'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '15px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: consentSettings.marketing ? '#e91e63' : '#95a5a6',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '16px'
                  }}>
                    <FaBullhorn />
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#2c3e50',
                      margin: '0 0 5px 0'
                    }}>
                      Marketing Cookies
                    </h3>
                    <p style={{
                      fontSize: '12px',
                      color: '#7f8c8d',
                      margin: 0
                    }}>
                      {consentSettings.marketing ? 'Active' : 'Inactive'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleSettingChange('marketing')}
                  style={{
                    width: '24px',
                    height: '24px',
                    backgroundColor: consentSettings.marketing ? '#e91e63' : '#e0e0e0',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {consentSettings.marketing && <FaCheck style={{ color: 'white', fontSize: '10px' }} />}
                </button>
              </div>
              <p style={{
                fontSize: '14px',
                color: '#2c3e50',
                margin: 0,
                lineHeight: '1.5'
              }}>
                Used to deliver personalized advertisements and track the effectiveness of our 
                marketing campaigns. These cookies may be set by our advertising partners.
              </p>
            </div>

            {/* Preferences Cookies */}
            <div style={{
              border: '1px solid #e0e0e0',
              borderRadius: '12px',
              padding: '20px',
              backgroundColor: consentSettings.preferences ? '#f0f8ff' : '#f8f9fa'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '15px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: consentSettings.preferences ? '#e91e63' : '#95a5a6',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '16px'
                  }}>
                    <FaUserCog />
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#2c3e50',
                      margin: '0 0 5px 0'
                    }}>
                      Preferences Cookies
                    </h3>
                    <p style={{
                      fontSize: '12px',
                      color: '#7f8c8d',
                      margin: 0
                    }}>
                      {consentSettings.preferences ? 'Active' : 'Inactive'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleSettingChange('preferences')}
                  style={{
                    width: '24px',
                    height: '24px',
                    backgroundColor: consentSettings.preferences ? '#e91e63' : '#e0e0e0',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {consentSettings.preferences && <FaCheck style={{ color: 'white', fontSize: '10px' }} />}
                </button>
              </div>
              <p style={{
                fontSize: '14px',
                color: '#2c3e50',
                margin: 0,
                lineHeight: '1.5'
              }}>
                Remember your preferences like language, theme, and personalized settings to provide 
                a customized experience on future visits.
              </p>
            </div>
          </div>

          {/* Current Status */}
          {hasExistingConsent && (
            <div style={{
              backgroundColor: '#e8f5e8',
              border: '1px solid #4caf50',
              borderRadius: '8px',
              padding: '15px',
              marginBottom: '20px'
            }}>
              <p style={{
                fontSize: '14px',
                color: '#2e7d32',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <FaCheck />
                You have already set your cookie preferences. Changes will be applied immediately.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '20px 30px',
          borderTop: '1px solid #e0e0e0',
          display: 'flex',
          justifyContent: 'space-between',
          gap: '15px',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handleRejectAll}
              style={{
                padding: '12px 20px',
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
              <FaTimes style={{ marginRight: '5px' }} />
              Reject All
            </button>
            
            <button
              onClick={handleAcceptAll}
              style={{
                padding: '12px 20px',
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
              <FaCheck style={{ marginRight: '5px' }} />
              Accept All
            </button>
          </div>
          
          <button
            onClick={handleSavePreferences}
            style={{
              padding: '12px 24px',
              backgroundColor: '#2c3e50',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#34495e';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#2c3e50';
            }}
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookiePreferences;
