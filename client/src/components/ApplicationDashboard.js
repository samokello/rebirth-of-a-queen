import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { FaEnvelope, FaSms, FaUsers, FaClock, FaCheckCircle, FaTimesCircle, FaEye, FaReply, FaChartLine , FaCalendarAlt, FaFilter, FaSearch } from 'react-icons/fa';
import { useAdminAuth } from '../context/AdminAuthContext';
import ApplicationResponseModal from './ApplicationResponseModal';

const ApplicationDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    today: 0,
    thisWeek: 0
  });
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [programFilter, setProgramFilter] = useState('');
  const { getAdminToken } = useAdminAuth();

  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      const token = getAdminToken();
      const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

      const response = await fetch(`${API_BASE}/admin/applications?limit=50`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setApplications(data.applications || []);
        setStats(data.stats || { total: 0, pending: 0, approved: 0, rejected: 0 });
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  }, [getAdminToken]);

  useEffect(() => {
    fetchApplications();
    
    // Refresh every 30 seconds for real-time updates
    const interval = setInterval(fetchApplications, 30000);
    return () => clearInterval(interval);
  }, [fetchApplications]);

  const handleRespond = (application) => {
    setSelectedApplication(application);
    setShowResponseModal(true);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <FaClock style={{ color: '#fdcb6e' }} />;
      case 'accepted':
        return <FaCheckCircle style={{ color: '#00b894' }} />;
      case 'rejected':
        return <FaTimesCircle style={{ color: '#e17055' }} />;
      default:
        return <FaClock style={{ color: '#636e72' }} />;
    }
  };


  const filteredApplications = applications.filter(app => {
    const matchesSearch = !searchTerm || 
      `${app.firstName} ${app.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.program.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || app.status === statusFilter;
    const matchesProgram = !programFilter || app.program === programFilter;
    return matchesSearch && matchesStatus && matchesProgram;
  });

  const uniquePrograms = [...new Set(applications.map(app => app.program))];

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingSpinner>
          <FaClock className="spinner" />
          <LoadingText>Loading applications...</LoadingText>
        </LoadingSpinner>
      </LoadingContainer>
    );
  }

  return (
    <Container>
      {/* Header Section */}
      <Header>
        <HeaderContent>
          <Title>Applications Dashboard</Title>
          <Subtitle>Manage and track all program applications</Subtitle>
        </HeaderContent>
        <HeaderActions>
          <RefreshButton onClick={fetchApplications}>
            <FaChartLine /> Refresh Data
          </RefreshButton>
        </HeaderActions>
      </Header>

      {/* KPI Cards */}
      <KPIContainer>
        <KPICard>
          <KPIIcon color="#74b9ff">
            <FaUsers />
          </KPIIcon>
          <KPIContent>
            <KPINumber>{stats.total}</KPINumber>
            <KPILabel>Total Applications</KPILabel>
            <KPITrend>
              <FaChartLine /> +{stats.thisWeek} this week
            </KPITrend>
          </KPIContent>
        </KPICard>

        <KPICard>
          <KPIIcon color="#fdcb6e">
            <FaClock />
          </KPIIcon>
          <KPIContent>
            <KPINumber>{stats.pending}</KPINumber>
            <KPILabel>Pending Review</KPILabel>
            <KPITrend>
              <FaCalendarAlt /> {stats.today} today
            </KPITrend>
          </KPIContent>
        </KPICard>

        <KPICard>
          <KPIIcon color="#00b894">
            <FaCheckCircle />
          </KPIIcon>
          <KPIContent>
            <KPINumber>{stats.approved}</KPINumber>
            <KPILabel>Approved</KPILabel>
            <KPITrend>
              <FaChartLine  /> {stats.approved > 0 ? Math.round((stats.approved / stats.total) * 100) : 0}% rate
            </KPITrend>
          </KPIContent>
        </KPICard>

        <KPICard>
          <KPIIcon color="#e17055">
            <FaTimesCircle />
          </KPIIcon>
          <KPIContent>
            <KPINumber>{stats.rejected}</KPINumber>
            <KPILabel>Rejected</KPILabel>
            <KPITrend>
              <FaChartLine /> {stats.rejected > 0 ? Math.round((stats.rejected / stats.total) * 100) : 0}% rate
            </KPITrend>
          </KPIContent>
        </KPICard>
      </KPIContainer>

      {/* Filters */}
      <Filters>
        <SearchContainer>
          <SearchIcon><FaSearch /></SearchIcon>
          <SearchInput
            type="text"
            placeholder="Search by name, email, or program..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>
        <FilterGroup>
          <FilterLabel><FaFilter /> Status</FilterLabel>
          <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </Select>
        </FilterGroup>
        <FilterGroup>
          <FilterLabel><FaFilter /> Program</FilterLabel>
          <Select value={programFilter} onChange={(e) => setProgramFilter(e.target.value)}>
            <option value="">All Programs</option>
            {uniquePrograms.map(program => (
              <option key={program} value={program}>{program}</option>
            ))}
          </Select>
        </FilterGroup>
      </Filters>

      {/* Applications Table */}
      <TableContainer>
        <TableHeader>
          <TableTitle>Applications Overview</TableTitle>
          <TableSubtitle>
            {filteredApplications.length} of {applications.length} applications
          </TableSubtitle>
        </TableHeader>

        <TableWrapper>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Applicant</TableHeaderCell>
                <TableHeaderCell>Program</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Contact</TableHeaderCell>
                <TableHeaderCell>Applied</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredApplications.slice(0, 15).map((application) => (
                <TableRow key={application._id}>
                  <TableCell>
                    <ApplicantInfo>
                      <ApplicantAvatar>
                        {application.firstName.charAt(0)}{application.lastName.charAt(0)}
                      </ApplicantAvatar>
                      <ApplicantDetails>
                        <ApplicantName>
                          {application.firstName} {application.lastName}
                        </ApplicantName>
                        <ApplicantMeta>
                          Age: {application.age} • {application.location}
                        </ApplicantMeta>
                      </ApplicantDetails>
                    </ApplicantInfo>
                  </TableCell>
                  <TableCell>
                    <ProgramBadge>{application.program}</ProgramBadge>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={application.status}>
                      {getStatusIcon(application.status)}
                      <span>{application.status}</span>
                    </StatusBadge>
                  </TableCell>
                  <TableCell>
                    <ContactInfo>
                      <ContactItem>
                        <FaEnvelope />
                        {application.email}
                      </ContactItem>
                      <ContactItem>
                        <FaSms />
                        {application.phone}
                      </ContactItem>
                    </ContactInfo>
                  </TableCell>
                  <TableCell>
                    <DateText>{formatDate(application.createdAt)}</DateText>
                  </TableCell>
                  <TableCell>
                    <ActionButtons>
                      <ActionButton onClick={() => handleRespond(application)} primary>
                        <FaReply />
                        Respond
                      </ActionButton>
                      <ActionButton>
                        <FaEye />
                        View
                      </ActionButton>
                    </ActionButtons>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableWrapper>

        {filteredApplications.length === 0 && (
          <EmptyState>
            <EmptyIcon><FaUsers /></EmptyIcon>
            <EmptyTitle>No Applications Found</EmptyTitle>
            <EmptyMessage>
              {searchTerm || statusFilter || programFilter 
                ? 'No applications match your current filters. Try adjusting your search criteria.'
                : 'No applications have been submitted yet.'
              }
            </EmptyMessage>
          </EmptyState>
        )}
      </TableContainer>

      {/* Response Modal */}
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

// Styled Components
const Container = styled.div`
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.3;
    pointer-events: none;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const HeaderContent = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: white;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  font-weight: 400;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 1rem;
`;

const RefreshButton = styled.button`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-2px);
  }
