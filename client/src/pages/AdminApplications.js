import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { 
  FaFileAlt, FaEye, FaCheck, FaTimes, FaCalendarAlt, 
  FaEnvelope, FaPhone, FaSpinner, FaDownload, FaReply
} from 'react-icons/fa';
import { useAdminAuth } from '../context/AdminAuthContext';
import ApplicationResponseModal from '../components/ApplicationResponseModal';

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

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.color || 'linear-gradient(90deg, #667eea, #764ba2)'};
  }
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #666;
  font-size: 0.9rem;
  font-weight: 500;
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

const ApplicationsTable = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr auto;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-bottom: 1px solid #e1e5e9;
  font-weight: 600;
  color: #333;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr auto;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #f0f0f0;
  align-items: center;

  &:hover {
    background: #f8f9fa;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const ApplicantInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const ApplicantAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
`;

const ApplicantDetails = styled.div`
  flex: 1;
`;

const ApplicantName = styled.div`
  font-weight: 600;
  color: #333;
  margin-bottom: 0.25rem;
`;

const ApplicantEmail = styled.div`
  font-size: 0.875rem;
  color: #666;
`;

const ProgramName = styled.div`
  font-weight: 600;
  color: #333;
`;

const ApplicationStatus = styled.div`
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
    props.status === 'approved' ? '#d1fae5' : 
    props.status === 'pending' ? '#fef3c7' : 
    props.status === 'rejected' ? '#fee2e2' : '#dbeafe'
  };
  color: ${props => 
    props.status === 'approved' ? '#065f46' : 
    props.status === 'pending' ? '#92400e' : 
    props.status === 'rejected' ? '#991b1b' : '#1e40af'
  };
`;

const ApplicationDate = styled.div`
  font-size: 0.875rem;
  color: #666;
