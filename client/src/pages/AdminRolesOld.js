import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAdminAuth } from '../context/AdminAuthContext';
import { 
  FaShieldAlt, FaUsers, FaUserCog, FaPlus, FaEdit, FaTrash, 
  FaEye, FaSave, FaTimes, FaCheck, FaLock, FaUnlock,
  FaDownload, FaUpload, FaSync, FaSearch, FaFilter
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

const RolesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const RoleCard = styled.div`
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

const RoleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
`;

const RoleTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RoleActions = styled.div`
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

const RoleDescription = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const RoleStats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const StatItem = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
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

const PermissionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const PermissionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: #f8f9fa;
  border-radius: 6px;
  font-size: 0.9rem;
  color: #333;
`;

const PermissionIcon = styled.div`
  color: ${props => props.granted ? '#10b981' : '#ef4444'};
  font-size: 0.8rem;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  z-index: 99999;
  backdrop-filter: blur(8px);
  padding-right: 20px;

  @media (max-width: 768px) {
    justify-content: center;
    padding-right: 0;
  }
`;

const Modal = styled.div`
  background: white;
  border-radius: 20px;
  width: 90%;
  max-width: 600px;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.3);
  position: relative;
  animation: modalSlideIn 0.4s ease-out;
  margin-left: auto;
  margin-right: 20px;

  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: translateY(-60px) scale(0.85);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @media (max-width: 1200px) {
    width: 85%;
    max-width: 550px;
  }

  @media (max-width: 768px) {
    width: 95%;
    max-width: 500px;
    max-height: 90vh;
    margin: 10px auto;
    border-radius: 15px;
  }
`;

const ModalContent = styled.div`
  padding: 20px;
  background: #fafbfc;
`;

const ModalHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 25px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px 20px 0 0;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const PermissionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const PermissionCard = styled.div`
  border: 1px solid #dee2e6;
  border-radius: 6px;
  padding: 1rem;
  background: ${props => props.selected ? '#e3f2fd' : 'white'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #667eea;
    background: #f8f9fa;
  }
`;

const PermissionTitle = styled.div`
  font-weight: 600;
  color: #333;
  margin-bottom: 0.25rem;
`;

const PermissionDescription = styled.div`
  font-size: 0.8rem;
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

export default function AdminRoles() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: []
  });

  const { getAdminToken } = useAdminAuth();

  const availablePermissions = [
    { id: 'users.read', name: 'View Users', description: 'Can view user profiles and information' },
    { id: 'users.create', name: 'Create Users', description: 'Can create new user accounts' },
    { id: 'users.edit', name: 'Edit Users', description: 'Can modify user information' },
    { id: 'users.delete', name: 'Delete Users', description: 'Can delete user accounts' },
    { id: 'donations.read', name: 'View Donations', description: 'Can view donation records' },
    { id: 'donations.manage', name: 'Manage Donations', description: 'Can process and manage donations' },
    { id: 'reports.view', name: 'View Reports', description: 'Can access analytics and reports' },
    { id: 'reports.export', name: 'Export Reports', description: 'Can export data and reports' },
    { id: 'settings.read', name: 'View Settings', description: 'Can view system settings' },
    { id: 'settings.edit', name: 'Edit Settings', description: 'Can modify system settings' },
    { id: 'content.manage', name: 'Manage Content', description: 'Can manage website content' },
    { id: 'products.manage', name: 'Manage Products', description: 'Can manage e-commerce products' },
    { id: 'orders.manage', name: 'Manage Orders', description: 'Can process and manage orders' },
    { id: 'announcements.manage', name: 'Manage Announcements', description: 'Can create and manage announcements' },
    { id: 'sms.send', name: 'Send SMS', description: 'Can send bulk SMS messages' }
  ];

  const fetchRoles = async () => {
    try {
      setLoading(true);
      setError('');
      
      const token = getAdminToken();
      const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      
      const response = await fetch(`${API_BASE}/admin/roles`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setRoles(data.roles || []);
      } else {
        setError('Failed to fetch roles');
      }
    } catch (error) {
      console.error('Error fetching roles:', error);
      setError('Error fetching roles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleCreateRole = () => {
    setEditingRole(null);
    setFormData({
      name: '',
      description: '',
      permissions: []
    });
    setShowModal(true);
  };

  const handleEditRole = (role) => {
    setEditingRole(role);
    setFormData({
      name: role.name,
      description: role.description,
      permissions: role.permissions || []
    });
    setShowModal(true);
  };

  const handleSaveRole = async () => {
    try {
      const token = getAdminToken();
      const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      
      const url = editingRole 
        ? `${API_BASE}/admin/roles/${editingRole._id}`
        : `${API_BASE}/admin/roles`;
      
      const method = editingRole ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setShowModal(false);
        fetchRoles();
        alert(editingRole ? 'Role updated successfully' : 'Role created successfully');
      } else {
        alert('Failed to save role');
      }
    } catch (error) {
      console.error('Error saving role:', error);
      alert('Error saving role');
    }
  };

  const handleDeleteRole = async (roleId) => {
    if (window.confirm('Are you sure you want to delete this role? This action cannot be undone.')) {
      try {
        const token = getAdminToken();
        const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
        
        const response = await fetch(`${API_BASE}/admin/roles/${roleId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          fetchRoles();
          alert('Role deleted successfully');
        } else {
          alert('Failed to delete role');
        }
      } catch (error) {
        console.error('Error deleting role:', error);
        alert('Error deleting role');
      }
    }
  };

  const togglePermission = (permissionId) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(id => id !== permissionId)
        : [...prev.permissions, permissionId]
    }));
  };

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Container>
        <LoadingSpinner>Loading roles...</LoadingSpinner>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>
          <FaShieldAlt />
          Roles & Permissions
        </Title>
        <HeaderActions>
          <Button variant="secondary">
            <FaDownload />
            Export
          </Button>
          <Button onClick={handleCreateRole}>
            <FaPlus />
            Create Role
          </Button>
        </HeaderActions>
      </Header>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <SearchBar>
        <SearchInput
          type="text"
          placeholder="Search roles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FilterSelect>
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="moderator">Moderator</option>
          <option value="user">User</option>
        </FilterSelect>
      </SearchBar>

      <RolesGrid>
        {filteredRoles.length === 0 ? (
          <EmptyState>
            <h3>No roles found</h3>
            <p>Create your first role to get started</p>
          </EmptyState>
        ) : (
          filteredRoles.map((role) => (
            <RoleCard key={role._id}>
              <RoleHeader>
                <RoleTitle>
                  <FaShieldAlt />
                  {role.name}
                </RoleTitle>
                <RoleActions>
                  <ActionButton onClick={() => handleEditRole(role)}>
                    <FaEdit />
                  </ActionButton>
                  <ActionButton variant="danger" onClick={() => handleDeleteRole(role._id)}>
                    <FaTrash />
                  </ActionButton>
                </RoleActions>
              </RoleHeader>
              
              <RoleDescription>{role.description}</RoleDescription>
              
              <RoleStats>
                <StatItem>
                  <StatValue>{role.userCount || 0}</StatValue>
                  <StatLabel>Users</StatLabel>
                </StatItem>
                <StatItem>
                  <StatValue>{role.permissions?.length || 0}</StatValue>
                  <StatLabel>Permissions</StatLabel>
                </StatItem>
              </RoleStats>
              
              <PermissionsList>
                {role.permissions?.slice(0, 5).map((permission) => (
                  <PermissionItem key={permission}>
                    <PermissionIcon granted={true}>
                      <FaCheck />
                    </PermissionIcon>
                    {permission}
                  </PermissionItem>
                ))}
                {role.permissions?.length > 5 && (
                  <PermissionItem>
                    <PermissionIcon granted={true}>
                      <FaCheck />
                    </PermissionIcon>
                    +{role.permissions.length - 5} more permissions
                  </PermissionItem>
                )}
              </PermissionsList>
            </RoleCard>
          ))
        )}
      </RolesGrid>

      {showModal && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>
                {editingRole ? 'Edit Role' : 'Create New Role'}
              </ModalTitle>
              <CloseButton onClick={() => setShowModal(false)}>
                <FaTimes />
              </CloseButton>
            </ModalHeader>
            
            <FormGroup>
              <Label>Role Name</Label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter role name"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Description</Label>
              <TextArea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter role description"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Permissions</Label>
              <PermissionsGrid>
                {availablePermissions.map((permission) => (
                  <PermissionCard
                    key={permission.id}
                    selected={formData.permissions.includes(permission.id)}
                    onClick={() => togglePermission(permission.id)}
                  >
                    <PermissionTitle>{permission.name}</PermissionTitle>
                    <PermissionDescription>{permission.description}</PermissionDescription>
                  </PermissionCard>
                ))}
              </PermissionsGrid>
            </FormGroup>
            
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                <FaTimes />
                Cancel
              </Button>
              <Button onClick={handleSaveRole}>
                <FaSave />
                {editingRole ? 'Update Role' : 'Create Role'}
              </Button>
            </div>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
} 