import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaTimes, FaSpinner } from 'react-icons/fa';

const Notification = ({ 
  type = 'success', 
  message, 
  duration = 5000, 
  onClose, 
  show = true,
  position = 'top-right'
}) => {
  const [isVisible, setIsVisible] = useState(show);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      setIsExiting(false);
      
      if (duration > 0) {
        const timer = setTimeout(() => {
          handleClose();
        }, duration);
        
        return () => clearTimeout(timer);
      }
    }
  }, [show, duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, 300);
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheckCircle />;
      case 'error':
        return <FaExclamationTriangle />;
      case 'warning':
        return <FaExclamationTriangle />;
      case 'info':
        return <FaInfoCircle />;
      case 'loading':
        return <FaSpinner className="spinning" />;
      default:
        return <FaCheckCircle />;
    }
  };

  const getColors = () => {
    switch (type) {
      case 'success':
        return {
          background: 'linear-gradient(135deg, #27ae60, #2ecc71)',
          border: '#27ae60',
          icon: '#ffffff'
        };
      case 'error':
        return {
          background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
          border: '#e74c3c',
          icon: '#ffffff'
        };
      case 'warning':
        return {
          background: 'linear-gradient(135deg, #f39c12, #e67e22)',
          border: '#f39c12',
          icon: '#ffffff'
        };
      case 'info':
        return {
          background: 'linear-gradient(135deg, #3498db, #2980b9)',
          border: '#3498db',
          icon: '#ffffff'
        };
      case 'loading':
        return {
          background: 'linear-gradient(135deg, #9b59b6, #8e44ad)',
          border: '#9b59b6',
          icon: '#ffffff'
        };
      default:
        return {
          background: 'linear-gradient(135deg, #27ae60, #2ecc71)',
          border: '#27ae60',
          icon: '#ffffff'
        };
    }
  };

  const getPosition = () => {
    switch (position) {
      case 'top-left':
        return { top: '20px', left: '20px' };
      case 'top-center':
        return { top: '20px', left: '50%', transform: 'translateX(-50%)' };
      case 'top-right':
        return { top: '20px', right: '20px' };
      case 'bottom-left':
        return { bottom: '20px', left: '20px' };
      case 'bottom-center':
        return { bottom: '20px', left: '50%', transform: 'translateX(-50%)' };
      case 'bottom-right':
        return { bottom: '20px', right: '20px' };
      default:
        return { top: '20px', right: '20px' };
    }
  };

  if (!isVisible) return null;

  const colors = getColors();
  const positionStyle = getPosition();

  return (
    <>
      <div
        style={{
          position: 'fixed',
          ...positionStyle,
          zIndex: 10000,
          minWidth: '320px',
          maxWidth: '400px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          border: `2px solid ${colors.border}`,
          overflow: 'hidden',
          transform: isExiting ? 'translateX(100%)' : 'translateX(0)',
          opacity: isExiting ? 0 : 1,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          animation: isExiting ? 'none' : 'slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {/* Header with gradient background */}
        <div
          style={{
            background: colors.background,
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                color: colors.icon,
                fontSize: '20px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {getIcon()}
            </div>
            <div>
              <h4 style={{
                margin: 0,
                color: 'white',
                fontSize: '16px',
                fontWeight: '600',
                textTransform: 'capitalize'
              }}>
                {type === 'loading' ? 'Processing...' : type}
              </h4>
            </div>
          </div>
          <button
            onClick={handleClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(255,255,255,0.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            <FaTimes size={14} />
          </button>
        </div>

        {/* Message content */}
        <div style={{ padding: '16px 20px' }}>
          <p style={{
            margin: 0,
            color: '#2c3e50',
            fontSize: '14px',
            lineHeight: '1.5',
            fontWeight: '400'
          }}>
            {message}
          </p>
        </div>

        {/* Progress bar for auto-close */}
        {duration > 0 && (
          <div
            style={{
              height: '3px',
              background: colors.background,
              width: '100%',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                height: '100%',
                background: 'rgba(255,255,255,0.3)',
                width: '100%',
                animation: `shrink ${duration}ms linear forwards`
              }}
            />
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes slideInRight {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }

          @keyframes shrink {
            from {
              width: 100%;
            }
            to {
              width: 0%;
            }
          }

          .spinning {
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </>
  );
};

export default Notification;
