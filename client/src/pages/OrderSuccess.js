import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  FaCheckCircle, 
  FaShoppingBag, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt,
  FaArrowLeft,
  FaDownload,
  FaShare
} from 'react-icons/fa';
import PaymentStatus from '../components/PaymentStatus';

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState('pending');
  
  // Get order details from navigation state
  const orderId = location.state?.orderId || 'ORD-' + Date.now();
  const orderNumber = location.state?.orderNumber || 'ORD-' + Date.now();
  const paymentMethod = location.state?.paymentMethod || 'Unknown';
  const total = location.state?.total || 0;
  const paymentData = location.state?.paymentData;

  const handleDownloadReceipt = () => {
    // Create a simple receipt
    const receiptContent = `
REBIRTH OF A QUEEN
Order Receipt

Order ID: ${orderId}
Date: ${new Date().toLocaleDateString()}
Payment Method: ${paymentMethod}
Total: KSH ${total.toFixed(0)}

Thank you for your order!
    `;
    
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${orderId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleShareOrder = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Order Confirmation',
        text: `I just placed an order with Rebirth of a Queen! Order ID: ${orderId}`,
        url: window.location.origin
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`Order ID: ${orderId} - Rebirth of a Queen`);
      alert('Order details copied to clipboard!');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      padding: '40px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        maxWidth: '600px',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '40px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        {/* Success Icon */}
        <div style={{
          width: '100px',
          height: '100px',
          backgroundColor: '#27ae60',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          color: 'white',
          fontSize: '48px'
        }}>
          <FaCheckCircle />
        </div>

        {/* Success Message */}
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#2c3e50',
          marginBottom: '16px'
        }}>
          Order Placed Successfully!
        </h1>
        
        <p style={{
          fontSize: '18px',
          color: '#7f8c8d',
          marginBottom: '32px',
          lineHeight: '1.6'
        }}>
          Thank you for your order! We've received your payment and will process your order shortly.
        </p>

        {/* Payment Status */}
        <PaymentStatus 
          orderId={orderId}
          paymentMethod={paymentMethod}
          onStatusUpdate={setPaymentStatus}
        />

        {/* Order Details */}
        <div style={{
          backgroundColor: '#f8f9fa',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '32px',
          textAlign: 'left'
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#2c3e50',
            marginBottom: '16px',
            textAlign: 'center'
          }}>
            Order Details
          </h3>
          
          <div style={{ display: 'grid', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#666', fontWeight: '500' }}>Order Number:</span>
              <span style={{ color: '#2c3e50', fontWeight: '600' }}>#{orderNumber}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#666', fontWeight: '500' }}>Date:</span>
              <span style={{ color: '#2c3e50' }}>{new Date().toLocaleDateString()}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#666', fontWeight: '500' }}>Payment Method:</span>
              <span style={{ color: '#2c3e50' }}>{paymentMethod}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#666', fontWeight: '500' }}>Total Amount:</span>
              <span style={{ color: '#e74c3c', fontWeight: 'bold', fontSize: '18px' }}>
                KSH {total.toFixed(0)}
              </span>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div style={{
          backgroundColor: '#e8f5e8',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '32px',
          textAlign: 'left'
        }}>
          <h4 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#27ae60',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <FaEnvelope />
            What happens next?
          </h4>
          
          <ul style={{
            margin: 0,
            paddingLeft: '20px',
            color: '#2c3e50',
            fontSize: '14px',
            lineHeight: '1.6'
          }}>
            <li>You'll receive an order confirmation email shortly</li>
            <li>We'll process your order within 1-2 business days</li>
            <li>You'll get a shipping notification with tracking details</li>
            <li>Your order will be delivered within 3-5 business days</li>
          </ul>
        </div>

        {/* Contact Information */}
        <div style={{
          backgroundColor: '#f0f8ff',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '32px',
          textAlign: 'left'
        }}>
          <h4 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#3498db',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <FaPhone />
            Need Help?
          </h4>
          
          <div style={{ color: '#2c3e50', fontSize: '14px', lineHeight: '1.6' }}>
            <p style={{ margin: '4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaPhone style={{ color: '#3498db' }} />
              <span>+254 700 000 000</span>
            </p>
            <p style={{ margin: '4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaEnvelope style={{ color: '#3498db' }} />
              <span>support@rebirthofaqueen.org</span>
            </p>
            <p style={{ margin: '4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaMapMarkerAlt style={{ color: '#3498db' }} />
              <span>Nairobi, Kenya</span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={handleDownloadReceipt}
            style={{
              padding: '12px 20px',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#2980b9'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#3498db'}
          >
            <FaDownload />
            Download Receipt
          </button>
          
          <button
            onClick={handleShareOrder}
            style={{
              padding: '12px 20px',
              backgroundColor: '#27ae60',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#229954'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#27ae60'}
          >
            <FaShare />
            Share Order
          </button>
        </div>

        {/* Continue Shopping */}
        <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #e9ecef' }}>
          <button
            onClick={() => navigate('/shop')}
            style={{
              padding: '16px 32px',
              backgroundColor: '#8B5CF6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              margin: '0 auto',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#7c3aed'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#8B5CF6'}
          >
            <FaShoppingBag />
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;