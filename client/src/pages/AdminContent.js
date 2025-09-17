import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAdminAuth } from '../context/AdminAuthContext';
import { 
  FaEdit, FaPlus, FaTrash, FaEye, FaSearch, FaFilter, 
  FaDownload, FaSync, FaFileAlt, FaImage, FaVideo, FaLink
} from 'react-icons/fa';
import ApplicationDashboard from '../components/ApplicationDashboard';

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

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
`;

const ContentCard = styled.div`
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

const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ContentTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
`;

const ContentActions = styled.div`
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

const ContentDescription = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const ContentMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #666;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.1rem;
  color: #718096;
`;

export default function AdminContent() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getAdminToken } = useAdminAuth();

  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    draft: 0,
    archived: 0
  });

  const fetchContent = async () => {
    try {
      setLoading(true);
      const token = getAdminToken();
      const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      
      const response = await fetch(`${API_BASE}/admin/content`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setContent(data.content || []);
        setStats(data.stats || { total: 0, published: 0, draft: 0, archived: 0 });
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  if (loading) {
    return (
      <Container>
        <LoadingSpinner>Loading content...</LoadingSpinner>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>
          <FaEdit />
          Content Management
        </Title>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button variant="secondary">
            <FaDownload />
            Export
          </Button>
          <Button>
            <FaPlus />
            Add Content
          </Button>
        </div>
      </Header>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>Total Content</h3>
          <p style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold', color: '#667eea' }}>{stats.total}</p>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>Published</h3>
          <p style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>{stats.published}</p>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>Drafts</h3>
          <p style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b' }}>{stats.draft}</p>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>Archived</h3>
          <p style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold', color: '#6b7280' }}>{stats.archived}</p>
        </div>
      </div>

      <ContentGrid>
        {content.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#718096' }}>
            <h3>No content found</h3>
            <p>Create your first content piece to get started</p>
          </div>
        ) : (
          content.map((item) => (
            <ContentCard key={item._id}>
              <ContentHeader>
                <ContentTitle>{item.title}</ContentTitle>
                <ContentActions>
                  <ActionButton>
                    <FaEye />
                  </ActionButton>
                  <ActionButton>
                    <FaEdit />
                  </ActionButton>
                  <ActionButton variant="danger">
                    <FaTrash />
                  </ActionButton>
                </ContentActions>
              </ContentHeader>
              
              <ContentDescription>{item.description}</ContentDescription>
              
              <ContentMeta>
                <span>Type: {item.type}</span>
                <span>Status: {item.status}</span>
              </ContentMeta>
            </ContentCard>
          ))
        )}
      </ContentGrid>
    </Container>
  );
} 