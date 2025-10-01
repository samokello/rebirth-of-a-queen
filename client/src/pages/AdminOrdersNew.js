import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAdminAuth } from '../context/AdminAuthContext';
import { 
  FaShoppingCart, FaPlus, FaEdit, FaTrash, FaEye, FaSave, FaTimes, 
  FaCheck, FaUsers, FaCalendar, FaMapMarkerAlt, FaClock, FaSearch, 
  FaFilter, FaSync, FaDownload, FaUpload, FaUser, FaEnvelope, 
  FaPhone, FaBox, FaTruck, FaCreditCard, FaCheckCircle, 
  FaTimesCircle, FaExclamationTriangle, FaDollarSign, FaReceipt
} from 'react-icons/fa';

const Container = styled.div`
  padding: 0;
  max-width: 100%;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  color: white;
`;

const Title = styled.h1`
  color: white;
  font-size: 1.8rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  background: ${props => props.variant === 'secondary' ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #667eea, #764ba2)'};
  color: white;
  border: 1px solid rgba(255,255,255,0.2);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);

  &:hover {
    background: ${props => props.variant === 'secondary' ? 'rgba(255,255,255,0.2)' : 'linear-gradient(135deg, #5563c1, #6a4190)'};
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }
`;

const SearchBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 12px;
  backdrop-filter: blur(10px);
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 8px;
  background: rgba(255,255,255,0.1);
  color: white;
  font-size: 1rem;
  backdrop-filter: blur(10px);

  &::placeholder {
    color: rgba(255,255,255,0.7);
  }

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
  }
`;

const FilterSelect = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 8px;
  background: rgba(255,255,255,0.1);
  color: white;
  font-size: 1rem;
  backdrop-filter: blur(10px);

  &:focus {
    outline: none;
    border-color: #667eea;
  }

  option {
    background: #1a1a1a;
    color: white;
  }
`;

const OrdersTable = styled.div`
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  overflow: hidden;
  color: white;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2));
  border-bottom: 2px solid rgba(255,255,255,0.2);
  font-weight: 700;
  color: white;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  align-items: center;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(102, 126, 234, 0.1);
  }

  &:last-child {
    border-bottom: none;
  }
`;

const OrderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const OrderNumber = styled.div`
  font-weight: 600;
  color: #667eea;
`;

const CustomerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 0.8rem;
`;

const CustomerDetails = styled.div`
  flex: 1;
`;

const CustomerName = styled.div`
  font-weight: 600;
  font-size: 0.9rem;
`;

const CustomerEmail = styled.div`
  font-size: 0.7rem;
  opacity: 0.7;
