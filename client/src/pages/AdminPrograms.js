import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  FaGraduationCap, FaPlus, FaEdit, FaTrash, FaEye, 
  FaSearch, FaFilter, FaCalendarAlt, FaUsers, FaCheckCircle,
  FaTimes, FaSpinner, FaDownload
} from 'react-icons/fa';
import { useAdminAuth } from '../context/AdminAuthContext';

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
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 1rem;
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

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SearchBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: #667eea;
  }
`;

const FilterSelect = styled.select`
  padding: 0.75rem 1rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  background: white;

  &:focus {
    border-color: #667eea;
  }
`;

const ProgramsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const ProgramCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }
`;

const ProgramImage = styled.div`
  height: 200px;
  background: ${props => props.image ? `url(${props.image})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
`;

const ProgramContent = styled.div`
  padding: 1.5rem;
`;

const ProgramTitle = styled.h3`
  color: #333;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const ProgramDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ProgramStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 8px;
`;

const Stat = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: #333;
`;

const StatLabel = styled.div`
  font-size: 0.75rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ProgramStatus = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: ${props => 
    props.status === 'active' ? '#d1fae5' : 
    props.status === 'draft' ? '#fef3c7' : 
    props.status === 'completed' ? '#dbeafe' : '#fee2e2'
  };
  color: ${props => 
    props.status === 'active' ? '#065f46' : 
    props.status === 'draft' ? '#92400e' : 
    props.status === 'completed' ? '#1e40af' : '#991b1b'
  };
`;

const ProgramActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #f0f0f0;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 0.5rem;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  transition: all 0.2s ease;
  background: ${props => 
    props.variant === 'view' ? '#e3f2fd' :
    props.variant === 'edit' ? '#fff3e0' :
    props.variant === 'delete' ? '#ffebee' : '#f3e5f5'
  };
  color: ${props => 
    props.variant === 'view' ? '#1976d2' :
    props.variant === 'edit' ? '#f57c00' :
    props.variant === 'delete' ? '#d32f2f' : '#7b1fa2'
  };

  &:hover {
    background: ${props => 
      props.variant === 'view' ? '#bbdefb' :
      props.variant === 'edit' ? '#ffe0b2' :
      props.variant === 'delete' ? '#ffcdd2' : '#e1bee7'
    };
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #667eea;
  font-size: 1.5rem;
`;

const ErrorMessage = styled.div`
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
`;

const AdminPrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const { getAdminToken } = useAdminAuth();

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      setError('');
      
      const token = getAdminToken();
      const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      
      const params = new URLSearchParams({
        ...(searchTerm && { search: searchTerm }),
        ...(statusFilter && { status: statusFilter })
      });

      const response = await fetch(`${API_BASE}/admin/programs?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setPrograms(data.programs || []);
      } else {
        setError('Failed to fetch programs');
      }
    } catch (error) {
      console.error('Error fetching programs:', error);
      setError('Error fetching programs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, [searchTerm, statusFilter]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleProgramAction = async (action, programId) => {
    try {
      const token = getAdminToken();
      const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      
      switch (action) {
        case 'view':
          // Navigate to program details page
          console.log('View program:', programId);
          break;
          
        case 'edit':
          // Navigate to edit program page
          console.log('Edit program:', programId);
          break;
          
        case 'delete':
          if (window.confirm('Are you sure you want to delete this program? This action cannot be undone.')) {
            const response = await fetch(`${API_BASE}/admin/programs/${programId}`, {
              method: 'DELETE',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            });
            
            if (response.ok) {
              // Refresh programs list
              fetchPrograms();
            } else {
              alert('Failed to delete program');
            }
          }
          break;
          
        default:
          break;
      }
    } catch (error) {
      console.error('Error performing program action:', error);
      alert('Error performing action');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <FaCheckCircle />;
      case 'draft': return <FaTimes />;
      case 'completed': return <FaCheckCircle />;
      default: return <FaTimes />;
    }
  };

  if (loading) {
    return (
      <Container>
        <Header>
          <Title>
            <FaGraduationCap /> Programs Management
          </Title>
        </Header>
        <LoadingSpinner>
          <FaSpinner style={{ animation: 'spin 1s linear infinite' }} />
          <span style={{ marginLeft: '1rem' }}>Loading programs...</span>
        </LoadingSpinner>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>
          <FaGraduationCap /> Programs Management
        </Title>
        <HeaderActions>
          <Button variant="secondary">
            <FaDownload /> Export
          </Button>
          <Button>
            <FaPlus /> Add Program
          </Button>
        </HeaderActions>
      </Header>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <SearchBar>
        <SearchInput
          type="text"
          placeholder="Search programs..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <FilterSelect value={statusFilter} onChange={handleStatusFilter}>
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="completed">Completed</option>
          <option value="paused">Paused</option>
        </FilterSelect>
      </SearchBar>

      {programs.length === 0 ? (
        <EmptyState>
          <FaGraduationCap style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }} />
          <h3>No programs found</h3>
          <p>Create your first program to get started</p>
          <Button style={{ marginTop: '1rem' }}>
            <FaPlus /> Create Program
          </Button>
        </EmptyState>
      ) : (
        <ProgramsGrid>
          {programs.map((program) => (
            <ProgramCard key={program._id}>
              <ProgramImage image={program.image}>
                {!program.image && <FaGraduationCap />}
              </ProgramImage>
              <ProgramContent>
                <ProgramTitle>{program.title}</ProgramTitle>
                <ProgramDescription>{program.description}</ProgramDescription>
                
                <ProgramStats>
                  <Stat>
                    <StatValue>{program.participants || 0}</StatValue>
                    <StatLabel>Participants</StatLabel>
                  </Stat>
                  <Stat>
                    <StatValue>{program.duration || 'N/A'}</StatValue>
                    <StatLabel>Duration</StatLabel>
                  </Stat>
                  <Stat>
                    <StatValue>{program.capacity || '∞'}</StatValue>
                    <StatLabel>Capacity</StatLabel>
                  </Stat>
                </ProgramStats>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <ProgramStatus status={program.status}>
                    {getStatusIcon(program.status)} {program.status}
                  </ProgramStatus>
                  <div style={{ fontSize: '0.875rem', color: '#666' }}>
                    <FaCalendarAlt style={{ marginRight: '0.25rem' }} />
                    {new Date(program.startDate).toLocaleDateString()}
                  </div>
                </div>

                <ProgramActions>
                  <ActionButton
                    variant="view"
                    onClick={() => handleProgramAction('view', program._id)}
                  >
                    <FaEye /> View
                  </ActionButton>
                  <ActionButton
                    variant="edit"
                    onClick={() => handleProgramAction('edit', program._id)}
                  >
                    <FaEdit /> Edit
                  </ActionButton>
                  <ActionButton
                    variant="delete"
                    onClick={() => handleProgramAction('delete', program._id)}
                  >
                    <FaTrash /> Delete
                  </ActionButton>
                </ProgramActions>
              </ProgramContent>
            </ProgramCard>
          ))}
        </ProgramsGrid>
      )}
    </Container>
  );
};

export default AdminPrograms; 