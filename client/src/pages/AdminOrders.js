import React, { useState } from 'react';
import styled from 'styled-components';
import { FaEye, FaCheck, FaTimes, FaTruck, FaWhatsapp, FaPhone } from 'react-icons/fa';

const Container = styled.div`
  padding: 20px;
  background: #f8f9fa;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #333;
  margin: 0;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #667eea;
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

const FilterSection = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const FilterRow = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  flex-wrap: wrap;
`;

const FilterSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: white;
  cursor: pointer;
`;

const OrdersTable = styled.div`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  padding: 15px 20px;
  background: #f8f9fa;
  font-weight: 600;
  color: #333;
  border-bottom: 1px solid #eee;
`;

const OrderRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  align-items: center;
  
  &:hover {
    background: #f8f9fa;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const OrderId = styled.div`
  font-weight: 600;
  color: #667eea;
`;

const CustomerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const CustomerName = styled.div`
  font-weight: 600;
`;

const CustomerPhone = styled.div`
  font-size: 0.9rem;
  color: #666;
`;

const OrderItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const ItemName = styled.div`
  font-size: 0.9rem;
`;

const ItemQuantity = styled.div`
  font-size: 0.8rem;
  color: #666;
`;

const OrderTotal = styled.div`
  font-weight: 600;
  color: #28a745;
`;

const OrderStatus = styled.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
`;

const StatusPending = styled(OrderStatus)`
  background: #fff3cd;
  color: #856404;
`;

const StatusConfirmed = styled(OrderStatus)`
  background: #d1ecf1;
  color: #0c5460;
`;

const StatusShipped = styled(OrderStatus)`
  background: #d4edda;
  color: #155724;
`;

const StatusDelivered = styled(OrderStatus)`
  background: #d1e7dd;
  color: #0f5132;
`;

const StatusCancelled = styled(OrderStatus)`
  background: #f8d7da;
  color: #721c24;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 5px;
`;

const ActionButton = styled.button`
  padding: 6px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.3s ease;
`;

const ViewButton = styled(ActionButton)`
  background: #17a2b8;
  color: white;

  &:hover {
    background: #138496;
  }
`;

const ConfirmButton = styled(ActionButton)`
  background: #28a745;
  color: white;

  &:hover {
    background: #218838;
  }
`;

const ShipButton = styled(ActionButton)`
  background: #ffc107;
  color: #333;

  &:hover {
    background: #e0a800;
  }
`;

const CancelButton = styled(ActionButton)`
  background: #dc3545;
  color: white;

  &:hover {
    background: #c82333;
  }
`;

const ContactButton = styled(ActionButton)`
  background: #25d366;
  color: white;

  &:hover {
    background: #128c7e;
  }
`;

// Sample orders data
const sampleOrders = [
  {
    id: 'ORD-001',
    customer: {
      name: 'Jane Doe',
      phone: '+254 700 123 456'
    },
    items: [
      { name: 'Handcrafted Leather Bag', quantity: 1, price: 2500 },
      { name: 'Branded T-Shirt', quantity: 2, price: 1200 }
    ],
    total: 4900,
    status: 'pending',
    date: '2024-01-15',
    paymentMethod: 'WhatsApp'
  },
  {
    id: 'ORD-002',
    customer: {
      name: 'John Smith',
      phone: '+254 711 234 567'
    },
    items: [
      { name: 'Custom Fashion Dress', quantity: 1, price: 3500 }
    ],
    total: 3500,
    status: 'confirmed',
    date: '2024-01-14',
    paymentMethod: 'M-Pesa'
  },
  {
    id: 'ORD-003',
    customer: {
      name: 'Mary Johnson',
      phone: '+254 722 345 678'
    },
    items: [
      { name: 'Leather Wallet', quantity: 1, price: 800 },
      { name: 'Designer Blouse', quantity: 1, price: 2800 }
    ],
    total: 3600,
    status: 'shipped',
    date: '2024-01-13',
    paymentMethod: 'Bank Transfer'
  },
  {
    id: 'ORD-004',
    customer: {
      name: 'Peter Wilson',
      phone: '+254 733 456 789'
    },
    items: [
      { name: 'Custom Logo Cap', quantity: 5, price: 600 }
    ],
    total: 3000,
    status: 'delivered',
    date: '2024-01-12',
    paymentMethod: 'Cash on Delivery'
  }
];