`;

const ApplicationActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  padding: 0.5rem;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  background: ${props => 
    props.variant === 'view' ? '#e3f2fd' :
    props.variant === 'respond' ? '#f3e5f5' :
    props.variant === 'approve' ? '#d1fae5' :
    props.variant === 'reject' ? '#fee2e2' : '#f3e5f5'
  };
  color: ${props => 
    props.variant === 'view' ? '#1976d2' :
    props.variant === 'respond' ? '#7b1fa2' :
    props.variant === 'approve' ? '#065f46' :
    props.variant === 'reject' ? '#991b1b' : '#7b1fa2'
  };

  &:hover {
    background: ${props => 
      props.variant === 'view' ? '#bbdefb' :
      props.variant === 'respond' ? '#e1bee7' :
      props.variant === 'approve' ? '#a7f3d0' :
      props.variant === 'reject' ? '#fecaca' : '#e1bee7'
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

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [programFilter, setProgramFilter] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  });
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const { getAdminToken } = useAdminAuth();

  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      
      const token = getAdminToken();
      const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      
      const params = new URLSearchParams({
        ...(searchTerm && { search: searchTerm }),
        ...(statusFilter && { status: statusFilter }),
        ...(programFilter && { program: programFilter })
      });

      const response = await fetch(`${API_BASE}/admin/applications?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setApplications(data.applications || []);
        setStats(data.stats || { total: 0, pending: 0, approved: 0, rejected: 0 });
      } else {
        setError('Failed to fetch applications');
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
      setError('Error fetching applications');
    } finally {
      setLoading(false);
    }
  }, [getAdminToken, searchTerm, statusFilter, programFilter]);

  useEffect(() => {
    fetchApplications();
  }, [searchTerm, statusFilter, programFilter, fetchApplications]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleProgramFilter = (e) => {
    setProgramFilter(e.target.value);
  };

  const handleApplicationAction = async (action, applicationId) => {
    try {
      const token = getAdminToken();
      const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      
      switch (action) {
        case 'view':
          // Navigate to application details page
          console.log('View application:', applicationId);
          break;
          
        case 'respond':
          const application = applications.find(app => app._id === applicationId);
          setSelectedApplication(application);
          setShowResponseModal(true);
          break;
          
        case 'approve':
          if (window.confirm('Are you sure you want to approve this application?')) {
            const response = await fetch(`${API_BASE}/admin/applications/${applicationId}/approve`, {
              method: 'PUT',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            });
            
            if (response.ok) {
              fetchApplications();
            } else {
              alert('Failed to approve application');
            }
          }
          break;
          
        case 'reject':
          if (window.confirm('Are you sure you want to reject this application?')) {
            const response = await fetch(`${API_BASE}/admin/applications/${applicationId}/reject`, {
              method: 'PUT',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            });
            
            if (response.ok) {
              fetchApplications();
            } else {
              alert('Failed to reject application');
            }
          }
          break;
          
        default:
          break;
      }
    } catch (error) {
      console.error('Error performing application action:', error);
      alert('Error performing action');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <FaCheck />;
      case 'rejected': return <FaTimes />;
      case 'pending': return <FaFileAlt />;
      default: return <FaFileAlt />;
    }
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <Container>
        <Header>
          <Title>
            <FaFileAlt /> Applications Management
          </Title>
        </Header>
        <LoadingSpinner>
          <FaSpinner style={{ animation: 'spin 1s linear infinite' }} />
          <span style={{ marginLeft: '1rem' }}>Loading applications...</span>
        </LoadingSpinner>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>
          <FaFileAlt /> Applications Management
        </Title>
        <HeaderActions>
          <Button variant="secondary">
            <FaDownload /> Export
          </Button>
        </HeaderActions>
      </Header>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {/* Statistics */}
      <StatsGrid>
        <StatCard color="linear-gradient(90deg, #667eea, #764ba2)">
          <StatValue>{stats.total}</StatValue>
          <StatLabel>Total Applications</StatLabel>
        </StatCard>
        <StatCard color="linear-gradient(90deg, #f59e0b, #d97706)">
          <StatValue>{stats.pending}</StatValue>
          <StatLabel>Pending Review</StatLabel>
        </StatCard>
        <StatCard color="linear-gradient(90deg, #10b981, #059669)">
          <StatValue>{stats.approved}</StatValue>
          <StatLabel>Approved</StatLabel>
        </StatCard>
        <StatCard color="linear-gradient(90deg, #ef4444, #dc2626)">
          <StatValue>{stats.rejected}</StatValue>
          <StatLabel>Rejected</StatLabel>
        </StatCard>
      </StatsGrid>

      <SearchBar>
        <SearchInput
          type="text"
          placeholder="Search applications..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <FilterSelect value={statusFilter} onChange={handleStatusFilter}>
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </FilterSelect>
        <FilterSelect value={programFilter} onChange={handleProgramFilter}>
          <option value="">All Programs</option>
          <option value="youth-leadership">Youth Leadership Training</option>
          <option value="women-empowerment">Women Empowerment Workshop</option>
          <option value="digital-skills">Digital Skills Training</option>
        </FilterSelect>
      </SearchBar>

      {applications.length === 0 ? (
        <EmptyState>
          <FaFileAlt style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }} />
          <h3>No applications found</h3>
          <p>Applications will appear here when users apply for programs</p>
        </EmptyState>
      ) : (
        <ApplicationsTable>
          <TableHeader>
            <div>Applicant</div>
            <div>Program</div>
            <div>Status</div>
            <div>Applied Date</div>
            <div>Contact</div>
            <div>Actions</div>
          </TableHeader>
          
          {applications.map((application) => (
            <TableRow key={application._id}>
              <ApplicantInfo>
                <ApplicantAvatar>
                  {getInitials(application.firstName, application.lastName)}
                </ApplicantAvatar>
                <ApplicantDetails>
                  <ApplicantName>
                    {application.firstName} {application.lastName}
                  </ApplicantName>
                  <ApplicantEmail>{application.email}</ApplicantEmail>
                </ApplicantDetails>
              </ApplicantInfo>
              
              <ProgramName>{application.programName}</ProgramName>
              
              <ApplicationStatus status={application.status}>
                {getStatusIcon(application.status)} {application.status}
              </ApplicationStatus>
              
              <ApplicationDate>
                <FaCalendarAlt style={{ marginRight: '0.25rem' }} />
                {formatDate(application.appliedDate)}
              </ApplicationDate>
              
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <FaEnvelope style={{ color: '#666' }} />
                  <span style={{ fontSize: '0.875rem' }}>{application.email}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FaPhone style={{ color: '#666' }} />
                  <span style={{ fontSize: '0.875rem' }}>{application.phone}</span>
                </div>
              </div>
              
              <ApplicationActions>
                <ActionButton
                  variant="view"
                  onClick={() => handleApplicationAction('view', application._id)}
                  title="View Details"
                >
                  <FaEye />
                </ActionButton>
                <ActionButton
                  variant="respond"
                  onClick={() => handleApplicationAction('respond', application._id)}
                  title="Send Response"
                >
                  <FaReply />
                </ActionButton>
                {application.status === 'pending' && (
                  <>
                    <ActionButton
                      variant="approve"
                      onClick={() => handleApplicationAction('approve', application._id)}
                      title="Approve"
                    >
                      <FaCheck />
                    </ActionButton>
                    <ActionButton
                      variant="reject"
                      onClick={() => handleApplicationAction('reject', application._id)}
                      title="Reject"
                    >
                      <FaTimes />
                    </ActionButton>
                  </>
                )}
              </ApplicationActions>
            </TableRow>
          ))}
        </ApplicationsTable>
      )}

      {/* Application Response Modal */}
      <ApplicationResponseModal
        application={selectedApplication}
        isOpen={showResponseModal}
        onClose={() => {
          setShowResponseModal(false);
          setSelectedApplication(null);
        }}
        onResponseSent={() => {
          fetchApplications(); // Refresh the applications list
        }}
      />
    </Container>
  );
};

export default AdminApplications; 