`;

const StatusBadge = styled.div`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-align: center;
  background: ${props => {
    switch(props.status) {
      case 'completed': return 'rgba(16, 185, 129, 0.2)';
      case 'pending': return 'rgba(245, 158, 11, 0.2)';
      case 'cancelled': return 'rgba(239, 68, 68, 0.2)';
      case 'processing': return 'rgba(59, 130, 246, 0.2)';
      case 'shipped': return 'rgba(139, 92, 246, 0.2)';
      default: return 'rgba(107, 114, 128, 0.2)';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'completed': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'cancelled': return '#ef4444';
      case 'processing': return '#3b82f6';
      case 'shipped': return '#8b5cf6';
      default: return '#6b7280';
    }
  }};
  border: 1px solid ${props => {
    switch(props.status) {
      case 'completed': return 'rgba(16, 185, 129, 0.3)';
      case 'pending': return 'rgba(245, 158, 11, 0.3)';
      case 'cancelled': return 'rgba(239, 68, 68, 0.3)';
      case 'processing': return 'rgba(59, 130, 246, 0.3)';
      case 'shipped': return 'rgba(139, 92, 246, 0.3)';
      default: return 'rgba(107, 114, 128, 0.3)';
    }
  }};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  padding: 0.5rem;
  border: none;
  border-radius: 8px;
  background: ${props => {
    switch(props.variant) {
      case 'view': return 'rgba(16, 185, 129, 0.2)';
      case 'edit': return 'rgba(59, 130, 246, 0.2)';
      case 'process': return 'rgba(139, 92, 246, 0.2)';
      case 'ship': return 'rgba(16, 185, 129, 0.2)';
      case 'cancel': return 'rgba(239, 68, 68, 0.2)';
      default: return 'rgba(255,255,255,0.1)';
    }
  }};
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid rgba(255,255,255,0.2);

  &:hover {
    background: ${props => {
      switch(props.variant) {
        case 'view': return 'rgba(16, 185, 129, 0.3)';
        case 'edit': return 'rgba(59, 130, 246, 0.3)';
        case 'process': return 'rgba(139, 92, 246, 0.3)';
        case 'ship': return 'rgba(16, 185, 129, 0.3)';
        case 'cancel': return 'rgba(239, 68, 68, 0.3)';
        default: return 'rgba(255,255,255,0.2)';
      }
    }};
    transform: scale(1.05);
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;

const ModalContent = styled.div`
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 16px;
  padding: 2rem;
  width: 90%;
  max-width: 900px;
  max-height: 80vh;
  overflow-y: auto;
  backdrop-filter: blur(10px);
  color: white;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255,255,255,0.1);
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: white;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 8px;
  background: rgba(255,255,255,0.1);
  color: white;
  font-size: 1rem;
  backdrop-filter: blur(10px);

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
  }

  &::placeholder {
    color: rgba(255,255,255,0.7);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 8px;
  background: rgba(255,255,255,0.1);
  color: white;
  font-size: 1rem;
  backdrop-filter: blur(10px);
  resize: vertical;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
  }

  &::placeholder {
    color: rgba(255,255,255,0.7);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 8px;
  background: rgba(255,255,255,0.1);
  color: white;
  font-size: 1rem;
  backdrop-filter: blur(10px);

  &:focus {
    outline: none;
    border-color: #667eea;
  }

  option {
    background: #1a1a1a;
    color: white;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: white;
  font-size: 1.2rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: white;
  opacity: 0.7;
`;

const OrderItems = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(255,255,255,0.05);
  border-radius: 8px;
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.1);

  &:last-child {
    border-bottom: none;
  }