const AdminOrders = () => {
  const [orders, setOrders] = useState(sampleOrders);
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusComponent = (status) => {
    switch (status) {
      case 'pending':
        return <StatusPending>Pending</StatusPending>;
      case 'confirmed':
        return <StatusConfirmed>Confirmed</StatusConfirmed>;
      case 'shipped':
        return <StatusShipped>Shipped</StatusShipped>;
      case 'delivered':
        return <StatusDelivered>Delivered</StatusDelivered>;
      case 'cancelled':
        return <StatusCancelled>Cancelled</StatusCancelled>;
      default:
        return <StatusPending>Pending</StatusPending>;
    }
  };

  const filteredOrders = statusFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === statusFilter);

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    confirmed: orders.filter(o => o.status === 'confirmed').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0)
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const handleWhatsApp = (phone) => {
    const message = "Hello! I'm contacting you regarding your order from Rebirth of a Queen.";
    const whatsappUrl = `https://wa.me/${phone.replace(/\s/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCall = (phone) => {
    window.open(`tel:${phone.replace(/\s/g, '')}`, '_self');
  };

  return (
    <Container>
      <Header>
        <Title>Order Management</Title>
      </Header>

      <StatsContainer>
        <StatCard>
          <StatNumber>{stats.total}</StatNumber>
          <StatLabel>Total Orders</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.pending}</StatNumber>
          <StatLabel>Pending</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.confirmed}</StatNumber>
          <StatLabel>Confirmed</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.shipped}</StatNumber>
          <StatLabel>Shipped</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.delivered}</StatNumber>
          <StatLabel>Delivered</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>KSh {stats.totalRevenue.toLocaleString()}</StatNumber>
          <StatLabel>Total Revenue</StatLabel>
        </StatCard>
      </StatsContainer>

      <FilterSection>
        <FilterRow>
          <div>
            <label>Filter by Status: </label>
            <FilterSelect 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </FilterSelect>
          </div>
        </FilterRow>
      </FilterSection>

      <OrdersTable>
        <TableHeader>
          <div>Order ID</div>
          <div>Customer</div>
          <div>Items</div>
          <div>Total</div>
          <div>Status</div>
          <div>Actions</div>
        </TableHeader>
        
        {filteredOrders.map(order => (
          <OrderRow key={order.id}>
            <OrderId>{order.id}</OrderId>
            
            <CustomerInfo>
              <CustomerName>{order.customer.name}</CustomerName>
              <CustomerPhone>{order.customer.phone}</CustomerPhone>
            </CustomerInfo>
            
            <OrderItems>
              {order.items.map((item, index) => (
                <div key={index}>
                  <ItemName>{item.name}</ItemName>
                  <ItemQuantity>Qty: {item.quantity}</ItemQuantity>
                </div>
              ))}
            </OrderItems>
            
            <OrderTotal>KSh {order.total.toLocaleString()}</OrderTotal>
            
            <div>
              {getStatusComponent(order.status)}
            </div>
            
            <ActionButtons>
              <ViewButton>
                <FaEye />
                View
              </ViewButton>
              
              {order.status === 'pending' && (
                <ConfirmButton onClick={() => updateOrderStatus(order.id, 'confirmed')}>
                  <FaCheck />
                  Confirm
                </ConfirmButton>
              )}
              
              {order.status === 'confirmed' && (
                <ShipButton onClick={() => updateOrderStatus(order.id, 'shipped')}>
                  <FaTruck />
                  Ship
                </ShipButton>
              )}
              
              {order.status === 'shipped' && (
                <ConfirmButton onClick={() => updateOrderStatus(order.id, 'delivered')}>
                  <FaCheck />
                  Deliver
                </ConfirmButton>
              )}
              
              {order.status === 'pending' && (
                <CancelButton onClick={() => updateOrderStatus(order.id, 'cancelled')}>
                  <FaTimes />
                  Cancel
                </CancelButton>
              )}
              
              <ContactButton onClick={() => handleWhatsApp(order.customer.phone)}>
                <FaWhatsapp />
                WhatsApp
              </ContactButton>
              
              <ActionButton onClick={() => handleCall(order.customer.phone)}>
                <FaPhone />
                Call
              </ActionButton>
            </ActionButtons>
          </OrderRow>
        ))}
      </OrdersTable>
    </Container>
  );
};

export default AdminOrders; 