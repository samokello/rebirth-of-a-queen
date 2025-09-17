import React, { useState, useEffect } from 'react';
import { FaCookie, FaCog, FaCheck, FaTimes } from 'react-icons/fa';
import { getCookieConsent, hasCookieConsent } from '../utils/websiteCookies';
import CookiePreferences from './CookiePreferences';

const CookieStatus = () => {
  const [showPreferences, setShowPreferences] = useState(false);
  const [consentStatus, setConsentStatus] = useState(null);

  useEffect(() => {
    const checkConsentStatus = () => {
      const hasConsent = hasCookieConsent();
      const consent = getCookieConsent();
      
      setConsentStatus({
        hasConsent,
        settings: consent.settings || {}
      });
    };

    checkConsentStatus();
    
    // Check status every 5 seconds in case it changes
    const interval = setInterval(checkConsentStatus, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    if (!consentStatus?.hasConsent) return '#f39c12'; // Orange - no consent
    if (consentStatus.settings?.analytics || consentStatus.settings?.marketing) return '#27ae60'; // Green - full consent
    return '#3498db'; // Blue - partial consent
  };

  const getStatusText = () => {
    if (!consentStatus?.hasConsent) return 'Cookies Not Set';
    if (consentStatus.settings?.analytics && consentStatus.settings?.marketing) return 'All Cookies Active';
    if (consentStatus.settings?.analytics || consentStatus.settings?.marketing) return 'Some Cookies Active';
    return 'Only Necessary Cookies';
  };

  const getStatusIcon = () => {
    if (!consentStatus?.hasConsent) return <FaTimes />;
    if (consentStatus.settings?.analytics && consentStatus.settings?.marketing) return <FaCheck />;
    return <FaCookie />;
  };

  if (!consentStatus) return null;

  return (
    <>
      <button
        onClick={() => setShowPreferences(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          backgroundColor: getStatusColor(),
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          transition: 'all 0.3s ease',
          zIndex: 9999
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.1)';
          e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        }}
        title={`Cookie Status: ${getStatusText()}. Click to manage preferences.`}
      >
        {getStatusIcon()}
      </button>

      {/* Tooltip on hover */}
      <div
        style={{
          position: 'fixed',
          bottom: '90px',
          right: '20px',
          backgroundColor: '#2c3e50',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '6px',
          fontSize: '12px',
          whiteSpace: 'nowrap',
          opacity: 0,
          pointerEvents: 'none',
          transition: 'opacity 0.3s ease',
          zIndex: 9998
        }}
        className="cookie-tooltip"
      >
        {getStatusText()}
        <div style={{
          position: 'absolute',
          bottom: '-4px',
          right: '20px',
          width: 0,
          height: 0,
          borderLeft: '4px solid transparent',
          borderRight: '4px solid transparent',
          borderTop: '4px solid #2c3e50'
        }} />
      </div>

      {/* Cookie Preferences Modal */}
      <CookiePreferences 
        isOpen={showPreferences} 
        onClose={() => setShowPreferences(false)} 
      />

      <style>
        {`
          button:hover + .cookie-tooltip {
            opacity: 1 !important;
          }
        `}
      </style>
    </>
  );
};

export default CookieStatus;
