import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaClock, FaTimesCircle, FaSpinner } from 'react-icons/fa';

const PaymentStatus = ({ orderId, paymentMethod, onStatusUpdate }) => {
  const [status, setStatus] = useState('pending');
  const [message, setMessage] = useState('Processing payment...');
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const response = await fetch('/api/payments/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderId: orderId,
            paymentMethod: paymentMethod
          })
        });

        if (response.ok) {
          const result = await response.json();
          setStatus(result.data.paymentStatus);
          
          switch (result.data.paymentStatus) {
            case 'paid':
              setMessage('Payment successful! Your order is being processed.');
              setIsChecking(false);
              if (onStatusUpdate) onStatusUpdate('paid');
              break;
            case 'failed':
              setMessage('Payment failed. Please try again.');
              setIsChecking(false);
              if (onStatusUpdate) onStatusUpdate('failed');
              break;
            case 'pending':
              setMessage('Payment is being processed...');
              // Continue checking
              setTimeout(checkPaymentStatus, 3000);
              break;
            default:
              setMessage('Payment status unknown.');
              setIsChecking(false);
          }
        } else {
          setMessage('Unable to verify payment status.');
          setIsChecking(false);
        }
      } catch (error) {
        console.error('Payment status check error:', error);
        setMessage('Error checking payment status.');
        setIsChecking(false);
      }
    };

    // Start checking payment status
    checkPaymentStatus();

    // Cleanup interval on unmount
    return () => {
      setIsChecking(false);
    };
  }, [orderId, paymentMethod, onStatusUpdate]);

  const getStatusIcon = () => {
    switch (status) {
      case 'paid':
        return <FaCheckCircle style={{ color: '#27ae60', fontSize: '24px' }} />;
      case 'failed':
        return <FaTimesCircle style={{ color: '#e74c3c', fontSize: '24px' }} />;
      default:
        return isChecking ? 
          <FaSpinner style={{ color: '#3498db', fontSize: '24px', animation: 'spin 1s linear infinite' }} /> :
          <FaClock style={{ color: '#f39c12', fontSize: '24px' }} />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'paid':
        return '#27ae60';
      case 'failed':
        return '#e74c3c';
      default:
        return '#3498db';
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '16px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: `2px solid ${getStatusColor()}`,
        margin: '16px 0'
      }}>
      {getStatusIcon()}
      <div>
        <div style={{
          fontSize: '16px',
          fontWeight: '600',
          color: getStatusColor(),
          marginBottom: '4px'
        }}>
          Payment Status: {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
        <div style={{
          fontSize: '14px',
          color: '#666'
        }}>
          {message}
        </div>
      </div>
      </div>
    </>
  );
};

export default PaymentStatus;