`;

const KPIContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const KPICard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
    background: rgba(255, 255, 255, 1);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.color || 'linear-gradient(135deg, #74b9ff, #0984e3)'};
  }
`;

const KPIIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background: ${props => props.color || 'linear-gradient(135deg, #74b9ff, #0984e3)'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const KPIContent = styled.div`
  flex: 1;
`;

const KPINumber = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  color: #2d3436;
  margin-bottom: 0.25rem;
`;

const KPILabel = styled.div`
  font-size: 1rem;
  color: #636e72;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const KPITrend = styled.div`
  font-size: 0.85rem;
  color: #00b894;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-weight: 500;
`;

const Filters = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  min-width: 300px;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.6);
  font-size: 1rem;
  z-index: 1;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 180px;
`;

const FilterLabel = styled.label`
  font-size: 0.85rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Select = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 0.9rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.15);
  }
  
  option {
    background: #333;
    color: white;
  }
`;

const TableContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.div`
  padding: 2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
`;

const TableTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3436;
  margin-bottom: 0.5rem;
`;

const TableSubtitle = styled.p`
  color: #636e72;
  font-size: 0.9rem;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background: rgba(248, 249, 250, 0.8);
`;

const TableRow = styled.tr`
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(248, 249, 250, 0.5);
  }
`;

const TableHeaderCell = styled.th`
  padding: 1rem 1.5rem;
  text-align: left;
  font-weight: 600;
  color: #636e72;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const TableBody = styled.tbody``;

const TableCell = styled.td`
  padding: 1.5rem;
  vertical-align: middle;
`;

const ApplicantInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ApplicantAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
`;

const ApplicantDetails = styled.div``;

const ApplicantName = styled.div`
  font-weight: 600;
  color: #2d3436;
  margin-bottom: 0.25rem;
`;

const ApplicantMeta = styled.div`
  font-size: 0.85rem;
  color: #636e72;
`;

const ProgramBadge = styled.div`
  background: linear-gradient(135deg, #74b9ff, #0984e3);
  color: white;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: capitalize;
  display: inline-block;
`;

const StatusBadge = styled.div`
  background: ${props => {
    switch (props.status) {
      case 'pending': return 'linear-gradient(135deg, #fdcb6e, #e17055)';
      case 'accepted': return 'linear-gradient(135deg, #00b894, #00a085)';
      default: return 'linear-gradient(135deg, #e17055, #d63031)';
    }
  }};
  color: white;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: capitalize;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #636e72;
  
  svg {
    color: #74b9ff;
    font-size: 0.8rem;
  }
`;

const DateText = styled.div`
  font-size: 0.85rem;
  color: #636e72;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  background: ${props => props.primary ? 'linear-gradient(135deg, #ff6b6b, #ee5a24)' : 'linear-gradient(135deg, #74b9ff, #0984e3)'};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

const LoadingSpinner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  
  .spinner {
    animation: spin 1s linear infinite;
    color: white;
    font-size: 2rem;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.div`
  color: white;
  font-size: 1.1rem;
  font-weight: 500;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 1rem;
`;

const EmptyTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.5rem;
`;

const EmptyMessage = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  margin-bottom: 2rem;
  max-width: 400px;
  line-height: 1.5;
`;

export default ApplicationDashboard;
