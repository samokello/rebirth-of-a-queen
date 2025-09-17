import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaSearch, 
  FaFilter, 
  FaEye, 
  FaDownload, 
  FaShoppingBag,
  FaCalendarAlt,
  FaCreditCard,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
  FaClock
} from 'react-icons/fa';

const OrderHistory = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock orders data - in real app, this would come from API
  const mockOrders = [
    {
      _id: 'ORD-001',
      orderNumber: 'ORD-001',
      date: '2024-01-15',
      status: 'delivered',
      paymentMethod: 'M-Pesa',
      total: 25000,
      items: [
        { product: { name: 'Leather Handbag', price: 15000 }, quantity: 1 },
        { product: { name: 'Vitenge Dress', price: 10000 }, quantity: 1 }
      ],
      shippingAddress: '123 Main St, Nairobi, Kenya'
    },
    {
      _id: 'ORD-002',
      orderNumber: 'ORD-002',
      date: '2024-01-10',
      status: 'shipped',
      paymentMethod: 'Credit Card',
      total: 18000,
      items: [
        { product: { name: 'Leather Wallet', price: 8000 }, quantity: 1 },
        { product: { name: 'Branded T-Shirt', price: 10000 }, quantity: 1 }
      ],
      shippingAddress: '456 Oak Ave, Mombasa, Kenya'
    },
    {
      _id: 'ORD-003',
      orderNumber: 'ORD-003',
      date: '2024-01-08',
      status: 'processing',
      paymentMethod: 'Bank Transfer',
      total: 12000,
      items: [
        { product: { name: 'Leather Belt', price: 12000 }, quantity: 1 }
      ],
      shippingAddress: '789 Pine St, Kisumu, Kenya'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <FaCheckCircle style={{ color: '#27ae60' }} />;
      case 'shipped':
        return <FaTruck style={{ color: '#3498db' }} />;
      case 'processing':
        return <FaClock style={{ color: '#f39c12' }} />;
      case 'cancelled':
        return <FaTimesCircle style={{ color: '#e74c3c' }} />;
      default:
        return <FaClock style={{ color: '#95a5a6' }} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return '#27ae60';
      case 'shipped':
        return '#3498db';
      case 'processing':
        return '#f39c12';
      case 'cancelled':
        return '#e74c3c';
      default:
        return '#95a5a6';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.some(item => item.product.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewOrder = (orderId) => {
    navigate(`/orders/${orderId}`);
  };

  const handleDownloadInvoice = (orderId) => {
    // In real app, this would download actual invoice
    alert(`Downloading invoice for order ${orderId}`);
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '3px solid #f3f3f3',
            borderTop: '3px solid #3498db',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }} />
          <p style={{ color: '#7f8c8d' }}>Loading your orders...</p>
        </div>
      </div>
    );
  }

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
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ 
            marginBottom: '8px', 
            fontSize: '32px',
            color: '#2c3e50'
          }}>
            Order History
          </h1>
          <p style={{ 
            color: '#7f8c8d', 
            fontSize: '16px',
            margin: '0'
          }}>
            Track and manage your orders
          </p>
        </div>

        {/* Filters */}
        <div style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '24px',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <div style={{ position: 'relative', flex: '1', minWidth: '300px' }}>
            <FaSearch style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#7f8c8d'
            }} />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 12px 12px 40px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '12px 16px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: '14px',
              minWidth: '150px'
            }}
          >
            <option value="all">All Status</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: '#7f8c8d'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>
              <FaShoppingBag />
            </div>
            <h3 style={{ marginBottom: '8px', color: '#2c3e50' }}>No orders found</h3>
            <p>You haven't placed any orders yet, or no orders match your search criteria.</p>
            <button
              onClick={() => navigate('/shop')}
              style={{
                marginTop: '20px',
                padding: '12px 24px',
                backgroundColor: '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#2980b9'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#3498db'}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '20px' }}>
            {filteredOrders.map((order) => (
              <div
                key={order._id}
                style={{
                  backgroundColor: 'white',
                  border: '1px solid #e1e8ed',
                  borderRadius: '12px',
                  padding: '24px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                }}
              >
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: '20px',
                  alignItems: 'start'
                }}>
                  {/* Order Info */}
                  <div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '12px'
                    }}>
                      <h3 style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#2c3e50',
                        margin: 0
                      }}>
                        Order #{order.orderNumber}
                      </h3>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '4px 12px',
                        backgroundColor: getStatusColor(order.status) + '20',
                        color: getStatusColor(order.status),
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        textTransform: 'capitalize'
                      }}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </div>
                    </div>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '16px',
                      marginBottom: '16px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FaCalendarAlt style={{ color: '#7f8c8d', fontSize: '14px' }} />
                        <span style={{ color: '#666', fontSize: '14px' }}>
                          {new Date(order.date).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FaCreditCard style={{ color: '#7f8c8d', fontSize: '14px' }} />
                        <span style={{ color: '#666', fontSize: '14px' }}>
                          {order.paymentMethod}
                        </span>
                      </div>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      <h4 style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#2c3e50',
                        margin: '0 0 8px 0'
                      }}>
                        Items ({order.items.length}):
                      </h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {order.items.map((item, index) => (
                          <span
                            key={index}
                            style={{
                              backgroundColor: '#f8f9fa',
                              padding: '4px 8px',
                              borderRadius: '6px',
                              fontSize: '12px',
                              color: '#666'
                            }}
                          >
                            {item.product.name} x {item.quantity}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div style={{
                      fontSize: '18px',
                      fontWeight: 'bold',
                      color: '#e74c3c'
                    }}>
                      KSH {order.total.toFixed(0)}
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}>
                    <button
                      onClick={() => handleViewOrder(order._id)}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#3498db',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#2980b9'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#3498db'}
                    >
                      <FaEye />
                      View Details
                    </button>
                    
                    <button
                      onClick={() => handleDownloadInvoice(order._id)}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: 'transparent',
                        color: '#3498db',
                        border: '1px solid #3498db',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#3498db';
                        e.target.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = '#3498db';
                      }}
                    >
                      <FaDownload />
                      Invoice
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default OrderHistory;
