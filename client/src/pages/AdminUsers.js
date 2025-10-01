import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaEdit, FaTrash, FaEye, FaUserPlus, FaSpinner, FaUsers } from 'react-icons/fa';
import { useAdminAuth } from '../context/AdminAuthContext';

const Container = styled.div`
  padding: 0;
  max-width: 100%;
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
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Toolbar = styled.div`
  display: flex;
  gap: 1rem;
`;

const PrimaryButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);

  &:hover { 
    background: linear-gradient(135deg, #5563c1, #6a4190);
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

const UsersTable = styled.div`
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  overflow: hidden;
  color: white;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1.4fr 0.8fr 0.8fr 1fr 1fr 0.8fr auto;
  gap: 0.75rem;
  padding: 1rem;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2));
  border-bottom: 2px solid rgba(255,255,255,0.2);
  font-weight: 700;
  color: white;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1.4fr 0.8fr 0.8fr 1fr 1fr 0.8fr auto;
  gap: 0.75rem;
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

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
`;

const StatusBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;

  ${props => props.$active ? `
    background: #d4edda;
    color: #155724;
  ` : `
    background: #f8d7da;
    color: #721c24;
  `}
`;

const RoleBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;

  ${props => {
    switch (props.$role) {
      case 'admin':
        return 'background: #fff3cd; color: #856404;';
      case 'moderator':
        return 'background: #d1ecf1; color: #0c5460;';
      default:
        return 'background: #e2e3e5; color: #383d41;';
    }
  }}
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  color: #666;

  &:hover {
    background: #f0f0f0;
    color: #333;
  }

  ${props => props.$danger && `
    &:hover {
      background: #fee;
      color: #e74c3c;
    }
  `}
`;

const LoadingSpinner = styled(FaSpinner)`
  animation: spin 1s linear infinite;
  font-size: 1.5rem;
  color: #667eea;

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;

  h3 {
    margin-bottom: 1rem;
    color: #333;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const PageButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #e1e5e9;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f8f9fa;
  }

  ${props => props.$active && `
    background: #667eea;
    color: white;
    border-color: #667eea;
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState('');

  const { getAdminToken } = useAdminAuth();
  const navigate = useNavigate();
  const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchUsers();
  }, [currentPage, searchTerm, roleFilter, statusFilter]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = getAdminToken();
      
      const params = new URLSearchParams({
        page: currentPage,
        limit: 20,
        ...(searchTerm && { search: searchTerm }),
        ...(roleFilter && { role: roleFilter }),
        ...(statusFilter && { status: statusFilter })
      });

      const response = await fetch(`${API_BASE}/admin/users?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
        setTotalPages(data.pagination.pages);
      } else {
        setError('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const getUserInitials = (user) => {
    if (user.firstName && user.lastName) {
      return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
    }
    if (user.firstName) {
      return user.firstName.substring(0, 2).toUpperCase();
    }
    return 'U';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleRoleFilter = (e) => {
    setRoleFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleUserAction = async (action, userId) => {
    try {
      const token = getAdminToken();
      const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      
      switch (action) {
        case 'view':
          // Navigate to user details page
          navigate(`/admin/users/${userId}`);
          break;
          
        case 'edit':
          // Navigate to edit user page
          navigate(`/admin/users/${userId}/edit`);
          break;
          
        case 'delete':
          if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            const response = await fetch(`${API_BASE}/admin/users/${userId}`, {
              method: 'DELETE',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            });
            
            if (response.ok) {
              // Remove user from the list
              setUsers(prev => prev.filter(user => user._id !== userId));
              alert('User deleted successfully');
            } else {
              alert('Failed to delete user');
            }
          }
          break;
          
        case 'toggleStatus':
          const user = users.find(u => u._id === userId);
          const newStatus = !user.isActive;
          
          const response = await fetch(`${API_BASE}/admin/users/${userId}`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ isActive: newStatus })
          });
          
          if (response.ok) {
            // Update user status in the list
            setUsers(prev => prev.map(u => 
              u._id === userId ? { ...u, isActive: newStatus } : u
            ));
            alert(`User ${newStatus ? 'activated' : 'deactivated'} successfully`);
          } else {
            alert('Failed to update user status');
          }
          break;
          
        default:
          console.log(`${action} action for user: ${userId}`);
      }
    } catch (error) {
      console.error('Error performing user action:', error);
      alert('An error occurred while performing the action');
    }
  };

  if (loading && users.length === 0) {
    return (
      <Container>
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <LoadingSpinner />
          <p>Loading users...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>
          <FaUsers />
          User Management
        </Title>
        <Toolbar>
          <PrimaryButton onClick={() => navigate('/admin/users/new')}>
            <FaUserPlus style={{ marginRight: 8 }} /> Add User
          </PrimaryButton>
        </Toolbar>
      </Header>

      <SearchBar>
        <SearchInput
          type="text"
          placeholder="Search users by name or email..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <FilterSelect value={roleFilter} onChange={handleRoleFilter}>
          <option value="">All Roles</option>
          <option value="user">User</option>
          <option value="moderator">Moderator</option>
          <option value="admin">Admin</option>
        </FilterSelect>
        <FilterSelect value={statusFilter} onChange={handleStatusFilter}>
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </FilterSelect>
      </SearchBar>

      <UsersTable>
        <TableHeader>
          <div>User</div>
          <div>Email</div>
          <div>Role</div>
          <div>Status</div>
          <div>Joined</div>
          <div>Last Login</div>
          <div>Login Count</div>
          <div>Actions</div>
        </TableHeader>

        {users.length === 0 ? (
          <EmptyState>
            <h3>No users found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </EmptyState>
        ) : (
          users.map((user) => (
            <TableRow key={user._id}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <UserAvatar>
                  {getUserInitials(user)}
                </UserAvatar>
                <div>
                  <div style={{ fontWeight: '600' }}>
                    {user.firstName} {user.lastName}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>
                    ID: {user._id.slice(-8)}
                  </div>
                </div>
              </div>
              <div>{user.email}</div>
              <div>
                <RoleBadge $role={user.role}>
                  {user.role}
                </RoleBadge>
              </div>
              <div>
                <StatusBadge $active={user.isActive}>
                  {user.isActive ? 'Active' : 'Inactive'}
                </StatusBadge>
              </div>
              <div>{formatDate(user.createdAt)}</div>
              <div>
                {user.lastLogin ? formatDate(user.lastLogin) : 'Never'}
              </div>
              <div style={{ fontWeight: '600', color: '#667eea' }}>
                {user.loginCount || 0}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <ActionButton 
                  title="View Details"
                  onClick={() => handleUserAction('view', user._id)}
                >
                  <FaEye />
                </ActionButton>
                <ActionButton 
                  title="Edit User"
                  onClick={() => handleUserAction('edit', user._id)}
                >
                  <FaEdit />
                </ActionButton>
                <ActionButton 
                  $danger 
                  title="Delete User"
                  onClick={() => handleUserAction('delete', user._id)}
                >
                  <FaTrash />
                </ActionButton>
              </div>
            </TableRow>
          ))
        )}
      </UsersTable>

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
};

export default AdminUsers; 