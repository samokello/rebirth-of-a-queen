import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FaEnvelope, FaSms, FaTimes, FaPaperPlane, FaUser, FaPhone, FaCalendar } from 'react-icons/fa';
import { useNotification } from '../context/NotificationContext';

const ApplicationResponseModal = ({ application, isOpen, onClose, onResponseSent }) => {
  const [emailResponse, setEmailResponse] = useState({
    subject: '',
    message: ''
  });
  const [smsResponse, setSmsResponse] = useState({
    message: ''
  });
  const [sending, setSending] = useState(false);
  const { showSuccess, showError } = useNotification();

  const handleEmailChange = (field, value) => {
    setEmailResponse(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSmsChange = (field, value) => {
    setSmsResponse(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSendResponse = async () => {
    if (!emailResponse.subject && !emailResponse.message && !smsResponse.message) {
      showError('Please provide at least one response (email or SMS)');
      return;
    }

    if (emailResponse.message && !emailResponse.subject) {
      showError('Please provide an email subject');
      return;
    }

    setSending(true);

    try {
      const token = localStorage.getItem('adminToken');
      const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

      const response = await fetch(`${API_BASE}/admin/applications/${application._id}/respond`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          emailResponse: emailResponse.subject && emailResponse.message ? emailResponse : null,
          smsResponse: smsResponse.message ? smsResponse : null
        })
      });

      if (response.ok) {
        const result = await response.json();
        
        let successMessage = 'Response sent successfully!';
        if (result.results.emailSent && result.results.smsSent) {
          successMessage = 'Email and SMS responses sent successfully!';
        } else if (result.results.emailSent) {
          successMessage = 'Email response sent successfully!';
        } else if (result.results.smsSent) {
          successMessage = 'SMS response sent successfully!';
        }

        showSuccess(successMessage);
        
        // Reset forms
        setEmailResponse({ subject: '', message: '' });
        setSmsResponse({ message: '' });
        
        // Notify parent component
        if (onResponseSent) {
          onResponseSent();
        }
        
        onClose();
      } else {
        const error = await response.json();
        showError(error.message || 'Failed to send response');
      }
    } catch (error) {
      console.error('Error sending response:', error);
      showError('Error sending response. Please try again.');
    } finally {
      setSending(false);
    }
  };

  // Lock background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      const handler = (e) => {
        if (e.key === 'Escape' && !sending) {
          onClose();
        }
      };
      window.addEventListener('keydown', handler);
      return () => {
        document.body.style.overflow = prev;
        window.removeEventListener('keydown', handler);
      };
    }
  }, [isOpen, onClose, sending]);

  if (!isOpen || !application) return null;

  return createPortal(
    <div
      onClick={() => { if (!sending) onClose(); }}
      role="dialog"
      aria-modal="true"
      style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      backdropFilter: 'blur(4px)',
      WebkitBackdropFilter: 'blur(4px)',
      zIndex: 2147483647,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
        backgroundColor: 'white',
        borderRadius: '20px',
        padding: '0',
        maxWidth: '860px',
        width: '100%',
        maxHeight: '88vh',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{
          padding: '24px 28px 18px',
          borderBottom: '1px solid #eef0f3',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #fff, #f9fafb)'
        }}>
          <div>
            <h2 style={{
              fontSize: '22px',
              fontWeight: 800,
              color: '#111827',
              margin: '0 0 4px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              letterSpacing: '-0.01em'
            }}>
              <FaPaperPlane />
              Respond to Application
            </h2>
            <p style={{
              fontSize: '13px',
              color: '#6b7280',
              margin: 0
            }}>
              Send a personalized response to {application.firstName} {application.lastName}
            </p>
          </div>
          
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '22px',
              cursor: 'pointer',
              color: '#6b7280',
              padding: '8px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              boxShadow: 'inset 0 0 0 1px #e5e7eb'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#f3f4f6';
              e.target.style.color = '#111827';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#6b7280';
            }}
          >
            <FaTimes />
          </button>
        </div>

        {/* Application Info */}
        <div style={{
          padding: '18px 28px',
          backgroundColor: '#f9fafb',
          borderBottom: '1px solid #eef0f3'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaUser style={{ color: '#ef476f' }} />
              <span style={{ fontSize: '14px', color: '#111827' }}>
                {application.firstName} {application.lastName}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaEnvelope style={{ color: '#ef476f' }} />
              <span style={{ fontSize: '14px', color: '#111827' }}>
                {application.email}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaPhone style={{ color: '#ef476f' }} />
              <span style={{ fontSize: '14px', color: '#111827' }}>
                {application.phone}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaCalendar style={{ color: '#ef476f' }} />
              <span style={{ fontSize: '14px', color: '#111827' }}>
                Applied: {new Date(application.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px 28px'
        }}>
          {/* Email Response */}
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#111827',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              letterSpacing: '-0.01em'
            }}>
              <FaEnvelope />
              Email Response
            </h3>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 600,
                color: '#374151',
                marginBottom: '8px'
              }}>
                Subject
              </label>
              <input
                type="text"
                value={emailResponse.subject}
                onChange={(e) => handleEmailChange('subject', e.target.value)}
                placeholder="e.g., Application Update - Rebirth of a Queen"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '14px',
                  backgroundColor: 'white',
                  outline: 'none',
                  boxShadow: '0 1px 1px rgba(0,0,0,0.02)'
                }}
              />
            </div>
            
            <div>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 600,
                color: '#374151',
                marginBottom: '8px'
              }}>
                Message
              </label>
              <textarea
                value={emailResponse.message}
                onChange={(e) => handleEmailChange('message', e.target.value)}
                placeholder="Write your response message here..."
                rows={6}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '14px',
                  backgroundColor: 'white',
                  resize: 'vertical',
                  outline: 'none',
                  boxShadow: '0 1px 1px rgba(0,0,0,0.02)'
                }}
              />
            </div>
          </div>

          {/* SMS Response */}
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#111827',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              letterSpacing: '-0.01em'
            }}>
              <FaSms />
              SMS Response
            </h3>
            
            <div>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 600,
                color: '#374151',
                marginBottom: '8px'
              }}>
                Message (160 characters max)
              </label>
              <textarea
                value={smsResponse.message}
                onChange={(e) => handleSmsChange('message', e.target.value)}
                placeholder="Write your SMS response here..."
                rows={4}
                maxLength={160}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '14px',
                  backgroundColor: 'white',
                  resize: 'vertical',
                  outline: 'none',
                  boxShadow: '0 1px 1px rgba(0,0,0,0.02)'
                }}
              />
              <div style={{
                fontSize: '12px',
                color: '#7f8c8d',
                textAlign: 'right',
                marginTop: '5px'
              }}>
                {smsResponse.message.length}/160 characters
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '18px 28px',
          borderTop: '1px solid #eef0f3',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '12px',
          background: 'linear-gradient(180deg, #fff, #fafbfc)'
        }}>
          <button
            onClick={onClose}
            disabled={sending}
            style={{
              padding: '10px 18px',
              backgroundColor: 'transparent',
              color: '#6b7280',
              border: '1px solid #e5e7eb',
              borderRadius: '10px',
              fontSize: '14px',
              cursor: sending ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (!sending) {
                e.target.style.borderColor = '#9ca3af';
                e.target.style.color = '#111827';
              }
            }}
            onMouseLeave={(e) => {
              if (!sending) {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.color = '#6b7280';
              }
            }}
          >
            Cancel
          </button>
          
          <button
            onClick={handleSendResponse}
            disabled={sending}
            style={{
              padding: '10px 18px',
              background: sending ? '#d1d5db' : 'linear-gradient(135deg, #ec4899, #db2777)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: sending ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 6px 20px rgba(236, 72, 153, 0.25)'
            }}
            onMouseEnter={(e) => {
              if (!sending) {
                e.target.style.filter = 'brightness(0.95)';
              }
            }}
            onMouseLeave={(e) => {
              if (!sending) {
                e.target.style.filter = 'none';
              }
            }}
          >
            <FaPaperPlane />
            {sending ? 'Sending...' : 'Send Response'}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ApplicationResponseModal;
