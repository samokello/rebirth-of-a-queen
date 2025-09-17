import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAdminAuth } from '../context/AdminAuthContext';
import { 
  FaUser, FaUsers, FaSearch, FaFilter, FaEdit, FaTrash, 
  FaEye, FaDownload, FaSync, FaPlus, FaEnvelope, FaPhone,
  FaCalendarAlt, FaMapMarkerAlt, FaShieldAlt, FaCheckCircle,
  FaTimesCircle, FaUserPlus, FaUserCheck, FaUserTimes
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
`;

const SearchBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const FilterSelect = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  font-size: 1rem;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const ProfilesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const ProfileCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
`;

const ProfileAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.2rem;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 0.25rem 0;
`;

const ProfileEmail = styled.div`
  color: #666;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ProfileRole = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const RoleBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${props => {
    switch (props.role) {
      case 'admin': return '#dc3545';
      case 'moderator': return '#fd7e14';
      default: return '#28a745';
    }
  }};
  color: white;
`;

const ProfileActions = styled.div`
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
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.variant === 'danger' ? '#c82333' : '#5a67d8'};
  }
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
`;

const DetailIcon = styled.div`
  color: #667eea;
  font-size: 1rem;
  width: 20px;
  text-align: center;
`;

const DetailContent = styled.div`
  flex: 1;
`;

const DetailLabel = styled.div`
  font-size: 0.8rem;
  color: #666;
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const DetailValue = styled.div`
  color: #333;
  font-weight: 500;
`;

const ProfileStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
`;

const StatItem = styled.div`
  text-align: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  color: #666;
  font-size: 0.8rem;
  font-weight: 500;
`;

const StatusBadge = styled.div`
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${props => props.active ? '#d1fae5' : '#fee2e2'};
  color: ${props => props.active ? '#065f46' : '#991b1b'};
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.1rem;
  color: #718096;
`;

const ErrorMessage = styled.div`
  color: #e53e3e;
  padding: 1rem;
  background: #fed7d7;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #fecaca;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #718096;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
`;

const PageButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #dee2e6;
  background: white;
  color: #333;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f8f9fa;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${props => props.$active && `
    background: #667eea;
    color: white;
    border-color: #667eea;
  `}
`;

