import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAdminAuth } from '../context/AdminAuthContext';
import { 
  FaDatabase, FaPlus, FaEdit, FaTrash, FaEye, FaSearch, 
  FaFilter, FaDownload, FaSync, FaBox, FaExclamationTriangle
} from 'react-icons/fa';

const Container = styled.div`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: #333;
  font-size: 2rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  background: ${props => props.variant === 'secondary' ? '#f8f9fa' : '#667eea'};
  color: ${props => props.variant === 'secondary' ? '#333' : 'white'};
  border: ${props => props.variant === 'secondary' ? '1px solid #dee2e6' : 'none'};
  
  &:hover {
    background: ${props => props.variant === 'secondary' ? '#e9ecef' : '#5a67d8'};
  }
`;

const InventoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
`;

const InventoryCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const InventoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const InventoryTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
`;

const InventoryActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  padding: 0.5rem;
  border: none;
  border-radius: 6px;
  background: ${props => props.variant === 'danger' ? '#dc3545' : '#667eea'};
  color: white;
  cursor: pointer;
  
  &:hover {
    background: ${props => props.variant === 'danger' ? '#c82333' : '#5a67d8'};
  }
`;

const InventoryStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
`;

const StatItem = styled.div`
  text-align: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
`;

const StatLabel = styled.div`
  color: #666;
  font-size: 0.8rem;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.1rem;
  color: #718096;
`;

export default function AdminInventory() {
  const [inventory, setInventory] = useState([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStockProducts: 0,
    outOfStockProducts: 0,
    inStockProducts: 0,
    totalInventoryValue: 0
  });
  const [recentProducts, setRecentProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getAdminToken } = useAdminAuth();

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const token = getAdminToken();
      const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      
      const response = await fetch(`${API_BASE}/admin/inventory`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data.stats || {});
        setRecentProducts(data.recentProducts || []);
        setInventory(data.inventory || []);
      }
    } catch (error) {
      console.error('Error fetching inventory:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  if (loading) {
    return (
      <Container>
        <LoadingSpinner>Loading inventory...</LoadingSpinner>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>
          <FaDatabase />
          Inventory Management
        </Title>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button variant="secondary">
            <FaDownload />
            Export
          </Button>
          <Button>
            <FaPlus />
            Add Item
          </Button>
        </div>
      </Header>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>Total Products</h3>
          <p style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold', color: '#667eea' }}>{stats.totalProducts}</p>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>In Stock</h3>
          <p style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>{stats.inStockProducts}</p>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>Low Stock</h3>
          <p style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b' }}>{stats.lowStockProducts}</p>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>Out of Stock</h3>
          <p style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold', color: '#ef4444' }}>{stats.outOfStockProducts}</p>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>Total Value</h3>
          <p style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold', color: '#8b5cf6' }}>KES {stats.totalInventoryValue?.toLocaleString() || 0}</p>
        </div>
      </div>

      <InventoryGrid>
        {inventory.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#718096' }}>
            <h3>No inventory items found</h3>
            <p>Add your first inventory item to get started</p>
          </div>
        ) : (
          inventory.map((item) => (
            <InventoryCard key={item._id}>
              <InventoryHeader>
                <InventoryTitle>{item.name}</InventoryTitle>
                <InventoryActions>
                  <ActionButton>
                    <FaEye />
                  </ActionButton>
                  <ActionButton>
                    <FaEdit />
                  </ActionButton>
                  <ActionButton variant="danger">
                    <FaTrash />
                  </ActionButton>
                </InventoryActions>
              </InventoryHeader>
              
              <InventoryStats>
                <StatItem>
                  <StatValue>{item.quantity || 0}</StatValue>
                  <StatLabel>Quantity</StatLabel>
                </StatItem>
                <StatItem>
                  <StatValue>{item.price || '$0'}</StatValue>
                  <StatLabel>Price</StatLabel>
                </StatItem>
                <StatItem>
                  <StatValue>{item.status || 'Active'}</StatValue>
                  <StatLabel>Status</StatLabel>
                </StatItem>
              </InventoryStats>
            </InventoryCard>
          ))
        )}
      </InventoryGrid>
    </Container>
  );
} 