`;

const AdminOrders = () => {
  const { getAdminToken } = useAdminAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [formData, setFormData] = useState({
    orderNumber: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    status: 'pending',
    totalAmount: '',
    shippingAddress: '',
    paymentMethod: '',
    orderDate: '',
    notes: ''
  });

  // Sample orders data
  const sampleOrders = [
    {
      id: 1,
      orderNumber: 'ORD-2024-001',
      customerName: 'Sarah Mwangi',
      customerEmail: 'sarah.mwangi@email.com',
      customerPhone: '+254712345678',
      status: 'completed',
      totalAmount: 2500,
      shippingAddress: 'Nairobi, Kenya',
      paymentMethod: 'M-Pesa',
      orderDate: '2024-01-15',
      items: [
        { name: 'Leather Handbag', quantity: 1, price: 1500 },
        { name: 'Fashion Accessories', quantity: 2, price: 1000 }
      ],
      notes: 'Delivered successfully',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20'
    },
    {
      id: 2,
      orderNumber: 'ORD-2024-002',
      customerName: 'John Kiprop',
      customerEmail: 'john.kiprop@email.com',
      customerPhone: '+254723456789',
      status: 'processing',
      totalAmount: 1800,
      shippingAddress: 'Kajiado, Kenya',
      paymentMethod: 'PayPal',
      orderDate: '2024-01-18',
      items: [
        { name: 'Custom Leather Wallet', quantity: 1, price: 1800 }
      ],
      notes: 'In production',
      createdAt: '2024-01-18',
      updatedAt: '2024-01-19'
    },
    {
      id: 3,
      orderNumber: 'ORD-2024-003',
      customerName: 'Grace Akinyi',
      customerEmail: 'grace.akinyi@email.com',
      customerPhone: '+254734567890',
      status: 'shipped',
      totalAmount: 3200,
      shippingAddress: 'Mombasa, Kenya',
      paymentMethod: 'Bank Transfer',
      orderDate: '2024-01-20',
      items: [
        { name: 'Leather Jacket', quantity: 1, price: 2500 },
        { name: 'Leather Belt', quantity: 1, price: 700 }
      ],
      notes: 'Shipped via courier',
      createdAt: '2024-01-20',
      updatedAt: '2024-01-21'
    },
    {
      id: 4,
      orderNumber: 'ORD-2024-004',
      customerName: 'Peter Ochieng',
      customerEmail: 'peter.ochieng@email.com',
      customerPhone: '+254745678901',
      status: 'pending',
      totalAmount: 1200,
      shippingAddress: 'Kisumu, Kenya',
      paymentMethod: 'M-Pesa',
      orderDate: '2024-01-22',
      items: [
        { name: 'Leather Keychain Set', quantity: 3, price: 1200 }
      ],
      notes: 'Awaiting payment confirmation',
      createdAt: '2024-01-22',
      updatedAt: '2024-01-22'
    }
  ];

  const statuses = ['all', 'pending', 'processing', 'shipped', 'completed', 'cancelled'];
  const paymentMethods = ['M-Pesa', 'PayPal', 'Bank Transfer', 'Credit Card', 'Cash on Delivery'];

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOrders(sampleOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewOrder = (order) => {
    setEditingOrder(order);
    setFormData({
      orderNumber: order.orderNumber,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      customerPhone: order.customerPhone,
      status: order.status,
      totalAmount: order.totalAmount.toString(),
      shippingAddress: order.shippingAddress,
      paymentMethod: order.paymentMethod,
      orderDate: order.orderDate,
      notes: order.notes
    });
    setShowModal(true);
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] }
        : order
    ));
  };

  const handleSaveOrder = async () => {
    try {
      if (editingOrder) {
        setOrders(prev => prev.map(order => 
          order.id === editingOrder.id 
            ? { 
                ...order, 
                ...formData, 
                totalAmount: parseFloat(formData.totalAmount),
                updatedAt: new Date().toISOString().split('T')[0] 
              }
            : order
        ));
      }
      setShowModal(false);
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <FaCheckCircle />;
      case 'cancelled': return <FaTimesCircle />;
      case 'pending': return <FaClock />;
      case 'processing': return <FaExclamationTriangle />;
      case 'shipped': return <FaTruck />;
      default: return <FaClock />;
    }
  };

  if (loading) {
    return (
      <Container>
        <LoadingSpinner>
          <FaSync className="animate-spin" style={{ marginRight: '0.5rem' }} />
          Loading orders...
        </LoadingSpinner>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>
          <FaShoppingCart />
          Orders Management
        </Title>
        <HeaderActions>
          <Button variant="secondary" onClick={fetchOrders}>
            <FaSync />
            Refresh
          </Button>
          <Button variant="secondary">
            <FaDownload />
            Export
          </Button>
        </HeaderActions>
      </Header>

      <SearchBar>
        <SearchInput
          type="text"
          placeholder="Search orders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FilterSelect
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          {statuses.map(status => (
            <option key={status} value={status}>
              {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </FilterSelect>
      </SearchBar>

      {filteredOrders.length === 0 ? (
        <EmptyState>
          <FaShoppingCart style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }} />
          <h3>No orders found</h3>
          <p>Orders will appear here when placed</p>
        </EmptyState>
      ) : (
        <OrdersTable>
          <TableHeader>
            <div>Order #</div>
            <div>Customer</div>
            <div>Date</div>
            <div>Amount</div>
            <div>Status</div>
            <div>Payment</div>
            <div>Actions</div>
          </TableHeader>
          {filteredOrders.map(order => (
            <TableRow key={order.id}>
              <OrderInfo>
                <FaReceipt />
                <OrderNumber>{order.orderNumber}</OrderNumber>
              </OrderInfo>
              <CustomerInfo>
                <Avatar>
                  {order.customerName.split(' ').map(n => n[0]).join('')}
                </Avatar>
                <CustomerDetails>
                  <CustomerName>{order.customerName}</CustomerName>
                  <CustomerEmail>{order.customerEmail}</CustomerEmail>
                </CustomerDetails>
              </CustomerInfo>
              <div>{new Date(order.orderDate).toLocaleDateString()}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <FaDollarSign />
                {order.totalAmount.toLocaleString()}
              </div>
              <StatusBadge status={order.status}>
                {getStatusIcon(order.status)} {order.status}
              </StatusBadge>
              <div>{order.paymentMethod}</div>
              <ActionButtons>
                <ActionButton variant="view" onClick={() => handleViewOrder(order)}>
                  <FaEye />
                </ActionButton>
                {order.status === 'pending' && (
                  <ActionButton variant="process" onClick={() => handleUpdateStatus(order.id, 'processing')}>
                    <FaCheck />
                  </ActionButton>
                )}
                {order.status === 'processing' && (
                  <ActionButton variant="ship" onClick={() => handleUpdateStatus(order.id, 'shipped')}>
                    <FaTruck />
                  </ActionButton>
                )}
                {(order.status === 'pending' || order.status === 'processing') && (
                  <ActionButton variant="cancel" onClick={() => handleUpdateStatus(order.id, 'cancelled')}>
                    <FaTimes />
                  </ActionButton>
                )}
              </ActionButtons>
            </TableRow>
          ))}
        </OrdersTable>
      )}

      {showModal && (
        <Modal onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Order Details - {formData.orderNumber}</ModalTitle>
              <CloseButton onClick={() => setShowModal(false)}>
                <FaTimes />
              </CloseButton>
            </ModalHeader>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <FormGroup>
                <Label>Order Number</Label>
                <Input
                  type="text"
                  value={formData.orderNumber}
                  readOnly
                />
              </FormGroup>

              <FormGroup>
                <Label>Order Date</Label>
                <Input
                  type="date"
                  value={formData.orderDate}
                  readOnly
                />
              </FormGroup>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <FormGroup>
                <Label>Customer Name</Label>
                <Input
                  type="text"
                  value={formData.customerName}
                  readOnly
                />
              </FormGroup>

              <FormGroup>
                <Label>Customer Email</Label>
                <Input
                  type="email"
                  value={formData.customerEmail}
                  readOnly
                />
              </FormGroup>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <FormGroup>
                <Label>Customer Phone</Label>
                <Input
                  type="tel"
                  value={formData.customerPhone}
                  readOnly
                />
              </FormGroup>

              <FormGroup>
                <Label>Total Amount</Label>
                <Input
                  type="number"
                  value={formData.totalAmount}
                  readOnly
                />
              </FormGroup>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <FormGroup>
                <Label>Payment Method</Label>
                <Input
                  type="text"
                  value={formData.paymentMethod}
                  readOnly
                />
              </FormGroup>

              <FormGroup>
                <Label>Status</Label>
                <Select
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </Select>
              </FormGroup>
            </div>

            <FormGroup>
              <Label>Shipping Address</Label>
              <TextArea
                value={formData.shippingAddress}
                readOnly
              />
            </FormGroup>

            {editingOrder && (
              <OrderItems>
                <h4 style={{ margin: '0 0 1rem 0', color: '#667eea' }}>Order Items</h4>
                {editingOrder.items.map((item, index) => (
                  <OrderItem key={index}>
                    <div>
                      <div style={{ fontWeight: '600' }}>{item.name}</div>
                      <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Qty: {item.quantity}</div>
                    </div>
                    <div style={{ fontWeight: '600', color: '#667eea' }}>
                      KES {item.price.toLocaleString()}
                    </div>
                  </OrderItem>
                ))}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  marginTop: '1rem', 
                  paddingTop: '1rem', 
                  borderTop: '2px solid rgba(102, 126, 234, 0.3)',
                  fontWeight: '700',
                  fontSize: '1.1rem'
                }}>
                  <span>Total:</span>
                  <span style={{ color: '#667eea' }}>KES {editingOrder.totalAmount.toLocaleString()}</span>
                </div>
              </OrderItems>
            )}

            <FormGroup>
              <Label>Admin Notes</Label>
              <TextArea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Add admin notes..."
              />
            </FormGroup>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                <FaTimes />
                Close
              </Button>
              <Button onClick={handleSaveOrder}>
                <FaSave />
                Update Order
              </Button>
            </div>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default AdminOrders;
