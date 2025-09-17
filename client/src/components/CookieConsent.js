import React, { useState, useEffect } from 'react';
import { FaCookie, FaCheck, FaTimes, FaCog, FaShieldAlt } from 'react-icons/fa';
import { 
  setCookieConsent, 
  getCookieConsent, 
  hasCookieConsent,
  initializeWebsiteCookies 
} from '../utils/websiteCookies';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consentSettings, setConsentSettings] = useState({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
    preferences: false
  });

  useEffect(() => {
    // Check if user has already given consent
    if (!hasCookieConsent()) {
      setIsVisible(true);
    } else {
      // Initialize cookies if consent already given
      initializeWebsiteCookies();
    }
  }, []);

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
    setIsVisible(false);
    initializeWebsiteCookies();
  };

  const handleAcceptSelected = () => {
    const consent = {
      accepted: true,
      timestamp: Date.now(),
      settings: consentSettings
    };
    
    setCookieConsent(consent);
    setIsVisible(false);
    initializeWebsiteCookies();
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
    setIsVisible(false);
    // Only initialize necessary cookies
    initializeWebsiteCookies();
  };

  const toggleSetting = (setting) => {
    if (setting === 'necessary') return; // Can't disable necessary cookies
    
    setConsentSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
      borderTop: '1px solid #e0e0e0',
      boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.1)',
      zIndex: 10000,
      padding: '20px',
      maxHeight: '80vh',
      overflowY: 'auto'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
        flexWrap: 'wrap'
      }}>
        {!showDetails ? (
          // Simple consent view
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: 1 }}>
              <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#e91e63',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '18px'
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
                  We use cookies to enhance your experience
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#7f8c8d',
                  margin: 0,
                  lineHeight: '1.4'
                }}>
                  We use cookies to personalize content, analyze site traffic, and improve your browsing experience. 
                  By continuing to use our site, you consent to our use of cookies.
                </p>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <button
                onClick={() => setShowDetails(true)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: 'transparent',
                  color: '#7f8c8d',
                  border: '1px solid #e0e0e0',
                  borderRadius: '6px',
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
                <FaCog style={{ marginRight: '5px' }} />
                Customize
              </button>
              
              <button
                onClick={handleAcceptAll}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#e91e63',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
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
          </>
        ) : (
          // Detailed consent view
          <div style={{ width: '100%' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#2c3e50',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <FaShieldAlt />
                Cookie Preferences
              </h3>
              
              <button
                onClick={() => setShowDetails(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '20px',
                  cursor: 'pointer',
                  color: '#7f8c8d',
                  padding: '5px'
                }}
              >
                <FaTimes />
              </button>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px',
              marginBottom: '20px'
            }}>
              {/* Necessary Cookies */}
              <div style={{
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '15px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '10px'
                }}>
                  <h4 style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#2c3e50',
                    margin: 0
                  }}>
                    Necessary Cookies
                  </h4>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: '#e91e63',
                    borderRadius: '4px',
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
                  fontSize: '12px',
                  color: '#7f8c8d',
                  margin: 0,
                  lineHeight: '1.4'
                }}>
                  Essential for website functionality, user authentication, and security. Cannot be disabled.
                </p>
              </div>
              
              {/* Analytics Cookies */}
              <div style={{
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '15px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '10px'
                }}>
                  <h4 style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#2c3e50',
                    margin: 0
                  }}>
                    Analytics Cookies
                  </h4>
                  <button
                    onClick={() => toggleSetting('analytics')}
                    style={{
                      width: '20px',
                      height: '20px',
                      backgroundColor: consentSettings.analytics ? '#e91e63' : '#e0e0e0',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {consentSettings.analytics && <FaCheck style={{ color: 'white', fontSize: '10px' }} />}
                  </button>
                </div>
                <p style={{
                  fontSize: '12px',
                  color: '#7f8c8d',
                  margin: 0,
                  lineHeight: '1.4'
                }}>
                  Help us understand how visitors interact with our website to improve performance.
                </p>
              </div>
              
              {/* Marketing Cookies */}
              <div style={{
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '15px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '10px'
                }}>
                  <h4 style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#2c3e50',
                    margin: 0
                  }}>
                    Marketing Cookies
                  </h4>
                  <button
                    onClick={() => toggleSetting('marketing')}
                    style={{
                      width: '20px',
                      height: '20px',
                      backgroundColor: consentSettings.marketing ? '#e91e63' : '#e0e0e0',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {consentSettings.marketing && <FaCheck style={{ color: 'white', fontSize: '10px' }} />}
                  </button>
                </div>
                <p style={{
                  fontSize: '12px',
                  color: '#7f8c8d',
                  margin: 0,
                  lineHeight: '1.4'
                }}>
                  Used to deliver personalized advertisements and track campaign effectiveness.
                </p>
              </div>
              
              {/* Preferences Cookies */}
              <div style={{
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '15px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '10px'
                }}>
                  <h4 style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#2c3e50',
                    margin: 0
                  }}>
                    Preferences Cookies
                  </h4>
                  <button
                    onClick={() => toggleSetting('preferences')}
                    style={{
                      width: '20px',
                      height: '20px',
                      backgroundColor: consentSettings.preferences ? '#e91e63' : '#e0e0e0',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {consentSettings.preferences && <FaCheck style={{ color: 'white', fontSize: '10px' }} />}
                  </button>
                </div>
                <p style={{
                  fontSize: '12px',
                  color: '#7f8c8d',
                  margin: 0,
                  lineHeight: '1.4'
                }}>
                  Remember your preferences like language, theme, and personalized settings.
                </p>
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={handleRejectAll}
                style={{
                  padding: '10px 20px',
                  backgroundColor: 'transparent',
                  color: '#7f8c8d',
                  border: '1px solid #e0e0e0',
                  borderRadius: '6px',
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
                Reject All
              </button>
              
              <button
                onClick={handleAcceptSelected}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#e91e63',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
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
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieConsent;
