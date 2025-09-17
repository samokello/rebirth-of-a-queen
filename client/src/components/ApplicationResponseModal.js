import React, { useState } from 'react';
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

  if (!isOpen || !application) return null;

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
          <div>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#2c3e50',
              margin: '0 0 5px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <FaPaperPlane />
              Respond to Application
            </h2>
            <p style={{
              fontSize: '14px',
              color: '#7f8c8d',
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
            <FaTimes />
          </button>
        </div>

        {/* Application Info */}
        <div style={{
          padding: '20px 30px',
          backgroundColor: '#f8f9fa',
          borderBottom: '1px solid #e0e0e0'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaUser style={{ color: '#e91e63' }} />
              <span style={{ fontSize: '14px', color: '#2c3e50' }}>
                {application.firstName} {application.lastName}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaEnvelope style={{ color: '#e91e63' }} />
              <span style={{ fontSize: '14px', color: '#2c3e50' }}>
                {application.email}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaPhone style={{ color: '#e91e63' }} />
              <span style={{ fontSize: '14px', color: '#2c3e50' }}>
                {application.phone}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaCalendar style={{ color: '#e91e63' }} />
              <span style={{ fontSize: '14px', color: '#2c3e50' }}>
                Applied: {new Date(application.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '30px'
        }}>
          {/* Email Response */}
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#2c3e50',
              marginBottom: '15px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <FaEnvelope />
              Email Response
            </h3>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#2c3e50',
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
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  backgroundColor: 'white'
                }}
              />
            </div>
            
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#2c3e50',
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
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  backgroundColor: 'white',
                  resize: 'vertical'
                }}
              />
            </div>
          </div>

          {/* SMS Response */}
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#2c3e50',
              marginBottom: '15px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <FaSms />
              SMS Response
            </h3>
            
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#2c3e50',
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
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  backgroundColor: 'white',
                  resize: 'vertical'
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
          padding: '20px 30px',
          borderTop: '1px solid #e0e0e0',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '15px'
        }}>
          <button
            onClick={onClose}
            disabled={sending}
            style={{
              padding: '12px 24px',
              backgroundColor: 'transparent',
              color: '#7f8c8d',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              fontSize: '14px',
              cursor: sending ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (!sending) {
                e.target.style.borderColor = '#7f8c8d';
                e.target.style.color = '#2c3e50';
              }
            }}
            onMouseLeave={(e) => {
              if (!sending) {
                e.target.style.borderColor = '#e0e0e0';
                e.target.style.color = '#7f8c8d';
              }
            }}
          >
            Cancel
          </button>
          
          <button
            onClick={handleSendResponse}
            disabled={sending}
            style={{
              padding: '12px 24px',
              backgroundColor: sending ? '#ccc' : '#e91e63',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: sending ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              if (!sending) {
                e.target.style.backgroundColor = '#c2185b';
              }
            }}
            onMouseLeave={(e) => {
              if (!sending) {
                e.target.style.backgroundColor = '#e91e63';
              }
            }}
          >
            <FaPaperPlane />
            {sending ? 'Sending...' : 'Send Response'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationResponseModal;