export default function AdminProfiles() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { getAdminToken } = useAdminAuth();

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      setError('');
      
      const token = getAdminToken();
      const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      
      const params = new URLSearchParams({
        page: currentPage,
        limit: 20,
        ...(searchTerm && { search: searchTerm }),
        ...(roleFilter && { role: roleFilter }),
        ...(statusFilter && { status: statusFilter })
      });

      const response = await fetch(`${API_BASE}/admin/profiles?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setProfiles(data.profiles || []);
        setTotalPages(data.pagination?.pages || 1);
      } else {
        setError('Failed to fetch profiles');
      }
    } catch (error) {
      console.error('Error fetching profiles:', error);
      setError('Error fetching profiles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, [currentPage, searchTerm, roleFilter, statusFilter]);

  const handleProfileAction = async (action, profileId) => {
    try {
      const token = getAdminToken();
      const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      
      switch (action) {
        case 'view':
          // Navigate to profile detail page
          window.open(`/admin/profiles/${profileId}`, '_blank');
          break;
          
        case 'edit':
          // Navigate to edit profile page
          window.open(`/admin/profiles/${profileId}/edit`, '_blank');
          break;
          
        case 'delete':
          if (window.confirm('Are you sure you want to delete this profile? This action cannot be undone.')) {
            const response = await fetch(`${API_BASE}/admin/profiles/${profileId}`, {
              method: 'DELETE',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            });
            
            if (response.ok) {
              fetchProfiles();
              alert('Profile deleted successfully');
            } else {
              alert('Failed to delete profile');
            }
          }
          break;
          
        case 'toggleStatus':
          const profile = profiles.find(p => p._id === profileId);
          const newStatus = !profile.isActive;
          
          const response = await fetch(`${API_BASE}/admin/profiles/${profileId}`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ isActive: newStatus })
          });
          
          if (response.ok) {
            fetchProfiles();
            alert(`Profile ${newStatus ? 'activated' : 'deactivated'} successfully`);
          } else {
            alert('Failed to update profile status');
          }
          break;
          
        default:
          console.log(`${action} action for profile: ${profileId}`);
      }
    } catch (error) {
      console.error('Error performing profile action:', error);
      alert('An error occurred while performing the action');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getUserInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  const getProfileStats = (profile) => {
    return {
      donations: profile.donationCount || 0,
      orders: profile.orderCount || 0,
      logins: profile.loginCount || 0
    };
  };

  if (loading) {
    return (
      <Container>
        <LoadingSpinner>Loading profiles...</LoadingSpinner>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>
          <FaUsers />
          User Profiles
        </Title>
        <HeaderActions>
          <Button variant="secondary">
            <FaDownload />
            Export
          </Button>
          <Button onClick={fetchProfiles}>
            <FaSync />
            Refresh
          </Button>
        </HeaderActions>
      </Header>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <SearchBar>
        <SearchInput
          type="text"
          placeholder="Search profiles by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FilterSelect value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="moderator">Moderator</option>
          <option value="user">User</option>
        </FilterSelect>
        <FilterSelect value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </FilterSelect>
      </SearchBar>

      <ProfilesGrid>
        {profiles.length === 0 ? (
          <EmptyState>
            <h3>No profiles found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </EmptyState>
        ) : (
          profiles.map((profile) => {
            const stats = getProfileStats(profile);
            return (
              <ProfileCard key={profile._id}>
                <ProfileHeader>
                  <ProfileAvatar>
                    {getUserInitials(profile.firstName, profile.lastName)}
                  </ProfileAvatar>
                  <ProfileInfo>
                    <ProfileName>{profile.firstName} {profile.lastName}</ProfileName>
                    <ProfileEmail>
                      <FaEnvelope />
                      {profile.email}
                    </ProfileEmail>
                    <ProfileRole>
                      <FaShieldAlt />
                      <RoleBadge role={profile.role}>
                        {profile.role}
                      </RoleBadge>
                    </ProfileRole>
                  </ProfileInfo>
                  <ProfileActions>
                    <ActionButton onClick={() => handleProfileAction('view', profile._id)}>
                      <FaEye />
                    </ActionButton>
                    <ActionButton onClick={() => handleProfileAction('edit', profile._id)}>
                      <FaEdit />
                    </ActionButton>
                    <ActionButton variant="danger" onClick={() => handleProfileAction('delete', profile._id)}>
                      <FaTrash />
                    </ActionButton>
                  </ProfileActions>
                </ProfileHeader>
                
                <ProfileDetails>
                  <DetailItem>
                    <DetailIcon>
                      <FaPhone />
                    </DetailIcon>
                    <DetailContent>
                      <DetailLabel>Phone</DetailLabel>
                      <DetailValue>{profile.phone || 'Not provided'}</DetailValue>
                    </DetailContent>
                  </DetailItem>
                  
                  <DetailItem>
                    <DetailIcon>
                      <FaCalendarAlt />
                    </DetailIcon>
                    <DetailContent>
                      <DetailLabel>Joined</DetailLabel>
                      <DetailValue>{formatDate(profile.createdAt)}</DetailValue>
                    </DetailContent>
                  </DetailItem>
                  
                  <DetailItem>
                    <DetailIcon>
                      <FaMapMarkerAlt />
                    </DetailIcon>
                    <DetailContent>
                      <DetailLabel>Location</DetailLabel>
                      <DetailValue>
                        {profile.address?.city && profile.address?.country 
                          ? `${profile.address.city}, ${profile.address.country}`
                          : 'Not provided'
                        }
                      </DetailValue>
                    </DetailContent>
                  </DetailItem>
                  
                  <DetailItem>
                    <DetailIcon>
                      {profile.isActive ? <FaCheckCircle /> : <FaTimesCircle />}
                    </DetailIcon>
                    <DetailContent>
                      <DetailLabel>Status</DetailLabel>
                      <StatusBadge active={profile.isActive}>
                        {profile.isActive ? <FaUserCheck /> : <FaUserTimes />}
                        {profile.isActive ? 'Active' : 'Inactive'}
                      </StatusBadge>
                    </DetailContent>
                  </DetailItem>
                </ProfileDetails>
                
                <ProfileStats>
                  <StatItem>
                    <StatValue>{stats.donations}</StatValue>
                    <StatLabel>Donations</StatLabel>
                  </StatItem>
                  <StatItem>
                    <StatValue>{stats.orders}</StatValue>
                    <StatLabel>Orders</StatLabel>
                  </StatItem>
                  <StatItem>
                    <StatValue>{stats.logins}</StatValue>
                    <StatLabel>Logins</StatLabel>
                  </StatItem>
                </ProfileStats>
              </ProfileCard>
            );
          })
        )}
      </ProfilesGrid>

      {totalPages > 1 && (
        <Pagination>
          <PageButton
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </PageButton>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PageButton
              key={page}
              $active={page === currentPage}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </PageButton>
          ))}
          
          <PageButton
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </PageButton>
        </Pagination>
      )}
    </Container>
  );
} 